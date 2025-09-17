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
  startDate: string;   
  expiryDate: string;
  expired: boolean;
  renewalDate: string;
  isPrimary: boolean;
  enquireAboutMembershipNo: boolean;
  lastVerified: string;
  isValid: boolean;
  membershipId: string;
}
