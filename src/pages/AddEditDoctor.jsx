// src/pages/AddEditDoctor.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const initialForm = {
  name: "",
  department: "Cardiology",
  specialization: "",
  qualification: "",
  phone: "",
  email: "",
  experience: "",
  consultationFee: "",
  status: "Active",
};

const departments = [
  "Cardiology",
  "General Medicine",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Neurology",
  "Gynecology",
  "ENT",
];

export default function AddEditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEditMode) return;

    // Replace with actual API call
    // api.get(`/doctors/${id}`).then(res => setFormData(res.data));

    setTimeout(() => {
      setFormData({
        name: "Dr. Sarah Johnson",
        department: "Cardiology",
        specialization: "Interventional Cardiology",
        qualification: "MD, DM (Cardiology)",
        phone: "+91 98765 00011",
        email: "sarah.johnson@hms.com",
        experience: 12,
        consultationFee: 800,
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

    const { name, phone, email, department } = formData;
    if (!name || !phone || !email || !department) {
      setError("Name, Phone, Email, and Department are required.");
      return;
    }

    setSaving(true);
    try {
      if (isEditMode) {
        // await api.put(`/doctors/${id}`, formData);
        console.log("Updating doctor:", id, formData);
      } else {
        // await api.post("/doctors", formData);
        console.log("Creating doctor:", formData);
      }
      navigate("/doctors");
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to save doctor. Try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-400">Loading doctor data...</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Back link */}
      <Link to="/doctors" className="text-sm text-blue-600 hover:underline">
        ← Back to Doctors
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Doctor" : "Add New Doctor"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {isEditMode
            ? "Update the doctor's profile information below."
            : "Fill in the details to add a new doctor."}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full Name" required>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dr. John Doe"
              className="input"
            />
          </Field>

          <Field label="Department" required>
            <select name="department" value={formData.department} onChange={handleChange} className="input bg-white">
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </Field>

          <Field label="Specialization">
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Interventional Cardiology"
              className="input"
            />
          </Field>

          <Field label="Qualification">
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="MD, DM (Cardiology)"
              className="input"
            />
          </Field>

          <Field label="Phone Number" required>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 00011"
              className="input"
            />
          </Field>

          <Field label="Email Address" required>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="doctor@hms.com"
              className="input"
            />
          </Field>

          <Field label="Years of Experience">
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="12"
              min="0"
              className="input"
            />
          </Field>

          <Field label="Consultation Fee (₹)">
            <input
              type="number"
              name="consultationFee"
              value={formData.consultationFee}
              onChange={handleChange}
              placeholder="800"
              min="0"
              className="input"
            />
          </Field>

          <Field label="Status">
            <select name="status" value={formData.status} onChange={handleChange} className="input bg-white">
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </Field>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/doctors")}
            className="px-5 py-2.5 border border-gray-200 rounded-lg font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {saving ? "Saving..." : isEditMode ? "Update Doctor" : "Add Doctor"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}