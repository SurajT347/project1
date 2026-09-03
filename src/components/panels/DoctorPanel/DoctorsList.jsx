// DoctorsList.jsx
import { useState, useEffect } from "react";
import DoctorCard from "./DoctorCard";

const mockDoctors = [
  { id: "D-201", name: "Dr. Sarah Johnson", department: "Cardiology", phone: "+91 98765 00011", email: "sarah.johnson@hms.com", experience: 12, status: "Active", availability: "Mon-Fri, 10-4pm" },
  { id: "D-202", name: "Dr. Rakesh Verma", department: "General Medicine", phone: "+91 98765 00022", email: "rakesh.verma@hms.com", experience: 8, status: "Active", availability: "Mon-Sat, 9-5pm" },
  { id: "D-203", name: "Dr. Neha Kapoor", department: "Pediatrics", phone: "+91 98765 00033", email: "neha.kapoor@hms.com", experience: 6, status: "Active", availability: "Tue-Thu, 11-3pm" },
  { id: "D-204", name: "Dr. Vikram Singh", department: "Orthopedics", phone: "+91 98765 00044", email: "vikram.singh@hms.com", experience: 15, status: "On Leave", availability: "Wed-Fri, 2-6pm" },
  { id: "D-205", name: "Dr. Anita Desai", department: "Dermatology", phone: "+91 98765 00055", email: "anita.desai@hms.com", experience: 9, status: "Active", availability: "Mon-Wed-Fri, 1-5pm" },
  { id: "D-206", name: "Dr. Farhan Khan", department: "Neurology", phone: "+91 98765 00066", email: "farhan.khan@hms.com", experience: 11, status: "Active", availability: "Mon-Thu, 10-3pm" },
];

const departments = ["All", "Cardiology", "General Medicine", "Pediatrics", "Orthopedics", "Dermatology", "Neurology"];

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setTimeout(() => {
      let savedDoctors = [];
      try {
        savedDoctors = JSON.parse(localStorage.getItem("doctors") || "[]");
      } catch {
        savedDoctors = [];
      }
      setDoctors([...mockDoctors, ...savedDoctors]);
      setLoading(false);
    }, 300);
  }, []);

  const filteredDoctors = doctors.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.email.includes(search);
    const matchesDept = deptFilter === "All" || d.department === deptFilter;
    const matchesStatus = statusFilter === "all" || d.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search by name, ID or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <select
          value={deptFilter}
          onChange={(e) => {
            setDeptFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
        </select>
        <div className="text-sm text-gray-600 flex items-center">
          Found: {filteredDoctors.length} doctors
        </div>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : paginatedDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">No doctors found</div>
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
                  ? "bg-red-600 text-white"
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
