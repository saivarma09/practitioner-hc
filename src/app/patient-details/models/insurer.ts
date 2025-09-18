export interface PatientInsurerResponse {
  data: PatientInsurer[];
  success: boolean;
  resource: string; 
}

export interface PatientInsurer {
  patientId: string;
  id: string;
  code: string;
  name: string;
  requiresDiagnosisCode: boolean;
  isSTV: boolean;
  acceptEdiClaims: boolean;
  isESTV: boolean;
  isSynchronousME: boolean;
  description: string;
  expiryDate: string; // always required
  expired: boolean;
  isPrimary: boolean;
  enquireAboutMembershipNo: boolean;
  isValid: boolean;
  membershipId: string;
  scheme?: string;
  startDate?: string;
  renewalDate?: string;
  lastVerified?: string;
}


export interface InsurerResponse {
  data: MasterInsurer[];
  success: boolean;
  resource: string; // "Insurer"
}

export interface MasterInsurer {
  id: string;
  code: string;
  name: string;
  isRequiresDiagnosisCode: boolean;
  isSTV: boolean;
  isAcceptEdiClaims: boolean;
  isESTV: boolean;
  isSynchronousME: boolean;
  addresses: any[]; // empty array in your example
}


export interface AddPatientInsurer {
  patientId: string;
  insurerId: string;
  isMemberShipVerified: boolean;
  isVerificationRequired: boolean;
  membershipNumber: string;
  scheme: string;
  expiryDate: string | any; // "YYYY-MM-DD"
  isPrimary: boolean;
}




export interface PatientInsurerAddResponse {
  data: PatientAddInsurer;
  success: boolean;
  resource: string; // "PatientInsurer"
}

export interface PatientAddInsurer {
  patientId: string;
  insurerId: string;
  isVerifiedThroughMembership: boolean;
  membershipNumber: string;
  scheme: string;
  expiryDate: string; // "YYYY-MM-DDTHH:mm:ss"
  isPrimary: boolean;
}
