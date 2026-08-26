// src/pages/Doctors.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
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
          onClick={() => navigate("/doctors/add")}
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
    </div>
  );
}