export interface Ethnicity {
  code: string;
  description: string;
  parentCode?: string; // optional because some items don’t have it
}

export interface EthnicityResponse {
  data: Ethnicity[];
  success: boolean;
  resource: string;
}
