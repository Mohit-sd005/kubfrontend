export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  dateTime: string;
  status: 'scheduled' | 'cancelled' | 'completed' | 'rescheduled';
  reason: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentData {
  doctorId: string;
  dateTime: string;
  reason: string;
  notes?: string;
}

export interface UpdateAppointmentData {
  dateTime?: string;
  status?: 'scheduled' | 'cancelled' | 'completed' | 'rescheduled';
  notes?: string;
}