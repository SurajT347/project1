// src/pages/StaffAppointmentManagement.jsx
import { useState } from "react";

export default function StaffAppointmentManagement() {
  const [appointments, setAppointments] = useState([
    {
      id: "APT-001",
      patientName: "Amit Sharma",
      patientId: "P-1001",
      date: "2026-09-05",
      time: "10:00 AM",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      status: "Confirmed",
      type: "Check-up",
      phone: "+91 98765 43210",
      notes: "Regular cardiac checkup",
    },
    {
      id: "APT-002",
      patientName: "Priya Singh",
      patientId: "P-1002",
      date: "2026-09-05",
      time: "10:30 AM",
      doctor: "Dr. Mike Chen",
      department: "General Medicine",
      status: "Confirmed",
      type: "Follow-up",
      phone: "+91 97654 32109",
      notes: "Follow-up visit",
    },
    {
      id: "APT-003",
      patientName: "Arjun Patel",
      patientId: "P-1003",
      date: "2026-09-05",
      time: "11:00 AM",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      status: "Pending",
      type: "Consultation",
      phone: "+91 96543 21098",
      notes: "Consultation required",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [showBookModal, setShowBookModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    patientId: "",
    date: "",
    time: "",
    doctor: "",
    department: "",
    type: "Check-up",
    phone: "",
    notes: "",
  });

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "all") return true;
    return apt.status === filter;
  });

  const handleBookAppointment = () => {
    if (
      newAppointment.patientName &&
      newAppointment.date &&
      newAppointment.time &&
      newAppointment.doctor
    ) {
      const appointment = {
        id: `APT-${Math.floor(Math.random() * 10000)}`,
        ...newAppointment,
        status: "Confirmed",
      };
      setAppointments([...appointments, appointment]);
      setShowBookModal(false);
      setNewAppointment({
        patientName: "",
        patientId: "",
        date: "",
        time: "",
        doctor: "",
        department: "",
        type: "Check-up",
        phone: "",
        notes: "",
      });
      alert("Appointment booked successfully!");
    } else {
      alert("Please fill all required fields");
    }
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
    alert("Appointment cancelled");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">📅 Appointment Management</h1>
          <p className="text-gray-600 mt-1">Book, manage, and track patient appointments</p>
        </div>

        {/* Book Appointment Button */}
        <button
          onClick={() => setShowBookModal(true)}
          className="mb-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-bold"
        >
          + Book New Appointment
        </button>

        {/* Status Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "all"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            All Appointments
          </button>
          <button
            onClick={() => setFilter("Confirmed")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "Confirmed"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter("Pending")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "Pending"
                ? "bg-yellow-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Pending
          </button>
        </div>

        {/* Appointments List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredAppointments.map((apt) => (
            <div key={apt.id} className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{apt.patientName}</h3>
                  <p className="text-gray-600 text-sm">ID: {apt.patientId}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(apt.status)}`}>
                  {apt.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-sm text-gray-600 font-semibold">Date & Time</label>
                  <p className="font-semibold text-gray-900">{apt.date} at {apt.time}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 font-semibold">Doctor</label>
                  <p className="font-semibold text-gray-900">{apt.doctor}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 font-semibold">Department</label>
                  <p className="font-semibold text-gray-900">{apt.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b">
                <div>
                  <label className="text-sm text-gray-600 font-semibold">Type</label>
                  <p className="font-semibold text-gray-900">{apt.type}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 font-semibold">Phone</label>
                  <p className="font-semibold text-gray-900">{apt.phone}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 font-semibold">Notes</label>
                  <p className="font-semibold text-gray-900">{apt.notes}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold">
                  ✎ Reschedule
                </button>
                <button
                  onClick={() => handleCancelAppointment(apt.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-semibold"
                >
                  ✕ Cancel
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Book Appointment Modal */}
        {showBookModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4">
                <h2 className="text-2xl font-bold text-gray-900">📅 Book New Appointment</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Patient Name *</label>
                    <input
                      type="text"
                      value={newAppointment.patientName}
                      onChange={(e) =>
                        setNewAppointment({ ...newAppointment, patientName: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Patient ID</label>
                    <input
                      type="text"
                      value={newAppointment.patientId}
                      onChange={(e) =>
                        setNewAppointment({ ...newAppointment, patientId: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Date *</label>
                    <input
                      type="date"
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Time *</label>
                    <input
                      type="time"
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Doctor *</label>
                    <select
                      value={newAppointment.doctor}
                      onChange={(e) =>
                        setNewAppointment({ ...newAppointment, doctor: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Doctor</option>
                      <option value="Dr. Sarah Johnson">Dr. Sarah Johnson</option>
                      <option value="Dr. Mike Chen">Dr. Mike Chen</option>
                      <option value="Dr. Emily White">Dr. Emily White</option>
                      <option value="Dr. James Wilson">Dr. James Wilson</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Department</label>
                    <select
                      value={newAppointment.department}
                      onChange={(e) =>
                        setNewAppointment({ ...newAppointment, department: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Department</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Pediatrics">Pediatrics</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Appointment Type</label>
                    <select
                      value={newAppointment.type}
                      onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Check-up">Check-up</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Treatment">Treatment</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Phone Number</label>
                    <input
                      type="tel"
                      value={newAppointment.phone}
                      onChange={(e) =>
                        setNewAppointment({ ...newAppointment, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="Patient phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Notes</label>
                  <textarea
                    value={newAppointment.notes}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, notes: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Additional notes"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="bg-gray-50 border-t px-6 py-4 flex gap-3">
                <button
                  onClick={handleBookAppointment}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-bold"
                >
                  ✓ Book Appointment
                </button>
                <button
                  onClick={() => setShowBookModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 font-bold"
                >
                  ✕ Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
