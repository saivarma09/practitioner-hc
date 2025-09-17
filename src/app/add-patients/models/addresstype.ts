export interface AddressTypeResponse {
  data: AddressType[];
  success: boolean;
  resource: string;
}

export interface AddressType {
  type: string;
  description: string;
}
