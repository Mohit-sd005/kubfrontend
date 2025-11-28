// src/services/api.ts

// const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;



interface DashboardData {
  totalAppointments: number;
  todayAppointments: number;
  totalPatients: number;
  totalDoctors: number;
  pendingAppointments: number;
  completedAppointments: number;
}

class Api {
  private getAuthHeaders() {
    const token = localStorage.getItem("auth_token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // 🔑 Authentication
  async login(credentials: { email: string; password: string }): Promise<any> {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: {
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: "ADMIN" | "PATIENT" | "DOCTOR";
  }): Promise<any> {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  // 📅 Appointments
  async getAppointments(): Promise<any[]> {
    return this.request("/api/appointments");
  }

  async createAppointment(appointmentData: any) {
    return this.request("/api/appointments", {
      method: "POST",
      body: JSON.stringify(appointmentData),
    });
  }

  async updateAppointment(id: string, updateData: any) {
    return this.request(`/api/appointments/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  }

  async deleteAppointment(id: string) {
    return this.request(`/api/appointments/${id}`, {
      method: "DELETE",
    });
  }

  // 🩺 Medical Records
  async getMedicalRecords(patientId?: string) {
    const endpoint = patientId
      ? `/api/records?patientId=${patientId}`
      : "/api/records";
    return this.request(endpoint);
  }

  async createMedicalRecord(recordData: any) {
    return this.request("/api/records", {
      method: "POST",
      body: JSON.stringify(recordData),
    });
  }

  async updateMedicalRecord(id: string, updateData: any) {
    return this.request(`/api/records/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  }

  // 👤 Users
  async getUsers(role?: string) {
    const endpoint = role ? `/api/users?role=${role}` : "/api/users";
    return this.request(endpoint);
  }

  async deleteUser(id: string) {
    return this.request(`/api/users/${id}`, {
      method: "DELETE",
    });
  }

  // 🩺 Doctors (new)
  async getDoctors() {
    return this.request('/api/doctors');
  }


  // 📊 Dashboard Stats
  async getDashboardStats(): Promise<DashboardData> {
    return this.request<DashboardData>("/api/dashboard/stats");
  }
}

export const apiService = new Api();
