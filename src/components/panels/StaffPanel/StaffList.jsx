// StaffList.jsx
import { useState } from "react";
import StaffCard from "./StaffCard";

const mockStaff = [
  { id: "USR-101", name: "Dr. Sarah Johnson", email: "sarah.j@hospital.com", role: "Admin", department: "Cardiology", status: "Active", joinDate: "2024-01-15" },
  { id: "USR-102", name: "Dr. Rakesh Verma", email: "rakesh.v@hospital.com", role: "Doctor", department: "Neurology", status: "Active", joinDate: "2023-06-20" },
  { id: "USR-103", name: "Anita Desai", email: "anita.d@hospital.com", role: "Receptionist", department: "Front Desk", status: "Active", joinDate: "2024-03-10" },
  { id: "USR-104", name: "Vikram Mehta", email: "vikram.m@hospital.com", role: "Super Admin", department: "IT & Operations", status: "Active", joinDate: "2022-05-01" },
  { id: "USR-105", name: "Dr. Priya Patel", email: "priya.p@hospital.com", role: "Doctor", department: "Pediatrics", status: "Inactive", joinDate: "2023-11-12" },
  { id: "USR-106", name: "Rajesh Kumar", email: "rajesh.k@hospital.com", role: "Nurse", department: "Ward", status: "Active", joinDate: "2024-02-28" },
];

const roles = ["All", "Admin", "Doctor", "Receptionist", "Nurse", "Super Admin"];

export default function StaffList() {
  const [staff, setStaff] = useState(mockStaff);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.email.includes(search);
    const matchesRole = roleFilter === "All" || s.role === roleFilter;
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleStatus = (id) => {
    setStaff(staff.map((s) => 
      s.id === id ? { ...s, status: s.status === "Active" ? "Inactive" : "Active" } : s
    ));
  };

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
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="text-sm text-gray-600 flex items-center">
          Found: {filteredStaff.length} staff
        </div>
      </div>

      {/* Staff Grid */}
      {paginatedStaff.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedStaff.map((member) => (
            <StaffCard 
              key={member.id} 
              staff={member} 
              onToggleStatus={toggleStatus}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">No staff found</div>
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
                  ? "bg-purple-600 text-white"
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
