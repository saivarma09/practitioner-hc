export interface PatientClinicalNotesResponse {
  data: PatientClinicalNote[];
  success: boolean;
  resource: string;
}

export interface PatientClinicalNote {
  id: string;
  patientId: string;
  notes: string;
  noteType: string;
  description: string;
  isPopup: boolean;
  isHighlight: boolean;
  systemType: string;
  apointmentref: string;
  attachments: Attachment[];
  vitals: Vital[];
  conditions: Condition[];
  allergies: Allergy[];
  createdBy: string;
  createdOn: string; // ISO datetime string
}

export interface Attachment {
  // Add properties when known, currently empty
}

export interface Vital {
  // Add properties when known, currently empty
}

export interface Condition {
  // Add properties when known, currently empty
}

export interface Allergy {
  // Add properties when known, currently empty
}
