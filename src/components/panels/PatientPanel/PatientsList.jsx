// PatientsList.jsx
import { useState, useEffect } from "react";
import PatientCard from "./PatientCard";

const mockPatients = [
  { id: "P-1001", name: "Amit Sharma", age: 34, gender: "Male", phone: "+91 98765 43210", lastVisit: "2026-08-01", status: "Active" },
  { id: "P-1002", name: "Priya Nair", age: 27, gender: "Female", phone: "+91 98123 45678", lastVisit: "2026-07-28", status: "Active" },
  { id: "P-1003", name: "John Mathew", age: 45, gender: "Male", phone: "+91 99887 76655", lastVisit: "2026-07-15", status: "Inactive" },
  { id: "P-1004", name: "Sneha Reddy", age: 31, gender: "Female", phone: "+91 91234 56789", lastVisit: "2026-08-05", status: "Active" },
  { id: "P-1005", name: "Rahul Verma", age: 52, gender: "Male", phone: "+91 90000 11223", lastVisit: "2026-06-30", status: "Active" },
  { id: "P-1006", name: "Anjali Iyer", age: 19, gender: "Female", phone: "+91 98765 12345", lastVisit: "2026-08-03", status: "Active" },
];

export default function PatientsList() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setTimeout(() => {
      let savedPatients = [];
      try {
        savedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
      } catch {
        savedPatients = [];
      }
      setPatients([...mockPatients, ...savedPatients]);
      setLoading(false);
    }, 300);
  }, []);

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search);
    const matchesGender = genderFilter === "all" || p.gender === genderFilter;
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesGender && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedPatients = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search by name, ID or phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={genderFilter}
          onChange={(e) => {
            setGenderFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="text-sm text-gray-600 flex items-center">
          Found: {filteredPatients.length} patients
        </div>
      </div>

      {/* Patients Grid */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : paginatedPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">No patients found</div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
