// src/pages/PatientAppointments.jsx
import { useState } from "react";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([
    {
      id: "APT-001",
      date: "2026-09-05",
      time: "10:00 AM",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      status: "Confirmed",
      type: "Check-up",
      notes: "Regular cardiac checkup",
      location: "Room 201, Building A",
      duration: "30 mins",
    },
    {
      id: "APT-002",
      date: "2026-09-12",
      time: "2:00 PM",
      doctor: "Dr. Rakesh Verma",
      department: "General Medicine",
      status: "Pending",
      type: "Follow-up",
      notes: "Follow-up for diabetes management",
      location: "Room 105, Building B",
      duration: "20 mins",
    },
    {
      id: "APT-003",
      date: "2026-08-28",
      time: "11:30 AM",
      doctor: "Dr. Neha Kapoor",
      department: "Pediatrics",
      status: "Completed",
      type: "Consultation",
      notes: "Routine consultation",
      location: "Room 301, Building A",
      duration: "25 mins",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [showBookModal, setShowBookModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    doctor: "",
    department: "",
    type: "Check-up",
    notes: "",
  });

  const filteredAppointments = appointments.filter((apt) => {
    if (filter === "all") return true;
    return apt.status.toLowerCase() === filter.toLowerCase();
  });

  const handleBookAppointment = (e) => {
    e.preventDefault();
    const appointment = {
      id: `APT-${appointments.length + 1}`,
      ...newAppointment,
      status: "Pending",
      location: "TBD",
      duration: "30 mins",
    };
    setAppointments([...appointments, appointment]);
    setNewAppointment({
      date: "",
      time: "",
      doctor: "",
      department: "",
      type: "Check-up",
      notes: "",
    });
    setShowBookModal(false);
  };

  const handleCancelAppointment = (id) => {
    setAppointments(appointments.filter((apt) => apt.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="patient-page min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">📅 My Appointments</h1>
          <p className="text-gray-600 mt-1">Manage your medical appointments</p>
        </div>

        {/* Action Bar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-2 flex-wrap">
            {["all", "Confirmed", "Pending", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowBookModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            + Book Appointment
          </button>
        </div>

        {/* Book Appointment Modal */}
        {showBookModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-blue-600 text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Book New Appointment</h2>
                <button onClick={() => setShowBookModal(false)} className="text-2xl hover:text-blue-200">✕</button>
              </div>

              <form onSubmit={handleBookAppointment} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Appointment Date</label>
                    <input
                      type="date"
                      required
                      value={newAppointment.date}
                      onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Time</label>
                    <input
                      type="time"
                      required
                      value={newAppointment.time}
                      onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Department</label>
                    <select
                      required
                      value={newAppointment.department}
                      onChange={(e) => setNewAppointment({ ...newAppointment, department: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Department</option>
                      <option>Cardiology</option>
                      <option>General Medicine</option>
                      <option>Pediatrics</option>
                      <option>Orthopedics</option>
                      <option>Dermatology</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Doctor</label>
                    <select
                      required
                      value={newAppointment.doctor}
                      onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Doctor</option>
                      <option>Dr. Sarah Johnson</option>
                      <option>Dr. Rakesh Verma</option>
                      <option>Dr. Neha Kapoor</option>
                      <option>Dr. Vikram Singh</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Appointment Type</label>
                    <select
                      value={newAppointment.type}
                      onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Check-up</option>
                      <option>Follow-up</option>
                      <option>Consultation</option>
                      <option>Treatment</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Notes</label>
                  <textarea
                    value={newAppointment.notes}
                    onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                    placeholder="Any additional notes or symptoms..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold">
                    Book Appointment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookModal(false)}
                    className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((apt) => (
              <div key={apt.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{apt.type}</h3>
                    <p className="text-sm text-gray-600">Appointment ID: {apt.id}</p>
                  </div>
                  <span className={`text-sm font-semibold px-4 py-2 rounded-full ${getStatusColor(apt.status)}`}>
                    {apt.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-gray-600 font-semibold">DATE & TIME</label>
                    <p className="font-semibold text-gray-900">{apt.date}</p>
                    <p className="text-gray-700">{apt.time}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 font-semibold">DOCTOR</label>
                    <p className="font-semibold text-gray-900">{apt.doctor}</p>
                    <p className="text-gray-700">{apt.department}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 font-semibold">LOCATION</label>
                    <p className="font-semibold text-gray-900">{apt.location}</p>
                    <p className="text-gray-700">Duration: {apt.duration}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 font-semibold">NOTES</label>
                    <p className="font-semibold text-gray-900">{apt.notes}</p>
                  </div>
                </div>

                {apt.status !== "Completed" && (
                  <div className="flex gap-2 pt-4 border-t">
                    <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 font-semibold">
                      Reschedule
                    </button>
                    <button
                      onClick={() => handleCancelAppointment(apt.id)}
                      className="flex-1 border border-red-300 text-red-700 py-2 rounded-lg hover:bg-red-50 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500 text-lg">No appointments found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
