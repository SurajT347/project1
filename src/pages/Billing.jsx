// src/pages/Billing.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddEditInvoice from "./AddEditInvoice";

export default function Billing({ initialShowAddModal = false }) {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(initialShowAddModal);
  const itemsPerPage = 8;

  useEffect(() => {
    // Replace with actual API call
    // api.get("/billing").then(res => setInvoices(res.data));

    const mockData = [
      { id: "INV-2201", patient: "Amit Sharma", date: "2026-08-01", department: "Cardiology", amount: 2500, status: "Paid", method: "Card" },
      { id: "INV-2202", patient: "Priya Nair", date: "2026-08-02", department: "General Medicine", amount: 1200, status: "Pending", method: "-" },
      { id: "INV-2203", patient: "John Mathew", date: "2026-07-15", department: "Cardiology", amount: 3400, status: "Paid", method: "UPI" },
      { id: "INV-2204", patient: "Sneha Reddy", date: "2026-08-05", department: "Pediatrics", amount: 900, status: "Paid", method: "Cash" },
      { id: "INV-2205", patient: "Rahul Verma", date: "2026-08-06", department: "Orthopedics", amount: 5200, status: "Overdue", method: "-" },
      { id: "INV-2206", patient: "Anjali Iyer", date: "2026-08-07", department: "Dermatology", amount: 1500, status: "Pending", method: "-" },
    ];

    setTimeout(() => {
      let savedInvoices = [];
      try {
        savedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
      } catch {
        savedInvoices = [];
      }
      setInvoices([...mockData, ...savedInvoices]);
      setLoading(false);
    }, 300);
  }, []);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.patient.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Summary stats
  const totalRevenue = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const pendingAmount = invoices
    .filter((i) => i.status === "Pending")
    .reduce((sum, i) => sum + i.amount, 0);
  const overdueAmount = invoices
    .filter((i) => i.status === "Overdue")
    .reduce((sum, i) => sum + i.amount, 0);

  const handleMarkPaid = (id) => {
    // await api.patch(`/billing/${id}`, { status: "Paid" });
    setInvoices((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "Paid" } : i))
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this invoice permanently?")) return;
    // await api.delete(`/billing/${id}`);
    setInvoices((prev) => prev.filter((i) => i.id !== id));
  };

  const handleInvoiceSaved = (invoice) => {
    setInvoices((prev) => [...prev, invoice]);
    setShowAddModal(false);
    setCurrentPage(1);
  };

  const statusStyles = {
    Paid: "bg-green-50 text-green-600",
    Pending: "bg-yellow-50 text-yellow-600",
    Overdue: "bg-red-50 text-red-600",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Billing & Invoices</h1>
          <p className="text-gray-500 text-sm mt-1">
            Track patient payments and outstanding balances
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          + Create Invoice
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Total Revenue (Paid)</p>
          <h3 className="text-2xl font-bold text-green-600 mt-1">
            ₹{totalRevenue.toLocaleString()}
          </h3>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Pending Payments</p>
          <h3 className="text-2xl font-bold text-yellow-600 mt-1">
            ₹{pendingAmount.toLocaleString()}
          </h3>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Overdue Amount</p>
          <h3 className="text-2xl font-bold text-red-600 mt-1">
            ₹{overdueAmount.toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by patient or invoice ID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading invoices...</div>
        ) : paginatedInvoices.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No invoices found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left text-gray-500 border-b border-gray-100">
                  <th className="px-5 py-3 font-medium">Invoice ID</th>
                  <th className="px-5 py-3 font-medium">Patient</th>
                  <th className="px-5 py-3 font-medium">Department</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Method</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3 text-gray-600">{inv.id}</td>
                    <td className="px-5 py-3 font-medium text-gray-800">{inv.patient}</td>
                    <td className="px-5 py-3 text-gray-600">{inv.department}</td>
                    <td className="px-5 py-3 text-gray-600">{inv.date}</td>
                    <td className="px-5 py-3 text-gray-800 font-medium">
                      ₹{inv.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-gray-600">{inv.method}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs font-medium px-3 py-1 rounded-full ${statusStyles[inv.status]}`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right space-x-3">
                      {inv.status !== "Paid" && (
                        <button
                          onClick={() => handleMarkPaid(inv.id)}
                          className="text-green-600 hover:underline text-xs font-medium"
                        >
                          Mark Paid
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/billing/${inv.id}`)}
                        className="text-blue-600 hover:underline text-xs font-medium"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(inv.id)}
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

      {showAddModal && (
        <AddEditInvoice
          isModal
          onClose={() => setShowAddModal(false)}
          onSaved={handleInvoiceSaved}
        />
      )}
    </div>
  );
}