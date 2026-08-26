
// src/pages/AddEditPatient.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const initialForm = {
  name: "",
  age: "",
  gender: "Male",
  phone: "",
  email: "",
  address: "",
  bloodGroup: "A+",
  emergencyContact: "",
  status: "Active",
};

export default function AddEditPatient({ isModal = false, onClose, onSaved }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const closeForm = onClose || (() => navigate("/patients"));

  useEffect(() => {
    if (!isEditMode) return;

    // Replace with actual API call
    // api.get(`/patients/${id}`).then(res => setFormData(res.data));

    setTimeout(() => {
      setFormData({
        name: "Amit Sharma",
        age: 34,
        gender: "Male",
        phone: "+91 98765 43210",
        email: "amit.sharma@email.com",
        address: "221B, MG Road, Pune, Maharashtra",
        bloodGroup: "B+",
        emergencyContact: "+91 90000 11223 (Wife - Neha Sharma)",
        status: "Active",
      });
      setLoading(false);
    }, 300);
  }, [id, isEditMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, age, phone } = formData;
    if (!name || !age || !phone) {
      setError("Name, Age, and Phone are required.");
      return;
    }

    setSaving(true);
    try {
      if (isEditMode) {
        // await api.put(`/patients/${id}`, formData);
        console.log("Updating patient:", id, formData);
      } else {
        let savedPatients = [];
        try {
          savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
        } catch {
          savedPatients = [];
        }
        const nextId = `P-${Math.max(...savedPatients.map((patient) => Number(patient.id.slice(2))), 2000) + 1}`;
        const newPatient = {
          ...formData,
          id: nextId,
          age: Number(formData.age),
          lastVisit: new Date().toISOString().slice(0, 10),
        };
        localStorage.setItem("patients", JSON.stringify([...savedPatients, newPatient]));
        if (onSaved) {
          onSaved(newPatient);
          return;
        }
      }
      navigate("/patients");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to save patient. Try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-400">Loading patient data...</div>;
  }

  return (
    <div className={isModal ? "fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-4 py-3 backdrop-blur-[2px]" : "min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-purple-100 p-4 sm:p-8"}>
      <div className={isModal ? "max-h-[84vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/70 bg-white shadow-2xl shadow-slate-950/25" : "mx-auto w-full max-w-3xl space-y-6"}>
      {/* Back link */}
      {!isModal && <Link to="/patients" className="text-sm text-blue-600 hover:underline">← Back to Patients</Link>}

      {/* Header */}
      <div className={isModal ? "flex items-start justify-between bg-gradient-to-r from-blue-700 via-violet-600 to-purple-600 px-5 py-3.5 text-white" : "rounded-3xl bg-gradient-to-r from-blue-700 via-violet-600 to-purple-600 px-6 py-6 text-white shadow-xl shadow-blue-900/15"}>
        <div>
        <h1 className={isModal ? "text-xl font-bold tracking-tight" : "text-2xl font-bold tracking-tight"}>
          {isEditMode ? "Edit Patient" : "Add New Patient"}
        </h1>
        <p className={isModal ? "mt-1 text-sm text-blue-50" : "mt-1 text-sm text-blue-50"}>
          {isEditMode
            ? "Update the patient's information below."
            : "Fill in the details to register a new patient."}
        </p>
        </div>
        {isModal && <button type="button" onClick={closeForm} aria-label="Close patient dialog" title="Close" className="rounded-xl p-2 text-2xl leading-none text-white/75 transition hover:bg-white/15 hover:text-white">&times;</button>}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className={isModal ? "space-y-4 p-5" : "space-y-5 rounded-3xl border border-white/80 bg-white p-6 shadow-xl shadow-blue-900/10 sm:p-8"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full Name" required>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </Field>

          <Field label="Age" required>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="34"
              min="0"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </Field>

          <Field label="Gender">
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </Field>

          <Field label="Blood Group">
            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10">
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </Field>

          <Field label="Phone Number" required>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </Field>

          <Field label="Email Address">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="patient@email.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </Field>

          <Field label="Status">
            <select name="status" value={formData.status} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </Field>

          <Field label="Emergency Contact">
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="+91 90000 11223 (Relation - Name)"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </Field>
        </div>

        <Field label="Address" fullWidth>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Street, City, State"
            rows={3}
            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </Field>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
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
            {saving ? "Saving..." : isEditMode ? "Update Patient" : "Add Patient"}
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