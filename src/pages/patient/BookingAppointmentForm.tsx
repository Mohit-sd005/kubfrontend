import { useEffect, useState } from "react";
import { apiService } from "@/services/api";

const BookAppointmentForm = () => {
  const [doctors, setDoctors] = useState<any[]>([]);

  useEffect(() => {
    apiService.getDoctors().then(setDoctors).catch(console.error);
  }, []);

  return (
    <select>
      {doctors.map((doc) => (
        <option key={doc.id} value={doc.id}>
          {doc.username} ({doc.email})
        </option>
      ))}
    </select>
  );
};

export default BookAppointmentForm;
