// src/pages/PatientDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Replace with actual API call
    // api.get(`/patients/${id}`).then(res => setPatient(res.data));

    setTimeout(() => {
      setPatient({
        id: id,
        name: "Amit Sharma",
        age: 34,
        gender: "Male",
        phone: "+91 98765 43210",
        email: "amit.sharma@email.com",
        address: "221B, MG Road, Pune, Maharashtra",
        bloodGroup: "B+",
        status: "Active",
        registeredOn: "2024-03-12",
        emergencyContact: "+91 90000 11223 (Wife - Neha Sharma)",
        appointments: [
          { id: "A-501", date: "2026-08-01", doctor: "Dr. Sarah Johnson", department: "Cardiology", status: "Completed" },
          { id: "A-489", date: "2026-06-15", doctor: "Dr. Rakesh Verma", department: "General Medicine", status: "Completed" },
          { id: "A-512", date: "2026-08-15", doctor: "Dr. Sarah Johnson", department: "Cardiology", status: "Upcoming" },
        ],
        medicalHistory: [
          { condition: "Hypertension", diagnosedOn: "2022-01-10", status: "Ongoing" },
          { condition: "Seasonal Allergy", diagnosedOn: "2023-05-22", status: "Resolved" },
        ],
        billing: [
          { id: "INV-2201", date: "2026-08-01", amount: 2500, status: "Paid" },
          { id: "INV-2150", date: "2026-06-15", amount: 1800, status: "Paid" },
        ],
      });
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center text-gray-400">Loading patient details...</div>;
  }

  if (!patient) {
    return <div className="p-10 text-center text-gray-400">Patient not found.</div>;
  }

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "appointments", label: "Appointments" },
    { key: "history", label: "Medical History" },
    { key: "billing", label: "Billing" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Back link */}
      <Link to="/patients" className="text-sm text-blue-600 hover:underline">
        ← Back to Patients
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
            {patient.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{patient.name}</h1>
            <p className="text-sm text-gray-500">
              {patient.id} · {patient.age} yrs · {patient.gender}
            </p>
            <span
              className={`inline-block mt-1 text-xs font-medium px-3 py-1 rounded-full ${
                patient.status === "Active"
                  ? "bg-green-50 text-green-600"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {patient.status}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/patients/edit/${patient.id}`)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Edit Patient
          </button>
          <button
            onClick={() => navigate("/appointments/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + New Appointment
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="flex border-b border-gray-100 px-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === tab.key
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <Detail label="Phone" value={patient.phone} />
              <Detail label="Email" value={patient.email} />
              <Detail label="Blood Group" value={patient.bloodGroup} />
              <Detail label="Registered On" value={patient.registeredOn} />
              <Detail label="Address" value={patient.address} />
              <Detail label="Emergency Contact" value={patient.emergencyContact} />
            </div>
          )}

          {/* Appointments */}
          {activeTab === "appointments" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="py-2 pr-4 font-medium">Date</th>
                    <th className="py-2 pr-4 font-medium">Doctor</th>
                    <th className="py-2 pr-4 font-medium">Department</th>
                    <th className="py-2 pr-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {patient.appointments.map((a) => (
                    <tr key={a.id}>
                      <td className="py-3 pr-4 text-gray-600">{a.date}</td>
                      <td className="py-3 pr-4 text-gray-800">{a.doctor}</td>
                      <td className="py-3 pr-4 text-gray-600">{a.department}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full ${
                            a.status === "Completed"
                              ? "bg-gray-100 text-gray-500"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Medical History */}
          {activeTab === "history" && (
            <div className="space-y-3">
              {patient.medicalHistory.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">{h.condition}</p>
                    <p className="text-xs text-gray-500">Diagnosed: {h.diagnosedOn}</p>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
                      h.status === "Ongoing"
                        ? "bg-yellow-50 text-yellow-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {h.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Billing */}
          {activeTab === "billing" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="py-2 pr-4 font-medium">Invoice ID</th>
                    <th className="py-2 pr-4 font-medium">Date</th>
                    <th className="py-2 pr-4 font-medium">Amount</th>
                    <th className="py-2 pr-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {patient.billing.map((b) => (
                    <tr key={b.id}>
                      <td className="py-3 pr-4 text-gray-600">{b.id}</td>
                      <td className="py-3 pr-4 text-gray-600">{b.date}</td>
                      <td className="py-3 pr-4 text-gray-800">₹{b.amount.toLocaleString()}</td>
                      <td className="py-3 pr-4">
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-50 text-green-600">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-gray-400 text-xs mb-1">{label}</p>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  );
}