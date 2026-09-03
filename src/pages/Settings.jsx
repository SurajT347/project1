// src/pages/Settings.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    theme: "light",
    language: "en",
  });

  const [hospitalInfo, setHospitalInfo] = useState({
    name: "City Care Hospital",
    address: "123 MG Road, Pune, Maharashtra",
    phone: "+91 20 1234 5678",
    email: "info@citycarehospital.com",
    workingHours: "9:00 AM - 8:00 PM",
  });

  const [savingPrefs, setSavingPrefs] = useState(false);
  const [savingHospital, setSavingHospital] = useState(false);
  const [prefsSuccess, setPrefsSuccess] = useState("");
  const [hospitalSuccess, setHospitalSuccess] = useState("");

  const handlePrefToggle = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrefChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const handleHospitalChange = (e) => {
    setHospitalInfo({ ...hospitalInfo, [e.target.name]: e.target.value });
  };

  const savePreferences = async () => {
    setSavingPrefs(true);
    setPrefsSuccess("");
    try {
      // await api.put("/settings/preferences", preferences);
      console.log("Saving preferences:", preferences);
      setPrefsSuccess("Preferences saved.");
    } finally {
      setSavingPrefs(false);
    }
  };

  const saveHospitalInfo = async (e) => {
    e.preventDefault();
    setSavingHospital(true);
    setHospitalSuccess("");
    try {
      // await api.put("/settings/hospital", hospitalInfo);
      console.log("Saving hospital info:", hospitalInfo);
      setHospitalSuccess("Hospital information updated.");
    } finally {
      setSavingHospital(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your preferences and system configuration
        </p>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h2>

        {prefsSuccess && (
          <div className="bg-green-50 text-green-700 text-sm px-4 py-2 rounded-md mb-4 border border-green-200">
            {prefsSuccess}
          </div>
        )}

        <div className="space-y-4">
          <ToggleRow
            label="Email Notifications"
            description="Receive updates and alerts via email"
            checked={preferences.emailNotifications}
            onChange={() => handlePrefToggle("emailNotifications")}
          />
          <ToggleRow
            label="SMS Notifications"
            description="Receive updates and alerts via SMS"
            checked={preferences.smsNotifications}
            onChange={() => handlePrefToggle("smsNotifications")}
          />
          <ToggleRow
            label="Appointment Reminders"
            description="Get reminded before upcoming appointments"
            checked={preferences.appointmentReminders}
            onChange={() => handlePrefToggle("appointmentReminders")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-5 border-t border-gray-100">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
            <select
              name="theme"
              value={preferences.theme}
              onChange={handlePrefChange}
              className="input bg-white"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <select
              name="language"
              value={preferences.language}
              onChange={handlePrefChange}
              className="input bg-white"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <button
            onClick={savePreferences}
            disabled={savingPrefs}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {savingPrefs ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </div>

      {/* Hospital Info — Admin only */}
      {isAdmin && (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Hospital Information
          </h2>
          <p className="text-sm text-gray-500 -mt-3 mb-4">
            These details appear on invoices, reports, and patient communications.
          </p>

          {hospitalSuccess && (
            <div className="bg-green-50 text-green-700 text-sm px-4 py-2 rounded-md mb-4 border border-green-200">
              {hospitalSuccess}
            </div>
          )}

          <form onSubmit={saveHospitalInfo} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
              <input
                type="text"
                name="name"
                value={hospitalInfo.name}
                onChange={handleHospitalChange}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={hospitalInfo.address}
                onChange={handleHospitalChange}
                className="input"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={hospitalInfo.phone}
                  onChange={handleHospitalChange}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={hospitalInfo.email}
                  onChange={handleHospitalChange}
                  className="input"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
              <input
                type="text"
                name="workingHours"
                value={hospitalInfo.workingHours}
                onChange={handleHospitalChange}
                placeholder="9:00 AM - 8:00 PM"
                className="input"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={savingHospital}
                className="px-5 py-2.5 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition disabled:opacity-60"
              >
                {savingHospital ? "Saving..." : "Save Hospital Info"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}