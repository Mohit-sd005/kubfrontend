// src/pages/admin/AdminSettings.tsx
import React, { useState } from "react";

const AdminSettings: React.FC = () => {
  // dummy state for interactive UI
  const [siteName, setSiteName] = useState("Medical Appointment System");
  const [adminEmail, setAdminEmail] = useState("admin@hospital.com");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [version] = useState("1.0.0");

  return (
    <div style={{ maxWidth: "800px", margin: "2rem auto" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>⚙️ Admin Settings</h2>

      {/* Site Name */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          Site Name
        </label>
        <input
          type="text"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
      </div>

      {/* Admin Email */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          Admin Email
        </label>
        <input
          type="email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
      </div>

      {/* Maintenance Mode */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          Maintenance Mode
        </label>
        <button
          onClick={() => setMaintenanceMode(!maintenanceMode)}
          style={{
            padding: "8px 16px",
            backgroundColor: maintenanceMode ? "#e74c3c" : "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {maintenanceMode ? "Disable" : "Enable"}
        </button>
      </div>

      {/* System Version */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          System Version
        </label>
        <p
          style={{
            padding: "8px",
            background: "#f9f9f9",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          {version}
        </p>
      </div>

      {/* Save Button */}
      <button
        onClick={() => alert("⚡ Settings saved ")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#3498db",
          color: "white",
          fontWeight: "bold",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Save Settings
      </button>
    </div>
  );
};

export default AdminSettings;
