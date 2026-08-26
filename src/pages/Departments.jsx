// src/pages/Departments.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Departments() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingDept, setEditingDept] = useState(null);
  const [formData, setFormData] = useState({ name: "", head: "", description: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Replace with actual API call
    // api.get("/departments").then(res => setDepartments(res.data));

    const mockData = [
      { id: "DEP-01", name: "Cardiology", head: "Dr. Sarah Johnson", doctorCount: 6, patientCount: 340, description: "Heart and cardiovascular care." },
      { id: "DEP-02", name: "General Medicine", head: "Dr. Rakesh Verma", doctorCount: 10, patientCount: 620, description: "Primary and general healthcare." },
      { id: "DEP-03", name: "Pediatrics", head: "Dr. Neha Kapoor", doctorCount: 5, patientCount: 280, description: "Healthcare for infants and children." },
      { id: "DEP-04", name: "Orthopedics", head: "Dr. Vikram Singh", doctorCount: 4, patientCount: 190, description: "Bone, joint, and muscle care." },
      { id: "DEP-05", name: "Dermatology", head: "Dr. Anita Desai", doctorCount: 3, patientCount: 150, description: "Skin, hair, and nail care." },
      { id: "DEP-06", name: "Neurology", head: "Dr. Farhan Khan", doctorCount: 4, patientCount: 130, description: "Brain and nervous system care." },
    ];

    setTimeout(() => {
      setDepartments(mockData);
      setLoading(false);
    }, 300);
  }, []);

  const filteredDepartments = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.head.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = () => {
    setEditingDept(null);
    setFormData({ name: "", head: "", description: "" });
    setError("");
    setShowModal(true);
  };

  const openEditModal = (dept) => {
    setEditingDept(dept);
    setFormData({ name: dept.name, head: dept.head, description: dept.description });
    setError("");
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.head) {
      setError("Department name and head are required.");
      return;
    }

    setSaving(true);
    try {
      if (editingDept) {
        // await api.put(`/departments/${editingDept.id}`, formData);
        setDepartments((prev) =>
          prev.map((d) => (d.id === editingDept.id ? { ...d, ...formData } : d))
        );
      } else {
        // const res = await api.post("/departments", formData);
        const newDept = {
          id: `DEP-${Math.floor(Math.random() * 1000)}`,
          ...formData,
          doctorCount: 0,
          patientCount: 0,
        };
        setDepartments((prev) => [...prev, newDept]);
      }
      setShowModal(false);
    } catch (err) {
      setError("Failed to save department. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this department? This cannot be undone.")) return;
    // await api.delete(`/departments/${id}`);
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Departments</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage hospital departments and their heads
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + Add Department
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <input
          type="text"
          placeholder="Search by department or head..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="p-10 text-center text-gray-400">Loading departments...</div>
      ) : filteredDepartments.length === 0 ? (
        <div className="p-10 text-center text-gray-400">No departments found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDepartments.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-2xl shadow-sm p-5 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className="font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
                    onClick={() => navigate(`/doctors?department=${d.name}`)}
                  >
                    {d.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Head: {d.head}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                  🏥
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-3">{d.description}</p>

              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100 text-sm text-gray-600">
                <span>🩺 {d.doctorCount} Doctors</span>
                <span>🧑‍🤝‍🧑 {d.patientCount} Patients</span>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => openEditModal(d)}
                  className="text-blue-600 hover:underline text-xs font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(d.id)}
                  className="text-red-600 hover:underline text-xs font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              {editingDept ? "Edit Department" : "Add Department"}
            </h2>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-md mb-4 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Cardiology"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Head <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="head"
                  value={formData.head}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Sarah Johnson"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Short description of the department"
                  rows={3}
                  className="input resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving ? "Saving..." : editingDept ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}