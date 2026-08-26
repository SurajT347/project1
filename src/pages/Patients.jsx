// src/pages/Patients.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddEditPatient from "./AddEditPatient";

export default function Patients({ initialShowAddModal = false }) {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(initialShowAddModal);
  const itemsPerPage = 8;

  useEffect(() => {
    // Replace with actual API call
    // api.get("/patients").then(res => setPatients(res.data));

    const mockData = [
      { id: "P-1001", name: "Amit Sharma", age: 34, gender: "Male", phone: "+91 98765 43210", lastVisit: "2026-08-01", status: "Active" },
      { id: "P-1002", name: "Priya Nair", age: 27, gender: "Female", phone: "+91 98123 45678", lastVisit: "2026-07-28", status: "Active" },
      { id: "P-1003", name: "John Mathew", age: 45, gender: "Male", phone: "+91 99887 76655", lastVisit: "2026-07-15", status: "Inactive" },
      { id: "P-1004", name: "Sneha Reddy", age: 31, gender: "Female", phone: "+91 91234 56789", lastVisit: "2026-08-05", status: "Active" },
      { id: "P-1005", name: "Rahul Verma", age: 52, gender: "Male", phone: "+91 90000 11223", lastVisit: "2026-06-30", status: "Active" },
      { id: "P-1006", name: "Anjali Iyer", age: 19, gender: "Female", phone: "+91 98765 12345", lastVisit: "2026-08-03", status: "Active" },
    ];

    setTimeout(() => {
      setPatients(mockData);
      setLoading(false);
    }, 300);
  }, []);

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search);
    const matchesGender = genderFilter === "all" || p.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?")) return;
    // Replace with actual API call
    // api.delete(`/patients/${id}`);
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage patient records and information
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + Add Patient
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by name, ID, or phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading patients...</div>
        ) : paginatedPatients.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No patients found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 border-b border-gray-100">
                  <th className="px-5 py-3 font-medium">Patient ID</th>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Age</th>
                  <th className="px-5 py-3 font-medium">Gender</th>
                  <th className="px-5 py-3 font-medium">Phone</th>
                  <th className="px-5 py-3 font-medium">Last Visit</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedPatients.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3 text-gray-600">{p.id}</td>
                    <td
                      className="px-5 py-3 font-medium text-gray-800 cursor-pointer hover:text-blue-600"
                      onClick={() => navigate(`/patients/${p.id}`)}
                    >
                      {p.name}
                    </td>
                    <td className="px-5 py-3 text-gray-600">{p.age}</td>
                    <td className="px-5 py-3 text-gray-600">{p.gender}</td>
                    <td className="px-5 py-3 text-gray-600">{p.phone}</td>
                    <td className="px-5 py-3 text-gray-600">{p.lastVisit}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${
                          p.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right space-x-3">
                      <button
                        onClick={() => navigate(`/patients/edit/${p.id}`)}
                        className="text-blue-600 hover:underline text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-red-600 hover:underline text-xs font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
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

      {showAddModal && <AddEditPatient isModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}