export type Severity = 'critical' | 'high' | 'medium' | 'low';

export interface RightsEntry {
  id: string;
  country: string;
  category: string;
  sub_issue: string;
  trigger_keywords: string[];
  situation_description: string;
  right_plain: string;
  right_formal: string;
  script: string;
  escalation: string[];
  what_not_to_do: string;
  source_statutes: string[];
  severity: Severity;
}

export interface HiTranslation {
  situation_description: string;
  right_plain: string;
  script: string;
  escalation: string[];
  what_not_to_do: string;
}

export interface MatchedRightsEntry extends RightsEntry {
  match_reason?: string;
  hi?: HiTranslation;
}

export interface GlossaryTerm {
  term: string;
  explanation_en: string;
  explanation_hi: string;
}

export interface ClassifyResponse {
  results: MatchedRightsEntry[];
  glossary: GlossaryTerm[];
}

export type SpeakerRole = 'officer' | 'citizen';

export interface SpeakerLabel {
  speaker: string;
  role: SpeakerRole;
}

export interface CoachResponse {
  triggered: boolean;
  matched_id: string | null;
  advice_en: string;
  advice_hi: string;
  say_this_en: string | null;
  say_this_hi: string | null;
  glossary: GlossaryTerm[];
  speaker_labels: SpeakerLabel[];
}

export interface DiarizedTurn {
  speaker: number;
  text: string;
}

export interface ApiError {
  error: string;
}
