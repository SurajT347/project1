// src/pages/AddEditAppointment.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useSearchParams } from "react-router-dom";

const initialForm = {
  patientId: "",
  doctorId: "",
  department: "",
  date: "",
  time: "",
  reason: "",
  status: "Pending",
};

export default function AddEditAppointment({ isModal = false, onClose }) {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    ...initialForm,
    // Pre-fill patient if navigated from a patient's profile, e.g. /appointments/add?patientId=P-1001
    patientId: searchParams.get("patientId") || "",
  });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const closeForm = onClose || (() => navigate("/appointments"));

  // Load patients & doctors for dropdowns
  useEffect(() => {
    // Replace with actual API calls
    // api.get("/patients").then(res => setPatients(res.data));
    // api.get("/doctors").then(res => setDoctors(res.data));

    setPatients([
      { id: "P-1001", name: "Amit Sharma" },
      { id: "P-1002", name: "Priya Nair" },
      { id: "P-1003", name: "John Mathew" },
      { id: "P-1004", name: "Sneha Reddy" },
    ]);

    setDoctors([
      { id: "D-201", name: "Dr. Sarah Johnson", department: "Cardiology" },
      { id: "D-202", name: "Dr. Rakesh Verma", department: "General Medicine" },
      { id: "D-203", name: "Dr. Neha Kapoor", department: "Pediatrics" },
      { id: "D-204", name: "Dr. Vikram Singh", department: "Orthopedics" },
    ]);
  }, []);

  // Load existing appointment data in edit mode
  useEffect(() => {
    if (!isEditMode) return;

    // Replace with actual API call
    // api.get(`/appointments/${id}`).then(res => setFormData(res.data));

    setTimeout(() => {
      setFormData({
        patientId: "P-1001",
        doctorId: "D-201",
        department: "Cardiology",
        date: "2026-08-15",
        time: "10:30",
        reason: "Routine cardiac checkup",
        status: "Confirmed",
      });
      setLoading(false);
    }, 300);
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-fill department when a doctor is selected
    if (name === "doctorId") {
      const selectedDoctor = doctors.find((d) => d.id === value);
      setFormData((prev) => ({
        ...prev,
        doctorId: value,
        department: selectedDoctor?.department || "",
      }));
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { patientId, doctorId, date, time } = formData;
    if (!patientId || !doctorId || !date || !time) {
      setError("Patient, Doctor, Date, and Time are required.");
      return;
    }

    setSaving(true);
    try {
      if (isEditMode) {
        // await api.put(`/appointments/${id}`, formData);
        console.log("Updating appointment:", id, formData);
      } else {
        const savedAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
        const nextId = `A-${Math.max(...savedAppointments.map((appointment) => Number(appointment.id.slice(2))), 6000) + 1}`;
        const patient = patients.find((item) => item.id === formData.patientId);
        const doctor = doctors.find((item) => item.id === formData.doctorId);
        localStorage.setItem(
          "appointments",
          JSON.stringify([
            ...savedAppointments,
            {
              ...formData,
              id: nextId,
              patient: patient?.name || formData.patientId,
              doctor: doctor?.name || formData.doctorId,
              time: new Date(`1970-01-01T${formData.time}`).toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit",
              }),
            },
          ])
        );
      }
      navigate("/appointments");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to save appointment. Try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-400">Loading appointment data...</div>;
  }

  return (
    <div
      className={isModal ? "fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-4 py-3 backdrop-blur-[2px]" : "p-6 max-w-3xl mx-auto space-y-6"}
      onMouseDown={(e) => e.target === e.currentTarget && isModal && closeForm()}
    >
      <div className={isModal ? "max-h-[84vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/70 bg-white shadow-2xl shadow-slate-950/25" : "space-y-6"}>
      {/* Back link */}
      {!isModal && <Link to="/appointments" className="text-sm text-blue-600 hover:underline">← Back to Appointments</Link>}

      {/* Header */}
      <div className={isModal ? "flex items-start justify-between bg-gradient-to-r from-blue-700 via-violet-600 to-purple-600 px-5 py-3.5 text-white" : ""}>
        <div className="flex items-center gap-3">
        {isModal && <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl shadow-inner ring-1 ring-white/20">+</div>}
        <div>
        <h1 className={isModal ? "text-xl font-bold tracking-tight" : "text-2xl font-bold text-gray-800"}>
          {isEditMode ? "Edit Appointment" : "New Appointment"}
        </h1>
        <p className={isModal ? "mt-1 text-sm text-blue-50" : "text-gray-500 text-sm mt-1"}>
          {isEditMode
            ? "Update the appointment details below."
            : "Schedule a new appointment for a patient."}
        </p>
        </div>
        </div>
        {isModal && <button type="button" onClick={closeForm} aria-label="Close appointment dialog" title="Close" className="rounded-xl p-2 text-2xl leading-none text-white/75 transition hover:bg-white/15 hover:text-white">&times;</button>}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className={isModal ? "space-y-3.5 p-5" : "bg-white rounded-2xl shadow-sm p-6 space-y-5"}>
        <div className="grid grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-2">
          <Field label="Patient" required>
            <select name="patientId" value={formData.patientId} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10">
              <option value="">Select patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
              ))}
            </select>
          </Field>

          <Field label="Doctor" required>
            <select name="doctorId" value={formData.doctorId} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10">
              <option value="">Select doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>{d.name} — {d.department}</option>
              ))}
            </select>
          </Field>

          <Field label="Department">
            <input
              type="text"
              name="department"
              value={formData.department}
              readOnly
              placeholder="Auto-filled from doctor"
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-500 outline-none"
            />
          </Field>

          <Field label="Status">
            <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10">
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </Field>

          <Field label="Date" required>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </Field>

          <Field label="Time" required>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </Field>
        </div>

        <Field label="Reason for Visit" fullWidth>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Brief description of symptoms or purpose of visit"
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </Field>

        {/* Actions */}
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={closeForm}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? "Saving..." : isEditMode ? "Update Appointment" : "Book Appointment"}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

function Field({ label, required, fullWidth, children }) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}