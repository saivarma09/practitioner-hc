export interface DashboardData {
    data: {
      totalPatients: number;
      todayPatients: number;
      todayAppointments: AppointmentStatus;
      appointments: AppointmentStatus;
      task: TaskStatus;
    };
    success: boolean;
  }
  
  export interface AppointmentStatus {
    confirmed: number;
    arrived: number;
    inProgress: number;
    complete: number;
    dna: number;
    cancelled: number;
    provisional: number;
    deleted: number;
    seen: number;
    todayAppointments?: number; 
    totalAppointments?: number; 
  }
  
  export interface TaskStatus {
    completed: number;
    inComplete: number;
    upcoming: number;
    totalTasks: number;
  }
  