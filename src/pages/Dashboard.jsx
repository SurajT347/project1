// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
// Add this instead:
import { useAuth } from "../context/AuthContext";

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
    </div>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${color}`}>
      {icon}
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    patients: 0,
    doctors: 0,
    appointments: 0,
    revenue: 0,
  });

  useEffect(() => {
    // Replace with actual API call
    // api.get("/dashboard/stats").then(res => setStats(res.data));
    setStats({
      patients: 1240,
      doctors: 48,
      appointments: 32,
      revenue: 185000,
    });
  }, []);

  const isAdmin = user.role === "admin";
  const isDoctor = user.role === "doctor";
  const isReceptionist = user.role === "receptionist";

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {user.name}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here's what's happening today.
        </p>
      </div>

      {/* Stat Cards — role-based */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {(isAdmin || isReceptionist) && (
          <StatCard
            label="Total Patients"
            value={stats.patients.toLocaleString()}
            icon="🧑‍🤝‍🧑"
            color="bg-blue-50 text-blue-600"
          />
        )}

        {isAdmin && (
          <StatCard
            label="Total Doctors"
            value={stats.doctors}
            icon="🩺"
            color="bg-purple-50 text-purple-600"
          />
        )}

        {(isAdmin || isDoctor || isReceptionist) && (
          <StatCard
            label="Today's Appointments"
            value={stats.appointments}
            icon="📅"
            color="bg-green-50 text-green-600"
          />
        )}

        {isAdmin && (
          <StatCard
            label="Revenue (This Month)"
            value={`₹${stats.revenue.toLocaleString()}`}
            icon="💰"
            color="bg-yellow-50 text-yellow-600"
          />
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">
              {isDoctor ? "Your Upcoming Appointments" : "Upcoming Appointments"}
            </h2>
            <a href="/appointments" className="text-sm text-blue-600 hover:underline">
              View all
            </a>
          </div>

          <div className="divide-y divide-gray-100">
            {[
              { name: "Amit Sharma", time: "10:30 AM", doctor: "Dr. Sarah Johnson", status: "Confirmed" },
              { name: "Priya Nair", time: "11:15 AM", doctor: "Dr. Rakesh Verma", status: "Pending" },
              { name: "John Mathew", time: "1:00 PM", doctor: "Dr. Sarah Johnson", status: "Confirmed" },
            ].map((appt, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-gray-800">{appt.name}</p>
                  <p className="text-sm text-gray-500">
                    {appt.time} {!isDoctor && `· ${appt.doctor}`}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    appt.status === "Confirmed"
                      ? "bg-green-50 text-green-600"
                      : "bg-yellow-50 text-yellow-600"
                  }`}
                >
                  {appt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {(isAdmin || isReceptionist) && (
              <a
                href="/patients/add"
                className="block w-full text-center bg-blue-50 text-blue-600 py-2.5 rounded-lg font-medium hover:bg-blue-100 transition"
              >
                + Add Patient
              </a>
            )}
            {(isAdmin || isReceptionist) && (
              <a
                href="/appointments/add"
                className="block w-full text-center bg-green-50 text-green-600 py-2.5 rounded-lg font-medium hover:bg-green-100 transition"
              >
                + New Appointment
              </a>
            )}
            {isAdmin && (
              <a
                href="/doctors/add"
                className="block w-full text-center bg-purple-50 text-purple-600 py-2.5 rounded-lg font-medium hover:bg-purple-100 transition"
              >
                + Add Doctor
              </a>
            )}
            {isDoctor && (
              <a
                href="/patients"
                className="block w-full text-center bg-blue-50 text-blue-600 py-2.5 rounded-lg font-medium hover:bg-blue-100 transition"
              >
                View My Patients
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}