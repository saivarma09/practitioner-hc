export interface AppointmentResponse {
  data: Appointment[];
  success: boolean;
  statusCode: number;
}

export interface Appointment {
  id: string;
  appointmentType: AppointmentType;
  appointmentInstructions: any[]; // You can replace `any` with a proper type if needed
  startDate: string;
  endDate: string;
  description: string;
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
  appointmentNote: AppointmentNote;
  appointmentParticipant: AppointmentParticipant[];
  appointmentPatient: AppointmentPatient[];
  appointmentPatientIndustryStandardCode: any[];
  isICEAppointment: boolean;
  isRemoteAppointment: boolean;
  identifier: string;
  specialtyId: string;
  specialty: string;
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

export interface AppointmentNote {
  notes: string;
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
  payorId: string;
  payor: string;
  price: number;
  balanceAmount: number;
  requestEarlierSlot: boolean;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  dateOfBirth: string;
  sex: string;
  noChase: boolean;
  onStop: boolean;
}
