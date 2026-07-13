export type LanguageCode = 'hi' | 'es' | 'fr';
export type CountryCode = 'IN' | 'US';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  fontClass?: string;
}

export interface CountryOption {
  code: CountryCode;
  label: string;
  flag: string;
  languages: LanguageOption[];
}

export const COUNTRIES: CountryOption[] = [
  {
    code: 'IN',
    label: 'India',
    flag: '🇮🇳',
    languages: [{ code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी', fontClass: 'font-devanagari' }],
  },
  {
    code: 'US',
    label: 'United States',
    flag: '🇺🇸',
    languages: [
      { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
      { code: 'fr', label: 'French', nativeLabel: 'Français' },
    ],
  },
];

export function getCountry(code: CountryCode): CountryOption | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

export function getLanguage(countryCode: CountryCode, languageCode: LanguageCode): LanguageOption | undefined {
  return getCountry(countryCode)?.languages.find((l) => l.code === languageCode);
}

export const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  hi: 'Hindi',
  es: 'Spanish',
  fr: 'French',
};

type TranslationEntry = { en: string } & Partial<Record<LanguageCode, string>>;

export const translations: Record<string, TranslationEntry> = {
  tagline: {
    en: 'Know your rights. In the moment it matters.',
    hi: 'अपने अधिकार जानिए, जब हर पल मायने रखता है।',
    es: 'Conoce tus derechos. En el momento que más importa.',
    fr: 'Connaissez vos droits. Au moment où cela compte.',
  },
  reassurance: {
    en: "Take a breath, you're not alone here.",
    hi: 'गहरी सांस लीजिए, आप यहाँ अकेले नहीं हैं।',
    es: 'Respira hondo, no estás solo aquí.',
    fr: "Respirez profondément, vous n'êtes pas seul ici.",
  },
  searchPlaceholder: {
    en: "Describe what's happening…",
    hi: 'क्या हो रहा है, बताएं…',
    es: 'Describe lo que está pasando…',
    fr: 'Décrivez ce qui se passe…',
  },
  searching: {
    en: 'Searching…',
    hi: 'खोज रहे हैं…',
    es: 'Buscando…',
    fr: 'Recherche en cours…',
  },
  search: {
    en: 'Search',
    hi: 'खोजें',
    es: 'Buscar',
    fr: 'Rechercher',
  },
  noResults_IN: {
    en: 'No matching rights entry found. Try describing the situation differently, or call the NALSA helpline 15100.',
    hi: 'कोई मिलता हुआ अधिकार नहीं मिला। स्थिति को अलग ढंग से बताएं, या NALSA हेल्पलाइन 15100 पर कॉल करें।',
  },
  noResults_US: {
    en: 'No matching rights entry found. Try describing the situation differently, or contact the ACLU or a local legal aid organization for help.',
    es: 'No se encontró ningún derecho coincidente. Intenta describir la situación de otra manera, o comunícate con la ACLU o una organización de ayuda legal local.',
    fr: "Aucun droit correspondant trouvé. Essayez de décrire la situation différemment, ou contactez l'ACLU ou une organisation d'aide juridique locale.",
  },
  goToRecord: {
    en: 'Go to Live Recording + AI Coach →',
    hi: 'लाइव रिकॉर्डिंग + AI कोच →',
    es: 'Ir a Grabación en Vivo + Asistente IA →',
    fr: "Aller à l'Enregistrement en Direct + Coach IA →",
  },
  backToSearch: {
    en: '← Back to search',
    hi: '← खोज पर वापस',
    es: '← Volver a la búsqueda',
    fr: '← Retour à la recherche',
  },
  recordDescription: {
    en: 'Records video/audio evidence with GPS + timestamp, transcribes speech live with real speaker separation, and automatically analyzes it for coaching.',
    hi: 'GPS और समय के साथ वीडियो/ऑडियो सबूत रिकॉर्ड करता है, बोलने वालों को अलग पहचानते हुए लाइव लिखता है, और अपने आप विश्लेषण करके सलाह देता है।',
    es: 'Graba evidencia de video/audio con GPS y hora, transcribe el habla en vivo separando quién habla, y lo analiza automáticamente para darte orientación.',
    fr: "Enregistre des preuves vidéo/audio avec GPS et horodatage, transcrit la parole en direct en séparant les interlocuteurs, et l'analyse automatiquement pour vous conseiller.",
  },
  startRecording: {
    en: 'Start Recording',
    hi: 'रिकॉर्डिंग शुरू करें',
    es: 'Iniciar Grabación',
    fr: "Démarrer l'Enregistrement",
  },
  stopRecording: {
    en: 'Stop Recording',
    hi: 'रिकॉर्डिंग बंद करें',
    es: 'Detener Grabación',
    fr: "Arrêter l'Enregistrement",
  },
  downloadRecording: {
    en: 'Download recording',
    hi: 'रिकॉर्डिंग डाउनलोड करें',
    es: 'Descargar grabación',
    fr: "Télécharger l'enregistrement",
  },
  speakingIn: {
    en: 'Speaking in',
    hi: 'भाषा',
    es: 'Hablando en',
    fr: 'Parler en',
  },
  sttNotSupported: {
    en: "Live speech transcription isn't supported in this browser. Try Chrome or Edge.",
    hi: 'इस ब्राउज़र में लाइव भाषण पहचान उपलब्ध नहीं है। कृपया Chrome या Edge आज़माएं।',
    es: 'La transcripción de voz en vivo no es compatible con este navegador. Prueba con Chrome o Edge.',
    fr: "La transcription vocale en direct n'est pas prise en charge par ce navigateur. Essayez Chrome ou Edge.",
  },
  liveTranscript: {
    en: 'Live transcript',
    hi: 'लाइव ट्रांसक्रिप्ट',
    es: 'Transcripción en vivo',
    fr: 'Transcription en direct',
  },
  listening: {
    en: 'Listening…',
    hi: 'सुन रहे हैं…',
    es: 'Escuchando…',
    fr: 'Écoute en cours…',
  },
  whoSaidWhat: {
    en: 'Who said what',
    hi: 'किसने क्या कहा',
    es: 'Quién dijo qué',
    fr: 'Qui a dit quoi',
  },
  turnsDisclaimer: {
    en: "Speakers are separated live by voice; roles (Officer/You) are the AI's best guess from what's said.",
    hi: 'वक्ता आवाज़ के आधार पर अलग किए गए हैं; भूमिका (अधिकारी/आप) AI का अनुमान है।',
    es: 'Los hablantes se separan en vivo por voz; los roles (Oficial/Tú) son la mejor estimación de la IA según lo dicho.',
    fr: "Les locuteurs sont séparés en direct par la voix ; les rôles (Agent/Vous) sont la meilleure estimation de l'IA d'après ce qui est dit.",
  },
  you: {
    en: 'You',
    hi: 'आप',
    es: 'Tú',
    fr: 'Vous',
  },
  officer: {
    en: 'Officer',
    hi: 'अधिकारी',
    es: 'Oficial',
    fr: 'Agent',
  },
  autoAnalyzeHint: {
    en: 'The AI coach analyzes automatically a few seconds after you pause — or tap below anytime.',
    hi: 'कुछ बोलने के बाद AI कोच अपने आप विश्लेषण करता है — या कभी भी नीचे टैप करें।',
    es: 'El asistente de IA analiza automáticamente unos segundos después de que hagas una pausa, o toca abajo en cualquier momento.',
    fr: "Le coach IA analyse automatiquement quelques secondes après votre pause — ou appuyez ci-dessous à tout moment.",
  },
  analyzing: {
    en: 'Analyzing…',
    hi: 'विश्लेषण हो रहा है…',
    es: 'Analizando…',
    fr: 'Analyse en cours…',
  },
  analyzeNow: {
    en: 'Analyze now',
    hi: 'अभी विश्लेषण करें',
    es: 'Analizar ahora',
    fr: 'Analyser maintenant',
  },
  aiCoach: {
    en: 'AI Coach',
    hi: 'AI कोच',
    es: 'Asistente IA',
    fr: 'Coach IA',
  },
  sayThis: {
    en: 'Say this',
    hi: 'यह कहें',
    es: 'Di esto',
    fr: 'Dites ceci',
  },
  whatToSay: {
    en: 'What to say',
    hi: 'क्या कहें',
    es: 'Qué decir',
    fr: 'Quoi dire',
  },
  copied: {
    en: 'Copied!',
    hi: 'कॉपी हो गया!',
    es: '¡Copiado!',
    fr: 'Copié !',
  },
  copy: {
    en: 'Copy',
    hi: 'कॉपी करें',
    es: 'Copiar',
    fr: 'Copier',
  },
  hideEscalation: {
    en: 'Hide escalation steps',
    hi: 'आगे के कदम छुपाएं',
    es: 'Ocultar pasos de escalamiento',
    fr: "Masquer les étapes d'escalade",
  },
  ifNotWorking: {
    en: "If this doesn't work →",
    hi: 'अगर यह काम न करे →',
    es: 'Si esto no funciona →',
    fr: 'Si cela ne fonctionne pas →',
  },
  doNot: {
    en: 'Do not:',
    hi: 'यह न करें:',
    es: 'No hagas esto:',
    fr: 'Ne faites pas ceci :',
  },
  glossaryTitle: {
    en: 'Legal terms explained',
    hi: 'कानूनी शब्द आसान भाषा में',
    es: 'Términos legales explicados',
    fr: 'Termes juridiques expliqués',
  },
  errSttStartFailed: {
    en: 'Could not start live transcription',
    hi: 'लाइव ट्रांसक्रिप्शन शुरू नहीं हो सका।',
    es: 'No se pudo iniciar la transcripción en vivo.',
    fr: 'Impossible de démarrer la transcription en direct.',
  },
  errSttConnFailed: {
    en: 'Could not open live transcription connection.',
    hi: 'लाइव ट्रांसक्रिप्शन कनेक्शन नहीं खुला।',
    es: 'No se pudo abrir la conexión de transcripción en vivo.',
    fr: 'Impossible d\'établir la connexion de transcription en direct.',
  },
  errSttConnError: {
    en: 'Live transcription connection had an error.',
    hi: 'लाइव ट्रांसक्रिप्शन कनेक्शन में समस्या आई।',
    es: 'La conexión de transcripción en vivo tuvo un error.',
    fr: 'La connexion de transcription en direct a rencontré une erreur.',
  },
  errCoachingFailed: {
    en: 'Coaching failed',
    hi: 'विश्लेषण करने में समस्या आई।',
    es: 'Ocurrió un problema al analizar.',
    fr: "Une erreur s'est produite lors de l'analyse.",
  },
  autoLangDetect: {
    en: 'Automatically listens for English and {lang} mixed together — no need to choose.',
    hi: 'अपने आप अंग्रेज़ी और {lang} को मिलाकर पहचानता है — चुनने की ज़रूरत नहीं।',
    es: 'Detecta automáticamente inglés y {lang} mezclados — no hace falta elegir.',
    fr: "Détecte automatiquement l'anglais et le {lang} mélangés — pas besoin de choisir.",
  },
  errCameraPermission: {
    en: 'Camera and microphone permission is required to record.',
    hi: 'रिकॉर्ड करने के लिए कैमरा और माइक्रोफोन की अनुमति ज़रूरी है।',
    es: 'Se requiere permiso de cámara y micrófono para grabar.',
    fr: "L'autorisation de la caméra et du microphone est requise pour enregistrer.",
  },
};

export function translate(key: string, languageCode: LanguageCode | null | undefined): { en: string; translated: string } {
  const entry = translations[key];
  if (!entry) return { en: key, translated: key };
  const translated = (languageCode && entry[languageCode]) || entry.en;
  return { en: entry.en, translated };
}
