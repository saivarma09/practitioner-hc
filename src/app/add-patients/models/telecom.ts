export interface TelecomTypeResponse {
  data: TelecomType[];
  success: boolean;
  resource: string;
}

export interface TelecomType {
  type: string;
  description: string;
}
