import React, { useEffect, useState } from "react";

interface Appointment {
  id: number;
  date: string;
  time: string;
  disease: string;
  remarks: string;
}

const DoctorAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:9096/api/appointments");
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error("Failed to fetch appointments");
        }
      } catch (error) {
        console.error("Error fetching appointments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <h2>All Appointments (Doctor View)</h2>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "1rem",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Time</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Disease</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{appt.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{appt.date}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{appt.time}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{appt.disease}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{appt.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorAppointments;
