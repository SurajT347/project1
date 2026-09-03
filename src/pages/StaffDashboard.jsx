// src/pages/StaffDashboard.jsx
import { useState, useEffect } from "react";

export default function StaffDashboard() {
  const [dashboardData, setDashboardData] = useState({
    staffId: "S-2001",
    staffName: "Rajesh Kumar",
    staffRole: "Receptionist",
    department: "General",
    joinDate: "2024-02-10",
    totalAppointments: 45,
    todayAppointments: 8,
    totalPatients: 156,
    newPatients: 12,
    pendingTasks: 5,
    completedTasks: 28,
  });

  const [todayAppointments, setTodayAppointments] = useState([
    {
      id: "APT-001",
      patientName: "Amit Sharma",
      time: "10:00 AM",
      doctor: "Dr. Sarah Johnson",
      status: "Confirmed",
      type: "Check-up",
    },
    {
      id: "APT-002",
      patientName: "Priya Singh",
      time: "10:30 AM",
      doctor: "Dr. Mike Chen",
      status: "Confirmed",
      type: "Follow-up",
    },
    {
      id: "APT-003",
      patientName: "Arjun Patel",
      time: "11:00 AM",
      doctor: "Dr. Sarah Johnson",
      status: "Pending",
      type: "Consultation",
    },
    {
      id: "APT-004",
      patientName: "Neha Gupta",
      time: "02:00 PM",
      doctor: "Dr. Emily White",
      status: "Confirmed",
      type: "Check-up",
    },
    {
      id: "APT-005",
      patientName: "Vikram Reddy",
      time: "03:30 PM",
      doctor: "Dr. Mike Chen",
      status: "Confirmed",
      type: "Treatment",
    },
    {
      id: "APT-006",
      patientName: "Anjali Verma",
      time: "04:00 PM",
      doctor: "Dr. Sarah Johnson",
      status: "Confirmed",
      type: "Check-up",
    },
    {
      id: "APT-007",
      patientName: "Rohan Singh",
      time: "04:30 PM",
      doctor: "Dr. James Wilson",
      status: "Pending",
      type: "Consultation",
    },
    {
      id: "APT-008",
      patientName: "Divya Nair",
      time: "05:00 PM",
      doctor: "Dr. Emily White",
      status: "Confirmed",
      type: "Follow-up",
    },
  ]);

  const [recentPatients, setRecentPatients] = useState([
    {
      id: "P-1050",
      name: "Divya Desai",
      age: 28,
      gender: "Female",
      phone: "+91 98765 54321",
      registeredDate: "2026-08-28",
      status: "Active",
    },
    {
      id: "P-1051",
      name: "Suresh Kumar",
      age: 45,
      gender: "Male",
      phone: "+91 97654 43210",
      registeredDate: "2026-08-27",
      status: "Active",
    },
    {
      id: "P-1052",
      name: "Meera Joshi",
      age: 35,
      gender: "Female",
      phone: "+91 96543 32109",
      registeredDate: "2026-08-26",
      status: "Active",
    },
    {
      id: "P-1053",
      name: "Aditya Malhotra",
      age: 52,
      gender: "Male",
      phone: "+91 95432 21098",
      registeredDate: "2026-08-25",
      status: "Active",
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">👋 Welcome, {dashboardData.staffName}!</h1>
          <p className="text-gray-600 mt-2">Staff Portal - {dashboardData.staffRole}</p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Today's Appointments</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{dashboardData.todayAppointments}</p>
              </div>
              <span className="text-4xl">📅</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Patients</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{dashboardData.totalPatients}</p>
              </div>
              <span className="text-4xl">👥</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-semibold">New Patients</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{dashboardData.newPatients}</p>
              </div>
              <span className="text-4xl">🆕</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Pending Tasks</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">{dashboardData.pendingTasks}</p>
              </div>
              <span className="text-4xl">⚠️</span>
            </div>
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h2 className="text-2xl font-bold text-gray-900">📅 Today's Appointments</h2>
            <span className="bg-purple-100 text-purple-800 text-sm font-semibold px-4 py-2 rounded-full">
              {todayAppointments.length} Total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Patient Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Doctor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map((apt, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">{apt.time}</td>
                    <td className="px-6 py-4 text-gray-900">{apt.patientName}</td>
                    <td className="px-6 py-4 text-gray-700">{apt.doctor}</td>
                    <td className="px-6 py-4 text-gray-700">{apt.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Patient Registrations */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b">
            <h2 className="text-2xl font-bold text-gray-900">🆕 Recent Patient Registrations</h2>
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full">
              {dashboardData.newPatients} This Month
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-lg text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.id}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {patient.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <label className="text-gray-600 font-semibold">Age</label>
                    <p className="text-gray-900">{patient.age} years</p>
                  </div>
                  <div>
                    <label className="text-gray-600 font-semibold">Gender</label>
                    <p className="text-gray-900">{patient.gender}</p>
                  </div>
                  <div>
                    <label className="text-gray-600 font-semibold">Phone</label>
                    <p className="text-gray-900">{patient.phone}</p>
                  </div>
                  <div>
                    <label className="text-gray-600 font-semibold">Registered</label>
                    <p className="text-gray-900">{patient.registeredDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Staff Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="text-gray-600 font-semibold text-sm">Staff ID</label>
            <p className="text-2xl font-bold text-gray-900 mt-2">{dashboardData.staffId}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="text-gray-600 font-semibold text-sm">Department</label>
            <p className="text-2xl font-bold text-gray-900 mt-2">{dashboardData.department}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <label className="text-gray-600 font-semibold text-sm">Member Since</label>
            <p className="text-2xl font-bold text-gray-900 mt-2">{dashboardData.joinDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
