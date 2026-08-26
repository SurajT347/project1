// src/pages/Appointments.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    // Replace with actual API call
    // api.get("/appointments").then(res => setAppointments(res.data));

    const mockData = [
      { id: "A-501", patient: "Amit Sharma", doctor: "Dr. Sarah Johnson", department: "Cardiology", date: "2026-08-08", time: "10:30 AM", status: "Confirmed" },
      { id: "A-502", patient: "Priya Nair", doctor: "Dr. Rakesh Verma", department: "General Medicine", date: "2026-08-08", time: "11:15 AM", status: "Pending" },
      { id: "A-503", patient: "John Mathew", doctor: "Dr. Sarah Johnson", department: "Cardiology", date: "2026-08-08", time: "1:00 PM", status: "Confirmed" },
      { id: "A-504", patient: "Sneha Reddy", doctor: "Dr. Neha Kapoor", department: "Pediatrics", date: "2026-08-09", time: "9:00 AM", status: "Completed" },
      { id: "A-505", patient: "Rahul Verma", doctor: "Dr. Vikram Singh", department: "Orthopedics", date: "2026-08-09", time: "3:30 PM", status: "Cancelled" },
      { id: "A-506", patient: "Anjali Iyer", doctor: "Dr. Anita Desai", department: "Dermatology", date: "2026-08-10", time: "12:00 PM", status: "Confirmed" },
    ];

    setTimeout(() => {
      setAppointments(mockData);
      setLoading(false);
    }, 300);
  }, []);

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.patient.toLowerCase().includes(search.toLowerCase()) ||
      a.doctor.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    const matchesDate = !dateFilter || a.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCancel = (id) => {
    if (!window.confirm("Cancel this appointment?")) return;
    // await api.patch(`/appointments/${id}`, { status: "Cancelled" });
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "Cancelled" } : a))
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this appointment permanently?")) return;
    // await api.delete(`/appointments/${id}`);
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const statusStyles = {
    Confirmed: "bg-blue-50 text-blue-600",
    Pending: "bg-yellow-50 text-yellow-600",
    Completed: "bg-green-50 text-green-600",
    Cancelled: "bg-red-50 text-red-600",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track all patient appointments
          </p>
        </div>
        <button
          onClick={() => navigate("/appointments/add")}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + New Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by patient, doctor, or ID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading appointments...</div>
        ) : paginatedAppointments.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No appointments found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 border-b border-gray-100">
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Patient</th>
                  <th className="px-5 py-3 font-medium">Doctor</th>
                  <th className="px-5 py-3 font-medium">Department</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Time</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedAppointments.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3 text-gray-600">{a.id}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">{a.patient}</td>
                    <td className="px-5 py-3 text-gray-600">{a.doctor}</td>
                    <td className="px-5 py-3 text-gray-600">{a.department}</td>
                    <td className="px-5 py-3 text-gray-600">{a.date}</td>
                    <td className="px-5 py-3 text-gray-600">{a.time}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[a.status]}`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right space-x-3">
                      <button
                        onClick={() => navigate(`/appointments/edit/${a.id}`)}
                        className="text-blue-600 hover:underline text-xs font-medium"
                      >
                        Edit
                      </button>
                      {a.status !== "Cancelled" && a.status !== "Completed" && (
                        <button
                          onClick={() => handleCancel(a.id)}
                          className="text-yellow-600 hover:underline text-xs font-medium"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(a.id)}
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
    </div>
  );
}