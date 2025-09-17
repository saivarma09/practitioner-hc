export interface Language {
  code: string;
  description: string;
}

export interface LanguageResponse {
  data: Language[];
  success: boolean;
  resource: string;
}
