import { useState, ChangeEvent, FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

interface MedicalRecord {
  patientName: string;
  phoneNumber: string;
  disease: string;
  treatment: string;
  notes: string;
}

export default function NewRecord() {
  const [form, setForm] = useState<MedicalRecord>({
    patientName: "",
    phoneNumber: "",
    disease: "",
    treatment: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:9096/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("✅ Medical Record Saved");
        setForm({
          patientName: "",
          phoneNumber: "",
          disease: "",
          treatment: "",
          notes: "",
        });
      } else {
        const err = await response.text();
        alert("❌ Failed to save record: " + err);
      }
    } catch (error) {
      console.error("Error submitting record:", error);
      alert("⚠️ Server not reachable. Please check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">
            🩺 Add Medical Record
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Patient Name */}
            <div>
              <Label>Patient Name</Label>
              <Input
                name="patientName"
                placeholder="Enter full name"
                value={form.patientName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <Label>Phone Number</Label>
              <Input
                name="phoneNumber"
                placeholder="e.g. +91 9876543210"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Disease Dropdown */}
            <div>
              <Label>Disease</Label>
              <Select
                onValueChange={(val) => setForm({ ...form, disease: val })}
                value={form.disease}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select disease" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Flu">Flu</SelectItem>
                  <SelectItem value="Diabetes">Diabetes</SelectItem>
                  <SelectItem value="Hypertension">Hypertension</SelectItem>
                  <SelectItem value="Covid-19">Covid-19</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Treatment */}
            <div>
              <Label>Treatment</Label>
              <Input
                name="treatment"
                placeholder="Enter treatment/medication"
                value={form.treatment}
                onChange={handleChange}
              />
            </div>

            {/* Notes */}
            <div>
              <Label>Notes</Label>
              <Textarea
                name="notes"
                placeholder="Any additional observations"
                value={form.notes}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Record"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
