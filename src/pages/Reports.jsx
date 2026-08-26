// src/pages/Reports.jsx
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2563eb", "#7c3aed", "#16a34a", "#eab308", "#dc2626", "#0891b2"];

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("monthly");

  const [revenueData, setRevenueData] = useState([]);
  const [appointmentsData, setAppointmentsData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalAppointments: 0,
    totalPatients: 0,
    avgConsultationFee: 0,
  });

  useEffect(() => {
    // Replace with actual API call based on `range`
    // api.get(`/reports?range=${range}`).then(res => { ... });

    setLoading(true);
    setTimeout(() => {
      setRevenueData([
        { period: "Mar", revenue: 145000 },
        { period: "Apr", revenue: 168000 },
        { period: "May", revenue: 152000 },
        { period: "Jun", revenue: 190000 },
        { period: "Jul", revenue: 175000 },
        { period: "Aug", revenue: 185000 },
      ]);

      setAppointmentsData([
        { period: "Mar", completed: 210, cancelled: 18 },
        { period: "Apr", completed: 245, cancelled: 22 },
        { period: "May", completed: 198, cancelled: 15 },
        { period: "Jun", completed: 260, cancelled: 20 },
        { period: "Jul", completed: 232, cancelled: 25 },
        { period: "Aug", completed: 140, cancelled: 10 },
      ]);

      setDepartmentData([
        { name: "Cardiology", value: 340 },
        { name: "General Medicine", value: 620 },
        { name: "Pediatrics", value: 280 },
        { name: "Orthopedics", value: 190 },
        { name: "Dermatology", value: 150 },
        { name: "Neurology", value: 130 },
      ]);

      setSummary({
        totalRevenue: 1015000,
        totalAppointments: 1285,
        totalPatients: 1710,
        avgConsultationFee: 790,
      });

      setLoading(false);
    }, 300);
  }, [range]);

  if (loading) {
    return <div className="p-10 text-center text-gray-400">Loading reports...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-500 text-sm mt-1">
            Overview of hospital performance and trends
          </p>
        </div>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard label="Total Revenue" value={`₹${summary.totalRevenue.toLocaleString()}`} color="text-green-600" />
        <SummaryCard label="Total Appointments" value={summary.totalAppointments.toLocaleString()} color="text-blue-600" />
        <SummaryCard label="Total Patients" value={summary.totalPatients.toLocaleString()} color="text-purple-600" />
        <SummaryCard label="Avg. Consultation Fee" value={`₹${summary.avgConsultationFee}`} color="text-yellow-600" />
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h2 className="font-semibold text-gray-800 mb-4">Revenue Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="period" stroke="#9ca3af" fontSize={12} />
            <YAxis stroke="#9ca3af" fontSize={12} />
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Appointments Overview</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={appointmentsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#16a34a" radius={[4, 4, 0, 0]} name="Completed" />
              <Bar dataKey="cancelled" fill="#dc2626" radius={[4, 4, 0, 0]} name="Cancelled" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution Pie Chart */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Patients by Department</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={departmentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={(entry) => entry.name}
              >
                {departmentData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className={`text-2xl font-bold mt-1 ${color}`}>{value}</h3>
    </div>
  );
}