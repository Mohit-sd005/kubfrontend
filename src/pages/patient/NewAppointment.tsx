// src/pages/NewAppointment.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function NewAppointment() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [disease, setDisease] = useState("");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9096/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, disease, remarks }),
      });

      if (response.ok) {
        setMessage("✅ Appointment booked successfully!");
        setDate("");
        setTime("");
        setDisease("");
        setRemarks("");
      } else {
        setMessage("❌ Failed to book appointment.");
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Error booking appointment.");
    }
  };

  return (
    <motion.div
      className="flex justify-center p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="w-full max-w-xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">
            📅 Book New Appointment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Date */}
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Time */}
            <div>
              <Label>Time</Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            {/* Disease */}
            <div>
              <Label>Disease / Problem</Label>
              <Input
                placeholder="Enter disease/problem"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                required
              />
            </div>

            {/* Remarks */}
            <div>
              <Label>Remarks</Label>
              <Textarea
                placeholder="Enter any remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit">Book Appointment</Button>
            </div>
          </form>

          {message && (
            <p className="mt-4 text-center font-medium text-green-600">
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
