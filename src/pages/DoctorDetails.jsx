// src/pages/DoctorDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Replace with actual API call
    // api.get(`/doctors/${id}`).then(res => setDoctor(res.data));

    setTimeout(() => {
      setDoctor({
        id: id,
        name: "Dr. Sarah Johnson",
        department: "Cardiology",
        specialization: "Interventional Cardiology",
        phone: "+91 98765 00011",
        email: "sarah.johnson@hms.com",
        experience: 12,
        qualification: "MD, DM (Cardiology)",
        status: "Active",
        joinedOn: "2018-06-01",
        consultationFee: 800,
        availability: [
          { day: "Monday", time: "9:00 AM - 1:00 PM" },
          { day: "Wednesday", time: "9:00 AM - 1:00 PM" },
          { day: "Friday", time: "2:00 PM - 6:00 PM" },
        ],
        appointments: [
          { id: "A-501", date: "2026-08-01", patient: "Amit Sharma", status: "Completed" },
          { id: "A-512", date: "2026-08-15", patient: "Amit Sharma", status: "Upcoming" },
          { id: "A-520", date: "2026-08-16", patient: "Sneha Reddy", status: "Upcoming" },
        ],
        patientsCount: 186,
      });
      setLoading(false);
    }, 300);
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center text-gray-400">Loading doctor details...</div>;
  }

  if (!doctor) {
    return <div className="p-10 text-center text-gray-400">Doctor not found.</div>;
  }

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "schedule", label: "Availability" },
    { key: "appointments", label: "Appointments" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Back link */}
      <Link to="/doctors" className="text-sm text-blue-600 hover:underline">
        ← Back to Doctors
      </Link>

      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold">
            {doctor.name.split(" ").map((n) => n[0]).slice(-2).join("")}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">{doctor.name}</h1>
            <p className="text-sm text-gray-500">
              {doctor.department} · {doctor.specialization}
            </p>
            <span
              className={`inline-block mt-1 text-xs font-medium px-3 py-1 rounded-full ${
                doctor.status === "Active"
                  ? "bg-green-50 text-green-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {doctor.status}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/doctors/edit/${doctor.id}`)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Edit Doctor
          </button>
          <button
            onClick={() => navigate("/appointments/add")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + New Appointment
          </button>
        </div>
      </div>

      {/* Stat Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MiniStat label="Experience" value={`${doctor.experience} yrs`} />
        <MiniStat label="Patients Treated" value={doctor.patientsCount} />
        <MiniStat label="Consultation Fee" value={`₹${doctor.consultationFee}`} />
        <MiniStat label="Joined On" value={doctor.joinedOn} />
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
              <Detail label="Phone" value={doctor.phone} />
              <Detail label="Email" value={doctor.email} />
              <Detail label="Qualification" value={doctor.qualification} />
              <Detail label="Department" value={doctor.department} />
              <Detail label="Specialization" value={doctor.specialization} />
              <Detail label="Status" value={doctor.status} />
            </div>
          )}

          {/* Availability */}
          {activeTab === "schedule" && (
            <div className="space-y-3">
              {doctor.availability.map((slot, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3"
                >
                  <p className="font-medium text-gray-800">{slot.day}</p>
                  <p className="text-sm text-gray-500">{slot.time}</p>
                </div>
              ))}
            </div>
          )}

          {/* Appointments */}
          {activeTab === "appointments" && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="py-2 pr-4 font-medium">Date</th>
                    <th className="py-2 pr-4 font-medium">Patient</th>
                    <th className="py-2 pr-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {doctor.appointments.map((a) => (
                    <tr key={a.id}>
                      <td className="py-3 pr-4 text-gray-600">{a.date}</td>
                      <td className="py-3 pr-4 text-gray-800">{a.patient}</td>
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

function MiniStat({ label, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
      <p className="text-lg font-bold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}