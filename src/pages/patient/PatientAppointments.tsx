import React, { useEffect, useState } from "react";

interface Appointment {
  id: number;
  date: string;
  time: string;
  disease: string;
  remarks: string;
}

const PatientAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:9096/api/appointments");
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        setError("⚠️ Error fetching appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>⏳ Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <h2>📅 My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th>ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Disease</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>{appt.disease}</td>
                <td>{appt.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientAppointments;
