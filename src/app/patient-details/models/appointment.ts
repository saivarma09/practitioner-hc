export interface AppointmentResponse {
  data: Appointment[];
  success: boolean;
  statusCode: number;
}

export interface Appointment {
  id: string;
  appointmentType: AppointmentType;
  appointmentInstructions: any[]; // can refine if structure is known
  startDate: string; // ISO Date string
  endDate: string; // ISO Date string
  isSession: boolean;
  isTranslatorRequired: boolean;
  sendConfirmationSMS: boolean;
  appointmentStatus: AppointmentStatus;
  syncToEbooking: boolean;
  isSmsSent: boolean;
  isEmailSent: boolean;
  status: string;
  requestEarlierSlot: boolean;
  primaryParticipantTypeCode: string;
  appointmentParticipant: AppointmentParticipant[];
  appointmentPatient: AppointmentPatient[];
  appointmentPatientIndustryStandardCode: any[];
  isICEAppointment: boolean;
  isRemoteAppointment: boolean;
  identifier: string;
  specialtyId?: string;
  specialty?: string;
  mobileNumber?: string;
  email?: string;
  sentSMSDate?: string;
  sentEmailDate?: string;
}

export interface AppointmentType {
  id: string;
  description: string;
  backgroundColour: string;
  hcReqProcCode: boolean;
  episodeType: string;
}

export interface AppointmentStatus {
  id: string;
  description: string;
}

export interface AppointmentParticipant {
  participant: Participant;
}

export interface Participant {
  id: string;
  name: string;
  typeCode: string;
}

export interface AppointmentPatient {
  patient: Patient;
  payorId?: string;
  payorType?: string;
  payorCode?: string;
  payor?: string;
  price: number;
  balanceAmount: number;
  requestEarlierSlot: boolean;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  dateOfBirth: string; // ISO Date string
  sex: string;
  noChase: boolean;
  onStop: boolean;
}
