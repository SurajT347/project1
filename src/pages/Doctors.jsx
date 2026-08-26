// src/pages/Doctors.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialDoctorForm = {
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

const doctorDepartments = [
  "Cardiology",
  "General Medicine",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Neurology",
  "Gynecology",
  "ENT",
];

export default function Doctors({ initialShowAddModal = false }) {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(initialShowAddModal);
  const [doctorForm, setDoctorForm] = useState(initialDoctorForm);
  const [formError, setFormError] = useState("");
  const itemsPerPage = 8;

  useEffect(() => {
    // Replace with actual API call
    // api.get("/doctors").then(res => setDoctors(res.data));

    const mockData = [
      { id: "D-201", name: "Dr. Sarah Johnson", department: "Cardiology", phone: "+91 98765 00011", email: "sarah.johnson@hms.com", experience: 12, status: "Active" },
      { id: "D-202", name: "Dr. Rakesh Verma", department: "General Medicine", phone: "+91 98765 00022", email: "rakesh.verma@hms.com", experience: 8, status: "Active" },
      { id: "D-203", name: "Dr. Neha Kapoor", department: "Pediatrics", phone: "+91 98765 00033", email: "neha.kapoor@hms.com", experience: 6, status: "Active" },
      { id: "D-204", name: "Dr. Vikram Singh", department: "Orthopedics", phone: "+91 98765 00044", email: "vikram.singh@hms.com", experience: 15, status: "On Leave" },
      { id: "D-205", name: "Dr. Anita Desai", department: "Dermatology", phone: "+91 98765 00055", email: "anita.desai@hms.com", experience: 9, status: "Active" },
      { id: "D-206", name: "Dr. Farhan Khan", department: "Neurology", phone: "+91 98765 00066", email: "farhan.khan@hms.com", experience: 11, status: "Active" },
    ];

    setTimeout(() => {
      setDoctors(mockData);
      setLoading(false);
    }, 300);
  }, []);

  const departments = ["all", ...new Set(doctors.map((d) => d.department))];

  const filteredDoctors = doctors.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === "all" || d.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to remove this doctor?")) return;
    // await api.delete(`/doctors/${id}`);
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  const openAddModal = () => {
    setDoctorForm(initialDoctorForm);
    setFormError("");
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setFormError("");
  };

  const handleFormChange = (e) => {
    setDoctorForm({ ...doctorForm, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const { name, phone, email, department } = doctorForm;

    if (!name.trim() || !phone.trim() || !email.trim() || !department) {
      setFormError("Name, Phone, Email, and Department are required.");
      return;
    }

    const nextId = `D-${Math.max(...doctors.map((doctor) => Number(doctor.id.slice(2))), 200) + 1}`;
    setDoctors((prev) => [
      ...prev,
      {
        ...doctorForm,
        id: nextId,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        experience: Number(doctorForm.experience) || 0,
        status: doctorForm.status,
      },
    ]);
    setCurrentPage(1);
    closeAddModal();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Doctors</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage doctor profiles and departments
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + Add Doctor
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={deptFilter}
          onChange={(e) => {
            setDeptFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept === "all" ? "All Departments" : dept}
            </option>
          ))}
        </select>
      </div>

      {/* Grid Cards (better UX for doctors than a plain table) */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading doctors...</div>
        ) : paginatedDoctors.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No doctors found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedDoctors.map((d) => (
              <div
                key={d.id}
                className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => navigate(`/doctors/${d.id}`)}
                  >
                    <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">
                      {d.name.split(" ").map((n) => n[0]).slice(-2).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 hover:text-blue-600">
                        {d.name}
                      </p>
                      <p className="text-xs text-gray-500">{d.department}</p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap ${
                      d.status === "Active"
                        ? "bg-green-50 text-green-600"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {d.status}
                  </span>
                </div>

                <div className="mt-4 space-y-1 text-sm text-gray-500">
                  <p>📞 {d.phone}</p>
                  <p>✉️ {d.email}</p>
                  <p>🎓 {d.experience} yrs experience</p>
                </div>

                <div className="mt-4 flex gap-3 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/doctors/edit/${d.id}`)}
                    className="text-blue-600 hover:underline text-xs font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="text-red-600 hover:underline text-xs font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-4 py-3 backdrop-blur-[2px]"
          onMouseDown={(e) => e.target === e.currentTarget && closeAddModal()}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-doctor-title"
            className="max-h-[84vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/70 bg-white shadow-2xl shadow-slate-950/25"
          >
            <div className="flex items-start justify-between bg-gradient-to-r from-blue-700 via-violet-600 to-purple-600 px-5 py-3.5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl shadow-inner ring-1 ring-white/20">
                  +
                </div>
                <div>
                  <h2 id="add-doctor-title" className="text-xl font-bold tracking-tight">
                    Add New Doctor
                  </h2>
                  <p className="mt-1 text-sm text-blue-50">Create a profile for your hospital team.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeAddModal}
                aria-label="Close add doctor dialog"
                title="Close"
                className="rounded-xl p-2 text-2xl leading-none text-white/75 transition hover:bg-white/15 hover:text-white"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddDoctor} className="space-y-3.5 p-5">
              {formError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {formError}
                </div>
              )}

              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-blue-700">
                <span className="h-2 w-2 rounded-full bg-cyan-500" />
                Professional details
                <span className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-2">
                <DoctorField label="Full Name" required>
                  <input name="name" value={doctorForm.name} onChange={handleFormChange} placeholder="Dr. John Doe" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" />
                </DoctorField>
                <DoctorField label="Department" required>
                  <select name="department" value={doctorForm.department} onChange={handleFormChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10">
                    {doctorDepartments.map((department) => <option key={department}>{department}</option>)}
                  </select>
                </DoctorField>
                <DoctorField label="Specialization">
                  <input name="specialization" value={doctorForm.specialization} onChange={handleFormChange} placeholder="Interventional Cardiology" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" />
                </DoctorField>
                <DoctorField label="Qualification">
                  <input name="qualification" value={doctorForm.qualification} onChange={handleFormChange} placeholder="MD, DM (Cardiology)" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" />
                </DoctorField>
                <DoctorField label="Phone Number" required>
                  <input type="tel" name="phone" value={doctorForm.phone} onChange={handleFormChange} placeholder="+91 98765 00011" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" />
                </DoctorField>
                <DoctorField label="Email Address" required>
                  <input type="email" name="email" value={doctorForm.email} onChange={handleFormChange} placeholder="doctor@hms.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" />
                </DoctorField>
                <DoctorField label="Years of Experience">
                  <input type="number" name="experience" value={doctorForm.experience} onChange={handleFormChange} placeholder="12" min="0" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" />
                </DoctorField>
                <DoctorField label="Consultation Fee (INR)">
                  <input type="number" name="consultationFee" value={doctorForm.consultationFee} onChange={handleFormChange} placeholder="800" min="0" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10" />
                </DoctorField>
                <DoctorField label="Status">
                  <select name="status" value={doctorForm.status} onChange={handleFormChange} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10">
                    <option>Active</option>
                    <option>On Leave</option>
                    <option>Inactive</option>
                  </select>
                </DoctorField>
              </div>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button type="button" onClick={closeAddModal} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                  Add Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function DoctorField({ label, required, children }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}