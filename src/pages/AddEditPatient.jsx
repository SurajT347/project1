
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

export default function AddEditPatient() {
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
        // await api.post("/patients", formData);
        console.log("Creating patient:", formData);
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
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Back link */}
      <Link to="/patients" className="text-sm text-blue-600 hover:underline">
        ← Back to Patients
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {isEditMode ? "Edit Patient" : "Add New Patient"}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {isEditMode
            ? "Update the patient's information below."
            : "Fill in the details to register a new patient."}
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
              placeholder="John Doe"
              className="input"
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
              className="input"
            />
          </Field>

          <Field label="Gender">
            <select name="gender" value={formData.gender} onChange={handleChange} className="input bg-white">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </Field>

          <Field label="Blood Group">
            <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} className="input bg-white">
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
              className="input"
            />
          </Field>

          <Field label="Email Address">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="patient@email.com"
              className="input"
            />
          </Field>

          <Field label="Status">
            <select name="status" value={formData.status} onChange={handleChange} className="input bg-white">
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
              className="input"
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
            className="input resize-none"
          />
        </Field>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/patients")}
            className="px-5 py-2.5 border border-gray-200 rounded-lg font-medium text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
          >
            {saving ? "Saving..." : isEditMode ? "Update Patient" : "Add Patient"}
          </button>
        </div>
      </form>
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