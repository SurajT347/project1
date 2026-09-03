// src/pages/PatientDashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { PatientStats } from "../components/panels";

export default function PatientDashboard() {
  const { user } = useAuth();
  const [patientData, setPatientData] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentPrescriptions, setRecentPrescriptions] = useState([]);

  useEffect(() => {
    // Fetch patient data
    const mockPatient = {
      id: "P-1001",
      name: "Amit Sharma",
      age: 34,
      gender: "Male",
      bloodType: "O+",
      phone: "+91 98765 43210",
      email: "amit.sharma@email.com",
      address: "123 Main Street, New Delhi",
      joinDate: "2024-01-15",
      status: "Active",
      lastCheckup: "2026-08-15",
      healthScore: 85,
    };

    const mockAppointments = [
      {
        id: "APT-001",
        date: "2026-09-05",
        time: "10:00 AM",
        doctor: "Dr. Sarah Johnson",
        department: "Cardiology",
        status: "Confirmed",
        type: "Check-up",
      },
      {
        id: "APT-002",
        date: "2026-09-12",
        time: "2:00 PM",
        doctor: "Dr. Rakesh Verma",
        department: "General Medicine",
        status: "Pending",
        type: "Follow-up",
      },
    ];

    const mockPrescriptions = [
      {
        id: "RX-001",
        date: "2026-08-20",
        doctor: "Dr. Sarah Johnson",
        medicines: ["Aspirin 100mg", "Atorvastatin 20mg"],
        duration: "30 days",
        status: "Active",
      },
      {
        id: "RX-002",
        date: "2026-08-10",
        doctor: "Dr. Rakesh Verma",
        medicines: ["Metformin 500mg"],
        duration: "60 days",
        status: "Completed",
      },
    ];

    setPatientData(mockPatient);
    setUpcomingAppointments(mockAppointments);
    setRecentPrescriptions(mockPrescriptions);
  }, []);

  if (!patientData) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="patient-page min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-600">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome, {patientData.name}!</h1>
              <p className="text-gray-600 mt-1">Patient ID: {patientData.id}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{patientData.healthScore}</div>
              <div className="text-sm text-gray-600">Health Score</div>
            </div>
          </div>
        </div>

        {/* Patient Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-blue-600">
            <div className="text-sm text-gray-600">Age</div>
            <div className="text-2xl font-bold text-gray-900">{patientData.age} years</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-green-600">
            <div className="text-sm text-gray-600">Blood Type</div>
            <div className="text-2xl font-bold text-gray-900">{patientData.bloodType}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-purple-600">
            <div className="text-sm text-gray-600">Gender</div>
            <div className="text-2xl font-bold text-gray-900">{patientData.gender}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 border-t-4 border-orange-600">
            <div className="text-sm text-gray-600">Last Checkup</div>
            <div className="text-2xl font-bold text-gray-900">{patientData.lastCheckup}</div>
          </div>
        </div>

        {/* Quick Stats */}
        <PatientStats patients={[patientData]} />

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📅 Upcoming Appointments</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAppointments.map((apt) => (
                <div key={apt.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{apt.type}</h3>
                      <p className="text-sm text-gray-600">{apt.date} at {apt.time}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      apt.status === "Confirmed" 
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>🩺 {apt.doctor}</span>
                    <span>🏥 {apt.department}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No upcoming appointments</div>
          )}
        </div>

        {/* Recent Prescriptions */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💊 Recent Prescriptions</h2>
          {recentPrescriptions.length > 0 ? (
            <div className="space-y-3">
              {recentPrescriptions.map((rx) => (
                <div key={rx.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">Prescription {rx.id}</h3>
                      <p className="text-sm text-gray-600">Issued: {rx.date}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      rx.status === "Active"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}>
                      {rx.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Doctor:</strong> {rx.doctor}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Medicines:</strong>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {rx.medicines.map((med, idx) => (
                        <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Duration:</strong> {rx.duration}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No prescriptions available</div>
          )}
        </div>

        {/* Patient Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">👤 Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <p className="font-semibold text-gray-900">{patientData.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="font-semibold text-gray-900">{patientData.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <p className="font-semibold text-gray-900">{patientData.phone}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Address</label>
              <p className="font-semibold text-gray-900">{patientData.address}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Member Since</label>
              <p className="font-semibold text-gray-900">{patientData.joinDate}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Status</label>
              <p className="font-semibold">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">
                  {patientData.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
