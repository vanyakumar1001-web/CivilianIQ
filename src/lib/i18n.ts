export type LanguageCode = 'en' | 'hi' | 'es' | 'fr' | 'zh' | 'ru';
export type CountryCode = 'IN' | 'US' | 'CN' | 'RU';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  fontClass?: string;
  dir?: 'rtl';
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
    languages: [
      { code: 'en', label: 'English', nativeLabel: 'English' },
      { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी', fontClass: 'font-devanagari' },
    ],
  },
  {
    code: 'US',
    label: 'United States',
    flag: '🇺🇸',
    languages: [
      { code: 'en', label: 'English', nativeLabel: 'English' },
      { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
      { code: 'fr', label: 'French', nativeLabel: 'Français' },
    ],
  },
  {
    code: 'CN',
    label: 'China',
    flag: '🇨🇳',
    languages: [
      { code: 'en', label: 'English', nativeLabel: 'English' },
      { code: 'zh', label: 'Mandarin', nativeLabel: '中文', fontClass: 'font-chinese' },
    ],
  },
  {
    code: 'RU',
    label: 'Russia',
    flag: '🇷🇺',
    languages: [
      { code: 'en', label: 'English', nativeLabel: 'English' },
      { code: 'ru', label: 'Russian', nativeLabel: 'Русский' },
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
  en: 'English',
  hi: 'Hindi',
  es: 'Spanish',
  fr: 'French',
  zh: 'Mandarin Chinese',
  ru: 'Russian',
};

type SecondaryLanguageCode = Exclude<LanguageCode, 'en'>;
type TranslationEntry = { en: string } & Partial<Record<SecondaryLanguageCode, string>>;

export const translations: Record<string, TranslationEntry> = {
  tagline: {
    en: 'Know your rights. In the moment it matters.',
    hi: 'अपने अधिकार जानिए, जब हर पल मायने रखता है।',
    es: 'Conoce tus derechos. En el momento que más importa.',
    fr: 'Connaissez vos droits. Au moment où cela compte.',
    zh: '了解你的权利。在最重要的时刻。',
    ru: 'Знайте свои права. В тот момент, когда это важнее всего.',
  },
  reassurance: {
    en: "Take a breath, you're not alone here.",
    hi: 'गहरी सांस लीजिए, आप यहाँ अकेले नहीं हैं।',
    es: 'Respira hondo, no estás solo aquí.',
    fr: "Respirez profondément, vous n'êtes pas seul ici.",
    zh: '深呼吸，你在这里并不孤单。',
    ru: 'Сделайте глубокий вдох, вы здесь не одни.',
  },
  searchPlaceholder: {
    en: "Describe what's happening…",
    hi: 'क्या हो रहा है, बताएं…',
    es: 'Describe lo que está pasando…',
    fr: 'Décrivez ce qui se passe…',
    zh: '描述正在发生的事情…',
    ru: 'Опишите, что происходит…',
  },
  searching: {
    en: 'Searching…',
    hi: 'खोज रहे हैं…',
    es: 'Buscando…',
    fr: 'Recherche en cours…',
    zh: '搜索中…',
    ru: 'Идёт поиск…',
  },
  search: {
    en: 'Search',
    hi: 'खोजें',
    es: 'Buscar',
    fr: 'Rechercher',
    zh: '搜索',
    ru: 'Поиск',
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
  noResults_CN: {
    en: 'No matching rights entry found. Try describing the situation differently, or call the national legal aid hotline 12348.',
    zh: '未找到匹配的权利条目。请尝试用不同方式描述情况，或拨打全国法律援助热线 12348 寻求帮助。',
  },
  noResults_RU: {
    en: 'No matching rights entry found. Try describing the situation differently, or contact a lawyer or legal aid organization for help.',
    ru: 'Подходящая статья не найдена. Попробуйте описать ситуацию по-другому, или обратитесь к адвокату либо в организацию бесплатной юридической помощи.',
  },
  goToRecord: {
    en: 'Go to Live Recording + AI Coach →',
    hi: 'लाइव रिकॉर्डिंग + AI कोच →',
    es: 'Ir a Grabación en Vivo + Asistente IA →',
    fr: "Aller à l'Enregistrement en Direct + Coach IA →",
    zh: '前往实时录制 + AI 教练 →',
    ru: 'Перейти к записи в реальном времени + ИИ-помощник →',
  },
  backToSearch: {
    en: '← Back to search',
    hi: '← खोज पर वापस',
    es: '← Volver a la búsqueda',
    fr: '← Retour à la recherche',
    zh: '← 返回搜索',
    ru: '← Назад к поиску',
  },
  recordDescription: {
    en: 'Records video/audio evidence with GPS + timestamp, transcribes speech live with real speaker separation, and automatically analyzes it for coaching.',
    hi: 'GPS और समय के साथ वीडियो/ऑडियो सबूत रिकॉर्ड करता है, बोलने वालों को अलग पहचानते हुए लाइव लिखता है, और अपने आप विश्लेषण करके सलाह देता है।',
    es: 'Graba evidencia de video/audio con GPS y hora, transcribe el habla en vivo separando quién habla, y lo analiza automáticamente para darte orientación.',
    fr: "Enregistre des preuves vidéo/audio avec GPS et horodatage, transcrit la parole en direct en séparant les interlocuteurs, et l'analyse automatiquement pour vous conseiller.",
    zh: '通过 GPS 和时间戳记录视频/音频证据，实时转录语音并区分说话者，并自动分析以提供指导。',
    ru: 'Записывает видео- и аудиодоказательства с GPS и временной меткой, распознаёт речь в реальном времени с разделением по говорящим и автоматически анализирует её, чтобы дать рекомендации.',
  },
  startRecording: {
    en: 'Start Recording',
    hi: 'रिकॉर्डिंग शुरू करें',
    es: 'Iniciar Grabación',
    fr: "Démarrer l'Enregistrement",
    zh: '开始录制',
    ru: 'Начать запись',
  },
  stopRecording: {
    en: 'Stop Recording',
    hi: 'रिकॉर्डिंग बंद करें',
    es: 'Detener Grabación',
    fr: "Arrêter l'Enregistrement",
    zh: '停止录制',
    ru: 'Остановить запись',
  },
  downloadRecording: {
    en: 'Download recording',
    hi: 'रिकॉर्डिंग डाउनलोड करें',
    es: 'Descargar grabación',
    fr: "Télécharger l'enregistrement",
    zh: '下载录音',
    ru: 'Скачать запись',
  },
  speakingIn: {
    en: 'Speaking in',
    hi: 'भाषा',
    es: 'Hablando en',
    fr: 'Parler en',
    zh: '使用语言',
    ru: 'Язык речи',
  },
  sttNotSupported: {
    en: "Live speech transcription isn't supported in this browser. Try Chrome or Edge.",
    hi: 'इस ब्राउज़र में लाइव भाषण पहचान उपलब्ध नहीं है। कृपया Chrome या Edge आज़माएं।',
    es: 'La transcripción de voz en vivo no es compatible con este navegador. Prueba con Chrome o Edge.',
    fr: "La transcription vocale en direct n'est pas prise en charge par ce navigateur. Essayez Chrome ou Edge.",
    zh: '此浏览器不支持实时语音转录。请尝试使用 Chrome 或 Edge。',
    ru: 'Распознавание речи в реальном времени не поддерживается в этом браузере. Попробуйте Chrome или Edge.',
  },
  liveTranscript: {
    en: 'Live transcript',
    hi: 'लाइव ट्रांसक्रिप्ट',
    es: 'Transcripción en vivo',
    fr: 'Transcription en direct',
    zh: '实时转录',
    ru: 'Расшифровка в реальном времени',
  },
  listening: {
    en: 'Listening…',
    hi: 'सुन रहे हैं…',
    es: 'Escuchando…',
    fr: 'Écoute en cours…',
    zh: '正在聆听…',
    ru: 'Слушаю…',
  },
  whoSaidWhat: {
    en: 'Who said what',
    hi: 'किसने क्या कहा',
    es: 'Quién dijo qué',
    fr: 'Qui a dit quoi',
    zh: '谁说了什么',
    ru: 'Кто что сказал',
  },
  turnsDisclaimer: {
    en: "Speakers are separated live by voice; roles (Officer/You) are the AI's best guess from what's said.",
    hi: 'वक्ता आवाज़ के आधार पर अलग किए गए हैं; भूमिका (अधिकारी/आप) AI का अनुमान है।',
    es: 'Los hablantes se separan en vivo por voz; los roles (Oficial/Tú) son la mejor estimación de la IA según lo dicho.',
    fr: "Les locuteurs sont séparés en direct par la voix ; les rôles (Agent/Vous) sont la meilleure estimation de l'IA d'après ce qui est dit.",
    zh: '系统会根据声音实时区分说话者；角色（警官/你）是 AI 根据对话内容做出的最佳判断。',
    ru: 'Говорящие разделяются в реальном времени по голосу; роли (Сотрудник/Вы) — это предположение ИИ на основе сказанного.',
  },
  you: {
    en: 'You',
    hi: 'आप',
    es: 'Tú',
    fr: 'Vous',
    zh: '你',
    ru: 'Вы',
  },
  officer: {
    en: 'Officer',
    hi: 'अधिकारी',
    es: 'Oficial',
    fr: 'Agent',
    zh: '警官',
    ru: 'Сотрудник',
  },
  autoAnalyzeHint: {
    en: 'The AI coach analyzes automatically a few seconds after you pause — or tap below anytime.',
    hi: 'कुछ बोलने के बाद AI कोच अपने आप विश्लेषण करता है — या कभी भी नीचे टैप करें।',
    es: 'El asistente de IA analiza automáticamente unos segundos después de que hagas una pausa, o toca abajo en cualquier momento.',
    fr: "Le coach IA analyse automatiquement quelques secondes après votre pause — ou appuyez ci-dessous à tout moment.",
    zh: 'AI 教练会在你停顿几秒后自动分析——你也可以随时点击下方按钮。',
    ru: 'ИИ-помощник автоматически анализирует ситуацию через несколько секунд после паузы — либо нажмите кнопку ниже в любой момент.',
  },
  analyzing: {
    en: 'Analyzing…',
    hi: 'विश्लेषण हो रहा है…',
    es: 'Analizando…',
    fr: 'Analyse en cours…',
    zh: '分析中…',
    ru: 'Идёт анализ…',
  },
  analyzeNow: {
    en: 'Analyze now',
    hi: 'अभी विश्लेषण करें',
    es: 'Analizar ahora',
    fr: 'Analyser maintenant',
    zh: '立即分析',
    ru: 'Анализировать сейчас',
  },
  aiCoach: {
    en: 'AI Coach',
    hi: 'AI कोच',
    es: 'Asistente IA',
    fr: 'Coach IA',
    zh: 'AI 教练',
    ru: 'ИИ-помощник',
  },
  sayThis: {
    en: 'Say this',
    hi: 'यह कहें',
    es: 'Di esto',
    fr: 'Dites ceci',
    zh: '这样说',
    ru: 'Скажите это',
  },
  whatToSay: {
    en: 'What to say',
    hi: 'क्या कहें',
    es: 'Qué decir',
    fr: 'Quoi dire',
    zh: '该说什么',
    ru: 'Что сказать',
  },
  copied: {
    en: 'Copied!',
    hi: 'कॉपी हो गया!',
    es: '¡Copiado!',
    fr: 'Copié !',
    zh: '已复制！',
    ru: 'Скопировано!',
  },
  copy: {
    en: 'Copy',
    hi: 'कॉपी करें',
    es: 'Copiar',
    fr: 'Copier',
    zh: '复制',
    ru: 'Копировать',
  },
  hideEscalation: {
    en: 'Hide escalation steps',
    hi: 'आगे के कदम छुपाएं',
    es: 'Ocultar pasos de escalamiento',
    fr: "Masquer les étapes d'escalade",
    zh: '隐藏升级步骤',
    ru: 'Скрыть дальнейшие шаги',
  },
  ifNotWorking: {
    en: "If this doesn't work →",
    hi: 'अगर यह काम न करे →',
    es: 'Si esto no funciona →',
    fr: 'Si cela ne fonctionne pas →',
    zh: '如果这样不管用 →',
    ru: 'Если это не помогает →',
  },
  doNot: {
    en: 'Do not:',
    hi: 'यह न करें:',
    es: 'No hagas esto:',
    fr: 'Ne faites pas ceci :',
    zh: '不要：',
    ru: 'Не делайте:',
  },
  glossaryTitle: {
    en: 'Legal terms explained',
    hi: 'कानूनी शब्द आसान भाषा में',
    es: 'Términos legales explicados',
    fr: 'Termes juridiques expliqués',
    zh: '法律术语解释',
    ru: 'Объяснение юридических терминов',
  },
  errSttStartFailed: {
    en: 'Could not start live transcription',
    hi: 'लाइव ट्रांसक्रिप्शन शुरू नहीं हो सका।',
    es: 'No se pudo iniciar la transcripción en vivo.',
    fr: 'Impossible de démarrer la transcription en direct.',
    zh: '无法启动实时转录',
    ru: 'Не удалось запустить расшифровку в реальном времени',
  },
  errSttConnFailed: {
    en: 'Could not open live transcription connection.',
    hi: 'लाइव ट्रांसक्रिप्शन कनेक्शन नहीं खुला।',
    es: 'No se pudo abrir la conexión de transcripción en vivo.',
    fr: "Impossible d'établir la connexion de transcription en direct.",
    zh: '无法建立实时转录连接。',
    ru: 'Не удалось установить соединение для расшифровки в реальном времени.',
  },
  errSttConnError: {
    en: 'Live transcription connection had an error.',
    hi: 'लाइव ट्रांसक्रिप्शन कनेक्शन में समस्या आई।',
    es: 'La conexión de transcripción en vivo tuvo un error.',
    fr: 'La connexion de transcription en direct a rencontré une erreur.',
    zh: '实时转录连接出现错误。',
    ru: 'Ошибка соединения при расшифровке в реальном времени.',
  },
  errCoachingFailed: {
    en: 'Coaching failed',
    hi: 'विश्लेषण करने में समस्या आई।',
    es: 'Ocurrió un problema al analizar.',
    fr: "Une erreur s'est produite lors de l'analyse.",
    zh: '分析失败',
    ru: 'Не удалось выполнить анализ',
  },
  autoLangDetect: {
    en: 'Automatically listens for English and {lang} mixed together — no need to choose.',
    hi: 'अपने आप अंग्रेज़ी और {lang} को मिलाकर पहचानता है — चुनने की ज़रूरत नहीं।',
    es: 'Detecta automáticamente inglés y {lang} mezclados — no hace falta elegir.',
    fr: "Détecte automatiquement l'anglais et le {lang} mélangés — pas besoin de choisir.",
    ru: 'Автоматически распознаёт английский и {lang} вместе — выбирать не нужно.',
  },
  singleLangOnly: {
    en: 'Currently listening in {lang} only — mixing with English isn\'t supported for this language yet.',
    hi: 'फ़िलहाल केवल {lang} में सुना जा रहा है — इस भाषा के लिए अंग्रेज़ी के साथ मिलाना अभी समर्थित नहीं है।',
    es: 'Actualmente solo escucha en {lang} — mezclar con inglés aún no es compatible para este idioma.',
    fr: "Actuellement, l'écoute se fait uniquement en {lang} — le mélange avec l'anglais n'est pas encore pris en charge pour cette langue.",
    zh: '目前仅识别{lang}——暂不支持与英语混合识别。',
    ru: 'Сейчас распознаётся только {lang} — смешивание с английским для этого языка пока не поддерживается.',
  },
  errCameraPermission: {
    en: 'Camera and microphone permission is required to record.',
    hi: 'रिकॉर्ड करने के लिए कैमरा और माइक्रोफोन की अनुमति ज़रूरी है।',
    es: 'Se requiere permiso de cámara y micrófono para grabar.',
    fr: "L'autorisation de la caméra et du microphone est requise pour enregistrer.",
    zh: '录制需要摄像头和麦克风权限。',
    ru: 'Для записи необходим доступ к камере и микрофону.',
  },
};

export function translate(key: string, languageCode: LanguageCode | null | undefined): { en: string; translated: string } {
  const entry = translations[key];
  if (!entry) return { en: key, translated: key };
  const translated = (languageCode && languageCode !== 'en' && entry[languageCode]) || entry.en;
  return { en: entry.en, translated };
}
