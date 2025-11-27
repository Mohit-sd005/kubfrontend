export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  diagnosis: string;
  medicines: Medicine[];
  symptoms: string;
  testResults?: string;
  treatmentPlan?: string;
  visitDate: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface CreateMedicalRecordData {
  patientId: string;
  diagnosis: string;
  medicines: Medicine[];
  symptoms: string;
  testResults?: string;
  treatmentPlan?: string;
  visitDate: string;
  followUpDate?: string;
}