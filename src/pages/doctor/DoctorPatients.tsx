import React, { useEffect, useState } from "react";

interface Patient {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
}

const DoctorPatients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:9096/api/users/patients");
        if (response.ok) {
          const data = await response.json();
          setPatients(data);
        } else {
          console.error("Failed to fetch patients");
        }
      } catch (error) {
        console.error("Error fetching patients", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) return <p>Loading patients...</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <h2>Patients List</h2>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
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
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Phone</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {patient.id}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {patient.username}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {patient.email}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {patient.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorPatients;
