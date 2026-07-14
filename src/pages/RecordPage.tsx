import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BiBlock, BiInline } from '@/components/Bilingual';
import Glossary from '@/components/Glossary';
import CountryGate from '@/components/CountryGate';
import { useLanguage, useT } from '@/lib/LanguageContext';
import { functionUrl } from '@/lib/config';
import type { CoachResponse, DiarizedTurn, SpeakerRole, ApiError } from '@/types';

const AUTO_ANALYZE_DEBOUNCE_MS = 3000;

// Deepgram nova-3's language=multi (code-switching) mode only supports this fixed
// set of languages. Anything outside it must use its own single-language code instead.
const DEEPGRAM_MULTI_SUPPORTED = new Set(['en', 'es', 'fr', 'de', 'hi', 'ru', 'pt', 'ja', 'it', 'nl']);

interface DeepgramWord {
  word: string;
  punctuated_word?: string;
  speaker?: number;
}

interface DeepgramAlternative {
  transcript: string;
  words?: DeepgramWord[];
}

interface DeepgramMessage {
  type: string;
  is_final?: boolean;
  channel?: { alternatives?: DeepgramAlternative[] };
}

interface GeoLocation {
  lat: number;
  lng: number;
}

interface BilingualMessage {
  en: string;
  translated: string;
}

function buildDiarizedText(turns: DiarizedTurn[]): string {
  return turns.map((t) => `Speaker ${t.speaker}: ${t.text}`).join('\n');
}

function errorMessage(err: unknown, fallback: string): string {
  return err instanceof Error ? err.message : fallback;
}

