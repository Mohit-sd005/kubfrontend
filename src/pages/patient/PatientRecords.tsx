// src/pages/PatientRecords.tsx
import { useEffect, useState } from "react";

interface MedicalRecord {
  id: number;
  patientName: string;
  phoneNumber: string;
  disease: string;
  treatment: string;
}

export default function PatientRecords() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:9096/api/records")
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching patient records:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading patient records...</p>;

  if (records.length === 0) return <p>No records found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Medical Records</h1>
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border">Patient</th>
            <th className="px-4 py-2 border">Disease</th>
            <th className="px-4 py-2 border">Treatment</th>
            <th className="px-4 py-2 border">Phone</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{record.patientName}</td>
              <td className="px-4 py-2 border">{record.disease}</td>
              <td className="px-4 py-2 border">{record.treatment}</td>
              <td className="px-4 py-2 border">{record.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
