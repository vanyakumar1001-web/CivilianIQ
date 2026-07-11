'use client';

import { useEffect, useRef, useState } from 'react';
import { BiBlock, BiInline } from '@/components/Bilingual';
import Glossary from '@/components/Glossary';

const AUTO_ANALYZE_DEBOUNCE_MS = 3000;

function buildDiarizedText(turns) {
  return turns.map((t) => `Speaker ${t.speaker}: ${t.text}`).join('\n');
}

export default function RecordPage() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const wsRef = useRef(null);
  const audioRecorderRef = useRef(null);
  const turnsRef = useRef([]);
  const lastAnalyzedRef = useRef('');
  const autoAnalyzeTimerRef = useRef(null);
  const coachingRef = useRef(false);

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [turns, setTurns] = useState([]);
  const [interim, setInterim] = useState('');
  const [sttSupported, setSttSupported] = useState(true);
  const [speechLang, setSpeechLang] = useState('en-IN');
  const [sttError, setSttError] = useState('');
  const [location, setLocation] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [now, setNow] = useState(null);
  const [recordingUrl, setRecordingUrl] = useState(null);
  const [coach, setCoach] = useState(null);
  const [coaching, setCoaching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    turnsRef.current = turns;
  }, [turns]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.WebSocket || !window.MediaRecorder) {
      setSttSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!isRecording) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [isRecording]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      wsRef.current?.close();
    };
  }, []);

  async function connectDeepgram(lang) {
    setSttError('');
    let tempKey;
    try {
      const res = await fetch('/api/deepgram-token', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not start live transcription');
      tempKey = data.key;
    } catch (err) {
      setSttError(`${err.message} / लाइव ट्रांसक्रिप्शन शुरू नहीं हो सका।`);
      return null;
    }

    const dgLang = lang.startsWith('hi') ? 'hi' : 'en';
    const url = `wss://api.deepgram.com/v1/listen?model=nova-2&language=${dgLang}&diarize=true&smart_format=true&punctuate=true&interim_results=true&endpointing=300`;

    let ws;
    try {
      ws = new WebSocket(url, ['token', tempKey]);
    } catch (err) {
      setSttError('Could not open live transcription connection. / लाइव ट्रांसक्रिप्शन कनेक्शन नहीं खुला।');
      return null;
    }

    ws.onmessage = (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }
      if (data.type !== 'Results') return;
      const alt = data.channel?.alternatives?.[0];
      if (!alt) return;

      if (data.is_final) {
        setInterim('');
        const words = alt.words || [];
        if (words.length > 0) {
          setTurns((prev) => {
            const next = [...prev];
            for (const w of words) {
              const speaker = w.speaker ?? 0;
              const word = w.punctuated_word || w.word;
              const lastIdx = next.length - 1;
              if (lastIdx >= 0 && next[lastIdx].speaker === speaker) {
                next[lastIdx] = { ...next[lastIdx], text: `${next[lastIdx].text} ${word}` };
              } else {
                next.push({ speaker, text: word });
              }
            }
            return next;
          });
        }
        if (alt.transcript?.trim()) {
          setTranscript((prev) => (prev ? `${prev} ${alt.transcript}` : alt.transcript).trim());
        }
      } else {
        setInterim(alt.transcript || '');
      }
    };

    ws.onerror = () => {
      setSttError('Live transcription connection had an error. / लाइव ट्रांसक्रिप्शन कनेक्शन में समस्या आई।');
    };

    return ws;
  }

  async function runAnalysis() {
    const diarizedText = buildDiarizedText(turnsRef.current);
    if (!diarizedText.trim() || coachingRef.current || diarizedText === lastAnalyzedRef.current) return;
    coachingRef.current = true;
    setCoaching(true);
    setError('');
    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: diarizedText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Coaching failed');
      setCoach(data);
      lastAnalyzedRef.current = diarizedText;
    } catch (err) {
      setError(err.message);
    } finally {
      coachingRef.current = false;
      setCoaching(false);
    }
  }

  // Auto-analyze a few seconds after the transcript changes, so the coach reacts
  // as the encounter unfolds without waiting for a manual click.
  useEffect(() => {
    if (!isRecording) return;
    if (!transcript.trim()) return;

    if (autoAnalyzeTimerRef.current) clearTimeout(autoAnalyzeTimerRef.current);
    autoAnalyzeTimerRef.current = setTimeout(() => {
      runAnalysis();
    }, AUTO_ANALYZE_DEBOUNCE_MS);

    return () => clearTimeout(autoAnalyzeTimerRef.current);
  }, [transcript, isRecording]);

  async function startRecording() {
    setError('');
    setSttError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { autoGainControl: true, echoCancellation: true, noiseSuppression: false },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setRecordingUrl(URL.createObjectURL(blob));
      };
      recorder.start();
      mediaRecorderRef.current = recorder;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            setLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            }),
          () => setLocation(null),
          { enableHighAccuracy: true, timeout: 8000 }
        );
      }

      setTranscript('');
      setInterim('');
      setTurns([]);
      turnsRef.current = [];
      lastAnalyzedRef.current = '';

      if (sttSupported) {
        const ws = await connectDeepgram(speechLang);
        if (ws) {
          wsRef.current = ws;
          const audioStream = new MediaStream(stream.getAudioTracks());
          const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
            ? 'audio/webm;codecs=opus'
            : 'audio/webm';
          const audioRecorder = new MediaRecorder(audioStream, { mimeType });
          audioRecorder.ondataavailable = (e) => {
            if (e.data.size > 0 && ws.readyState === WebSocket.OPEN) {
              ws.send(e.data);
            }
          };
          audioRecorderRef.current = audioRecorder;

          if (ws.readyState === WebSocket.OPEN) {
            audioRecorder.start(250);
          } else {
            ws.addEventListener('open', () => audioRecorder.start(250), { once: true });
          }
        }
      }

      setStartedAt(new Date());
      setNow(new Date());
      setIsRecording(true);
    } catch (err) {
      setError('Camera and microphone permission is required to record. / रिकॉर्ड करने के लिए कैमरा और माइक्रोफोन की अनुमति ज़रूरी है।');
    }
  }

  function stopRecording() {
    audioRecorderRef.current?.stop();
    audioRecorderRef.current = null;

    if (wsRef.current) {
      try {
        wsRef.current.send(JSON.stringify({ type: 'CloseStream' }));
      } catch {
        // Connection may already be closing.
      }
      wsRef.current.close();
      wsRef.current = null;
    }

    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setIsRecording(false);

    if (autoAnalyzeTimerRef.current) clearTimeout(autoAnalyzeTimerRef.current);
    runAnalysis();
  }

  function switchSpeechLang(lang) {
    if (lang === speechLang || isRecording) return;
    setSpeechLang(lang);
  }

  function roleForSpeaker(speakerNum) {
    const entry = coach?.speaker_labels?.find((s) => s.speaker === String(speakerNum));
    return entry?.role || null;
  }

  const elapsed =
    isRecording && startedAt && now ? Math.floor((now.getTime() - startedAt.getTime()) / 1000) : 0;

  return (
    <main className="min-h-screen text-ink px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <a href="/" className="text-accent text-sm hover:underline">
          <BiInline en="← Back to search" hi="← खोज पर वापस" />
        </a>
        <h1 className="text-2xl font-bold mt-2 mb-1 tracking-wide">Live Recording + AI Coach</h1>
        <BiBlock
          as="p"
          className="text-ink-light text-sm mb-6"
          en="Records video/audio evidence with GPS + timestamp, transcribes speech live with real speaker separation, and automatically analyzes it for coaching."
          hi="GPS और समय के साथ वीडियो/ऑडियो सबूत रिकॉर्ड करता है, बोलने वालों को अलग पहचानते हुए लाइव लिखता है, और अपने आप विश्लेषण करके सलाह देता है।"
        />

        <div className="relative rounded-2xl overflow-hidden bg-ink/90 border border-peach shadow-soft mb-4 aspect-video">
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
          {isRecording && (
            <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1 text-xs text-cream">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              REC {String(Math.floor(elapsed / 60)).padStart(2, '0')}:
              {String(elapsed % 60).padStart(2, '0')}
            </div>
          )}
          {isRecording && now && (
            <div className="absolute bottom-2 right-2 bg-black/50 rounded px-2 py-1 text-[11px] text-cream">
              {now.toLocaleString()}
              {location && ` · ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`}
            </div>
          )}
        </div>

        {error && <p className="text-rose-700 text-sm mb-4">{error}</p>}

        <div className="flex gap-2 mb-3">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="rounded-full bg-accent text-white font-semibold px-5 py-3 text-sm shadow-soft hover:bg-peach-deep transition-colors"
            >
              <BiInline en="Start Recording" hi="रिकॉर्डिंग शुरू करें" />
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="rounded-full bg-blush-deep text-white font-semibold px-5 py-3 text-sm shadow-soft hover:opacity-90 transition-opacity"
            >
              <BiInline en="Stop Recording" hi="रिकॉर्डिंग बंद करें" />
            </button>
          )}
          {recordingUrl && (
            <a
              href={recordingUrl}
              download={`civilianiq-recording-${Date.now()}.webm`}
              className="rounded-full border border-peach bg-white/50 px-5 py-3 text-sm text-ink hover:border-blush-deep transition-colors"
            >
              <BiInline en="Download recording" hi="रिकॉर्डिंग डाउनलोड करें" />
            </a>
          )}
        </div>

        {sttSupported && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs text-ink-faint">
              <BiInline en="Speaking in" hi="भाषा" />:
            </span>
            <button
              onClick={() => switchSpeechLang('en-IN')}
              disabled={isRecording}
              className={`text-xs rounded-full border px-3 py-1 transition-colors disabled:opacity-50 ${
                speechLang === 'en-IN'
                  ? 'bg-accent text-white border-accent'
                  : 'border-peach bg-white/50 text-ink-light hover:border-blush-deep'
              }`}
            >
              English
            </button>
            <button
              onClick={() => switchSpeechLang('hi-IN')}
              disabled={isRecording}
              className={`text-xs rounded-full border px-3 py-1 font-devanagari transition-colors disabled:opacity-50 ${
                speechLang === 'hi-IN'
                  ? 'bg-accent text-white border-accent'
                  : 'border-peach bg-white/50 text-ink-light hover:border-blush-deep'
              }`}
            >
              हिंदी
            </button>
          </div>
        )}

        {!sttSupported && (
          <BiBlock
            as="p"
            className="text-xs text-ink-light mb-4"
            en="Live speech transcription isn't supported in this browser. Try Chrome or Edge."
            hi="इस ब्राउज़र में लाइव भाषण पहचान उपलब्ध नहीं है। कृपया Chrome या Edge आज़माएं।"
          />
        )}

        {sttError && <p className="text-xs text-rose-700 mb-4">{sttError}</p>}

        <div className="rounded-2xl border border-peach bg-white/60 shadow-soft p-4 mb-4">
          <h2 className="text-xs uppercase tracking-wide text-ink-faint mb-2">
            <BiInline en="Live transcript" hi="लाइव ट्रांसक्रिप्ट" />
          </h2>
          <p className="text-sm text-ink whitespace-pre-wrap min-h-[3rem]">
            {transcript || (
              <span className="text-ink-faint">
                <BiInline en="Listening…" hi="सुन रहे हैं…" />
              </span>
            )}
            {interim && <span className="text-ink-light"> {interim}</span>}
          </p>
        </div>

        {turns.length > 0 && (
          <div className="rounded-2xl border border-peach bg-white/60 shadow-soft p-4 mb-4">
            <h2 className="text-xs uppercase tracking-wide text-ink-faint mb-1">
              <BiInline en="Who said what" hi="किसने क्या कहा" />
            </h2>
            <p className="text-[11px] text-ink-faint mb-3 italic">
              Speakers are separated live by voice; roles (Officer/You) are the AI's best guess from what's said.
              <span lang="hi" className="block font-devanagari not-italic">
                वक्ता आवाज़ के आधार पर अलग किए गए हैं; भूमिका (अधिकारी/आप) AI का अनुमान है।
              </span>
            </p>
            <div className="space-y-2">
              {turns.map((turn, i) => {
                const role = roleForSpeaker(turn.speaker);
                const isCitizen = role === 'citizen';
                return (
                  <div key={i} className={`flex ${isCitizen ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 ${
                        isCitizen ? 'bg-blush text-ink' : 'bg-cream border border-peach text-ink'
                      }`}
                    >
                      <span className="block text-[10px] uppercase tracking-wide text-ink-faint mb-0.5">
                        {role === 'citizen' ? (
                          <BiInline en="You" hi="आप" />
                        ) : role === 'officer' ? (
                          <BiInline en="Officer" hi="अधिकारी" />
                        ) : (
                          `Speaker ${turn.speaker + 1}`
                        )}
                      </span>
                      <span className="text-sm">{turn.text}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <BiBlock
          as="p"
          className="text-xs text-ink-faint mb-2 text-center"
          en="The AI coach analyzes automatically a few seconds after you pause — or tap below anytime."
          hi="कुछ बोलने के बाद AI कोच अपने आप विश्लेषण करता है — या कभी भी नीचे टैप करें।"
        />

        <button
          onClick={runAnalysis}
          disabled={coaching || !transcript.trim()}
          className="w-full rounded-full bg-accent text-white font-semibold px-5 py-3 text-sm shadow-soft hover:bg-peach-deep transition-colors disabled:opacity-50 mb-4"
        >
          {coaching ? (
            <BiInline en="Analyzing…" hi="विश्लेषण हो रहा है…" />
          ) : (
            <BiInline en="Analyze now" hi="अभी विश्लेषण करें" />
          )}
        </button>

        {coach && (
          <div className="rounded-2xl border border-peach bg-white/60 shadow-soft p-5">
            <h2 className="text-xs uppercase tracking-wide text-ink-faint mb-2">
              <BiInline en="AI Coach" hi="AI कोच" />
            </h2>
            <p className="text-sm text-ink mb-3">
              {coach.advice_en}
              {coach.advice_hi && (
                <span lang="hi" className="block font-devanagari text-[0.9em] text-ink-light mt-0.5">
                  {coach.advice_hi}
                </span>
              )}
            </p>
            {coach.triggered && coach.say_this_en && (
              <div className="rounded-xl bg-cream border border-peach p-4">
                <span className="text-xs uppercase tracking-wide text-ink-faint">
                  <BiInline en="Say this" hi="यह कहें" />
                </span>
                <p className="text-sm text-ink mt-1">
                  {coach.say_this_en}
                  {coach.say_this_hi && (
                    <span lang="hi" className="block font-devanagari text-[0.9em] text-ink-light mt-0.5">
                      {coach.say_this_hi}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {coach && <div className="mt-4"><Glossary terms={coach.glossary} /></div>}
      </div>
    </main>
  );
}
