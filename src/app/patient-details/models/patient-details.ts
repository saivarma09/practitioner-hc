export interface PatientDemographicsResponse {
  data: PatientData;
  success: boolean;
  resource: string;
}

export interface PatientData {
  id: string;
  balanceDue: string | null;
  lastEdited: string;
  status: string;
  isPatientLocked: boolean;
  mentalStatus: string;
  visitingStatus: VisitingStatus[];
  warningNotes: any[];
  popupNotes: any[];
  addresses: Address[];
  telecoms: Telecom[];
  identifiers: any[];
  insurer: Insurer[];
  conditions: any[];
  vitals: Vital[];
  languages: any[];
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  initials: string;
  ethnicityCode: string;
  noChase: boolean;
  onStop: boolean;
  sendInvoiceZone: boolean;
  deceased: boolean;
  isPayor: boolean;
  isPrimary: boolean;
  isOrganisation: boolean;
  identifier: string;
  isSafeguarded: boolean;
}

export interface VisitingStatus {
  step: string;
  value: string;
  dateTime?: string;
  isRecent: boolean;
}

export interface Address {
  id: string;
  typeDescription: string;
  type: string;
  postCode: string;
  preFix: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  country: string;
  primary: boolean;
  billing: boolean;
}

export interface Telecom {
  id: string;
  telecomTypeDescription: string;
  telecomType: string;
  value: string;
  isPrimary: boolean;
  isPreferred: boolean;
}

export interface Insurer {
  id: string;
  code: string;
  name: string;
  requiresDiagnosisCode: boolean;
  isSTV: boolean;
  acceptEdiClaims: boolean;
  isESTV: boolean;
  isSynchronousME: boolean;
  description: string;
  expiryDate: string;
  expired: boolean;
  isPrimary: boolean;
  enquireAboutMembershipNo: boolean;
  isValid: boolean;
  membershipId: string;
  status: string;
}

export interface Vital {
  id: string;
  appointmentRef: string;
  status: string;
  createdBy: string;
  createdOn: string;
  lastUpdatedBy: string;
  lastUpdatedOn: string;
  key: string;
  value: string;
  category: string;
}
