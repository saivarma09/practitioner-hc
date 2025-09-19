export interface SeverityResponse {
  data: Severity[];
  success: boolean;
}

export interface Severity {
  type: string;    
  severity: string; 
}



export interface PatientAllergiesResponse {
  data: PatientAllergy[];
  success: boolean;
  resource: string; 
}

export interface PatientAllergy {
  id: string;
  patientId: string;
  allergyCodeCode: string;
  allergyCode: string;
  allergyIntolerance: string;  
  allergySeverityType: string; 
  allergySeverity: string;     

  appointmentRef: string;
  status: string; 
  notes?:string;             
}




export interface PatientAllergySubmitResponse {
  patientAllergyRequests: PatientAllergyRequest[];
}

export interface PatientAllergyRequest {
  id: string | null;           // null when creating, string when updating
  patientId: string;
  allergyCodeCode: string;
  allergyIntolerance: string;   // e.g. "A"
  allergySeverityType: string; // e.g. "F"
  notes: string;
  appointmentRef: string;
}