export default function RecordPage() {
  const { ready, preference, countryOption, languageOption, clearPreference } = useLanguage();
  const t = useT();

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const audioRecorderRef = useRef<MediaRecorder | null>(null);
  const turnsRef = useRef<DiarizedTurn[]>([]);
  const lastAnalyzedRef = useRef('');
  const autoAnalyzeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const coachingRef = useRef(false);

  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [turns, setTurns] = useState<DiarizedTurn[]>([]);
  const [interim, setInterim] = useState('');
  const [sttSupported, setSttSupported] = useState(true);
  const [sttError, setSttError] = useState<BilingualMessage | null>(null);
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [startedAt, setStartedAt] = useState<Date | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [coach, setCoach] = useState<CoachResponse | null>(null);
  const [coaching, setCoaching] = useState(false);
  const [error, setError] = useState<BilingualMessage | null>(null);

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

  async function connectDeepgram(): Promise<WebSocket | null> {
    setSttError(null);
    let tempKey: string;
    try {
      const res = await fetch(functionUrl('deepgram-token'), { method: 'POST' });
      const data: { key: string } & Partial<ApiError> = await res.json();
      if (!res.ok || !data.key) throw new Error(data.error || t('errSttStartFailed').en);
      tempKey = data.key;
    } catch (err) {
      setSttError({
        en: errorMessage(err, t('errSttStartFailed').en),
        translated: t('errSttStartFailed').translated,
      });
      return null;
    }

    // model=nova-3 + language=multi enables automatic code-switching between English
    // and the chosen language, but Deepgram's multi mode only covers a fixed set of
    // languages (en, es, fr, de, hi, ru, pt, ja, it, nl) — Mandarin and Arabic aren't
    // in it, so requesting multi for those silently breaks transcription. Fall back to
    // the specific language code for anything multi doesn't support.
    const code = languageOption?.code;
    const dgLanguage = !code || code === 'en' ? 'en' : DEEPGRAM_MULTI_SUPPORTED.has(code) ? 'multi' : code;
    const url = `wss://api.deepgram.com/v1/listen?model=nova-3&language=${dgLanguage}&diarize=true&smart_format=true&punctuate=true&interim_results=true&endpointing=300`;

    let ws: WebSocket;
    try {
      ws = new WebSocket(url, ['token', tempKey]);
    } catch {
      setSttError(t('errSttConnFailed'));
      return null;
    }

    ws.onmessage = (event: MessageEvent) => {
      let data: DeepgramMessage;
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
      setSttError(t('errSttConnError'));
    };

    return ws;
  }

  async function runAnalysis() {
    if (!preference) return;
    const diarizedText = buildDiarizedText(turnsRef.current);
    if (!diarizedText.trim() || coachingRef.current || diarizedText === lastAnalyzedRef.current) return;
    coachingRef.current = true;
    setCoaching(true);
    setError(null);
    try {
      const res = await fetch(functionUrl('coach'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript: diarizedText,
          country: preference.country,
          language: preference.language,
        }),
      });
      const data: CoachResponse & Partial<ApiError> = await res.json();
      if (!res.ok) throw new Error((data as ApiError).error || t('errCoachingFailed').en);
      setCoach(data);
      lastAnalyzedRef.current = diarizedText;
    } catch (err) {
      setError({ en: errorMessage(err, t('errCoachingFailed').en), translated: t('errCoachingFailed').translated });
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

    return () => {
      if (autoAnalyzeTimerRef.current) clearTimeout(autoAnalyzeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript, isRecording]);

  async function startRecording() {
    setError(null);
    setSttError(null);
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
        const ws = await connectDeepgram();
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
    } catch {
      setError(t('errCameraPermission'));
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

  function roleForSpeaker(speakerNum: number): SpeakerRole | null {
    const entry = coach?.speaker_labels?.find((s) => s.speaker === String(speakerNum));
    return entry?.role || null;
  }

  if (!ready) return null;
  if (!preference || !countryOption || !languageOption) return <CountryGate />;

  const elapsed =
    isRecording && startedAt && now ? Math.floor((now.getTime() - startedAt.getTime()) / 1000) : 0;

  return (
    <main className="min-h-screen text-ink px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <Link to="/" className="text-accent text-sm hover:underline">
            <BiInline id="backToSearch" />
          </Link>
          <button
            onClick={clearPreference}
            className="text-xs rounded-full border border-peach/40 bg-brown-light/60 px-3 py-1 text-ink-light hover:border-blush-deep transition-colors"
            title="Change country / language"
          >
            {countryOption.flag} {languageOption.nativeLabel}
          </button>
        </div>
        <h1 className="text-2xl font-bold mt-2 mb-1 tracking-wide bg-gradient-to-r from-butter via-peach to-blush bg-clip-text text-transparent">
          Live Recording + AI Coach
        </h1>
        <BiBlock as="p" className="text-ink-light text-sm mb-6" id="recordDescription" />

        <div className="relative rounded-2xl overflow-hidden bg-brown border border-peach/40 shadow-soft mb-4 aspect-video transition-shadow duration-300 hover:shadow-lift">
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
          {isRecording && (
            <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1 text-xs text-butter">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              REC {String(Math.floor(elapsed / 60)).padStart(2, '0')}:
              {String(elapsed % 60).padStart(2, '0')}
            </div>
          )}
          {isRecording && now && (
            <div className="absolute bottom-2 right-2 bg-black/50 rounded px-2 py-1 text-[11px] text-butter">
              {now.toLocaleString()}
              {location && ` · ${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`}
            </div>
          )}
        </div>

        {error && (
          <p className="text-rose-300 text-sm mb-4">
            {error.en}
            {languageOption.code !== 'en' && (
              <span
                lang={languageOption.code}
                dir={languageOption.dir}
                className={`block ${languageOption.fontClass || ''} font-medium text-[1.05em] leading-relaxed mt-1`}
              >
                {error.translated}
              </span>
            )}
          </p>
        )}

        <div className="flex gap-2 mb-3">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="rounded-full bg-accent text-brown font-semibold px-5 py-3 text-sm shadow-soft hover:bg-accent-deep hover:shadow-lift transition-all active:scale-95"
            >
              <BiInline id="startRecording" />
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="rounded-full bg-blush-deep text-brown font-semibold px-5 py-3 text-sm shadow-soft hover:opacity-90 hover:shadow-lift transition-all active:scale-95"
            >
              <BiInline id="stopRecording" />
            </button>
          )}
          {recordingUrl && (
            <a
              href={recordingUrl}
              download={`civilianiq-recording-${Date.now()}.webm`}
              className="rounded-full border border-peach/40 bg-brown-light/60 px-5 py-3 text-sm text-ink hover:border-blush-deep transition-all active:scale-95 animate-fade-in-up"
            >
              <BiInline id="downloadRecording" />
            </a>
          )}
        </div>

        {sttSupported && languageOption.code !== 'en' && (
          <p className="text-xs text-ink-faint mb-6">
            {t(DEEPGRAM_MULTI_SUPPORTED.has(languageOption.code) ? 'autoLangDetect' : 'singleLangOnly').en.replace(
              '{lang}',
              languageOption.label
            )}
            <span
              lang={languageOption.code}
              dir={languageOption.dir}
              className={`block ${languageOption.fontClass || ''} font-medium text-[1.05em] leading-relaxed text-ink-light mt-1`}
            >
              {t(DEEPGRAM_MULTI_SUPPORTED.has(languageOption.code) ? 'autoLangDetect' : 'singleLangOnly').translated.replace(
                '{lang}',
                languageOption.nativeLabel
              )}
            </span>
          </p>
        )}

        {!sttSupported && <BiBlock as="p" className="text-xs text-ink-light mb-4" id="sttNotSupported" />}

        {sttError && (
          <p className="text-xs text-rose-300 mb-4">
            {sttError.en}
            {languageOption.code !== 'en' && (
              <span
                lang={languageOption.code}
                dir={languageOption.dir}
                className={`block ${languageOption.fontClass || ''} font-medium text-[1.05em] leading-relaxed mt-1`}
              >
                {sttError.translated}
              </span>
            )}
          </p>
        )}

        <div className="rounded-2xl border border-peach/40 bg-brown-light/70 backdrop-blur-sm shadow-soft p-4 mb-4 transition-shadow duration-300 hover:shadow-lift">
          <h2 className="text-xs uppercase tracking-wide text-ink-faint mb-2">
            <BiInline id="liveTranscript" />
          </h2>
          <p className="text-sm text-ink whitespace-pre-wrap min-h-[3rem]">
            {transcript || (
              <span className="text-ink-faint">
                <BiInline id="listening" />
              </span>
            )}
            {interim && <span className="text-ink-light"> {interim}</span>}
          </p>
        </div>

        {turns.length > 0 && (
          <div className="rounded-2xl border border-peach/40 bg-brown-light/70 backdrop-blur-sm shadow-soft p-4 mb-4 transition-shadow duration-300 hover:shadow-lift">
            <h2 className="text-xs uppercase tracking-wide text-ink-faint mb-1">
              <BiInline id="whoSaidWhat" />
            </h2>
            <p className="text-[11px] text-ink-faint mb-3 italic">
              <BiBlock id="turnsDisclaimer" as="span" translatedClassName="not-italic text-[1em]" />
            </p>
            <div className="space-y-2">
              {turns.map((turn, i) => {
                const role = roleForSpeaker(turn.speaker);
                const isCitizen = role === 'citizen';
                return (
                  <div key={i} className={`flex ${isCitizen ? 'justify-end' : 'justify-start'} animate-fade-in-up`}>
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 ${
                        isCitizen ? 'bg-blush text-brown' : 'bg-butter/90 border border-peach/40 text-brown'
                      }`}
                    >
                      <span className="block text-[10px] uppercase tracking-wide text-brown/60 mb-0.5">
                        {role === 'citizen' ? (
                          <BiInline id="you" />
                        ) : role === 'officer' ? (
                          <BiInline id="officer" />
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

        <BiBlock as="p" className="text-xs text-ink-faint mb-2 text-center" id="autoAnalyzeHint" />

        <button
          onClick={runAnalysis}
          disabled={coaching || !transcript.trim()}
          className="w-full rounded-full bg-accent text-brown font-semibold px-5 py-3 text-sm shadow-soft hover:bg-accent-deep hover:shadow-lift transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 mb-4"
        >
          {coaching ? <BiInline id="analyzing" /> : <BiInline id="analyzeNow" />}
        </button>

        {coach && (
          <div className="rounded-2xl border border-peach/40 bg-brown-light/70 backdrop-blur-sm shadow-soft p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift animate-fade-in-up">
            <h2 className="text-xs uppercase tracking-wide text-ink-faint mb-2">
              <BiInline id="aiCoach" />
            </h2>
            <p className="text-sm text-ink mb-3">
              {coach.advice_en}
              {coach.advice_translated && languageOption.code !== 'en' && (
                <span
                  lang={languageOption.code}
                  dir={languageOption.dir}
                  className={`block ${languageOption.fontClass || ''} font-medium text-[1.05em] leading-relaxed text-ink mt-1`}
                >
                  {coach.advice_translated}
                </span>
              )}
            </p>
            {coach.triggered && coach.say_this_en && (
              <div className="rounded-xl bg-butter/90 border border-peach/40 p-4">
                <span className="text-xs uppercase tracking-wide text-brown/60">
                  <BiInline id="sayThis" />
                </span>
                <p className="text-sm text-brown mt-1">
                  {coach.say_this_en}
                  {coach.say_this_translated && languageOption.code !== 'en' && (
                    <span
                      lang={languageOption.code}
                      dir={languageOption.dir}
                      className={`block ${languageOption.fontClass || ''} font-medium text-[1.05em] leading-relaxed text-brown mt-1`}
                    >
                      {coach.say_this_translated}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {coach && (
          <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '80ms' }}>
            <Glossary terms={coach.glossary} />
          </div>
        )}
      </div>
    </main>
  );
}
