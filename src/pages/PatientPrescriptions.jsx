// src/pages/PatientPrescriptions.jsx
import { useState } from "react";

export default function PatientPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([
    {
      id: "RX-001",
      date: "2026-08-20",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      status: "Active",
      duration: "30 days",
      medicines: [
        {
          name: "Aspirin",
          dosage: "100mg",
          frequency: "Once daily",
          route: "Oral",
          quantity: 30,
          unit: "tablets",
          timing: "Morning",
          instructions: "Take with food",
          sideEffects: "Stomach upset, Bleeding",
        },
        {
          name: "Atorvastatin",
          dosage: "20mg",
          frequency: "Once daily",
          route: "Oral",
          quantity: 30,
          unit: "tablets",
          timing: "Evening",
          instructions: "Take without food",
          sideEffects: "Muscle pain, Liver issues",
        },
      ],
      issuedDate: "2026-08-20",
      expiryDate: "2026-09-20",
      refillsAvailable: 2,
      notes: "Continue as directed. Do not stop medication without consulting.",
      fileUrl: "prescription-001.pdf",
    },
    {
      id: "RX-002",
      date: "2026-08-10",
      doctor: "Dr. Rakesh Verma",
      department: "General Medicine",
      status: "Active",
      duration: "60 days",
      medicines: [
        {
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          route: "Oral",
          quantity: 60,
          unit: "tablets",
          timing: "With meals",
          instructions: "Take with breakfast and dinner",
          sideEffects: "Nausea, Diarrhea, Metallic taste",
        },
      ],
      issuedDate: "2026-08-10",
      expiryDate: "2026-10-10",
      refillsAvailable: 1,
      notes: "Monitor blood sugar regularly. Adjust diet accordingly.",
      fileUrl: "prescription-002.pdf",
    },
    {
      id: "RX-003",
      date: "2026-07-15",
      doctor: "Dr. Neha Kapoor",
      department: "Pediatrics",
      status: "Completed",
      duration: "14 days",
      medicines: [
        {
          name: "Amoxicillin",
          dosage: "250mg",
          frequency: "Three times daily",
          route: "Oral",
          quantity: 42,
          unit: "tablets",
          timing: "Every 8 hours",
          instructions: "Complete the full course",
          sideEffects: "Allergic reactions, Rash, Diarrhea",
        },
      ],
      issuedDate: "2026-07-15",
      expiryDate: "2026-07-29",
      refillsAvailable: 0,
      notes: "Course completed. No refills available.",
      fileUrl: "prescription-003.pdf",
    },
  ]);

  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredPrescriptions = prescriptions.filter((rx) => {
    if (filter === "all") return true;
    return rx.status.toLowerCase() === filter.toLowerCase();
  });

  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}...`);
  };

  const handleOrderMedicine = (rxId, medicineName) => {
    alert(`Order placed for ${medicineName} from prescription ${rxId}`);
  };

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : status === "Expiring Soon"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-gray-100 text-gray-800";
  };

  const getDaysRemaining = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  return (
    <div className="patient-page min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">💊 My Prescriptions</h1>
          <p className="text-gray-600 mt-1">Manage your medications and prescriptions</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {["all", "Active", "Completed"].map((status) => (
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
        </div>

        {/* Prescriptions List */}
        <div className="space-y-4">
          {filteredPrescriptions.length > 0 ? (
            filteredPrescriptions.map((rx) => (
              <div key={rx.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Prescription {rx.id}</h3>
                      <p className="text-sm text-gray-600">Issued: {rx.date}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className={`text-sm font-semibold px-4 py-2 rounded-full ${getStatusColor(rx.status)}`}>
                        {rx.status}
                      </span>
                      <button
                        onClick={() => setSelectedPrescription(rx)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">DOCTOR</label>
                      <p className="font-semibold text-gray-900">{rx.doctor}</p>
                      <p className="text-sm text-gray-600">{rx.department}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">DURATION</label>
                      <p className="font-semibold text-gray-900">{rx.duration}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">EXPIRES</label>
                      <p className="font-semibold text-gray-900">{rx.expiryDate}</p>
                      <p className="text-sm text-gray-600">{getDaysRemaining(rx.expiryDate)} days left</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">MEDICINES</label>
                      <p className="font-semibold text-gray-900">{rx.medicines.length} medicine(s)</p>
                      <p className="text-sm text-gray-600">Refills: {rx.refillsAvailable}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500 text-lg">No prescriptions found</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedPrescription && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-blue-600 text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Prescription Details</h2>
                <button onClick={() => setSelectedPrescription(null)} className="text-2xl hover:text-blue-200">✕</button>
              </div>

              <div className="p-6 space-y-6">
                {/* Header Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Prescription ID</label>
                    <p className="font-semibold text-gray-900">{selectedPrescription.id}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Issued Date</label>
                    <p className="font-semibold text-gray-900">{selectedPrescription.issuedDate}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Expiry Date</label>
                    <p className="font-semibold text-gray-900">{selectedPrescription.expiryDate}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Status</label>
                    <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(selectedPrescription.status)}`}>
                      {selectedPrescription.status}
                    </span>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Prescribed By</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 font-semibold">Doctor</label>
                      <p className="font-semibold text-gray-900">{selectedPrescription.doctor}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-semibold">Department</label>
                      <p className="font-semibold text-gray-900">{selectedPrescription.department}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-semibold">Refills Available</label>
                      <p className="font-semibold text-gray-900">{selectedPrescription.refillsAvailable}</p>
                    </div>
                  </div>
                </div>

                {/* Medicines */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Medicines</h3>
                  <div className="space-y-4">
                    {selectedPrescription.medicines.map((med, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">{med.name}</h4>
                            <p className="text-blue-600 font-semibold">{med.dosage}</p>
                          </div>
                          <button
                            onClick={() => handleOrderMedicine(selectedPrescription.id, med.name)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium text-sm"
                          >
                            Order Medicine
                          </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                          <div>
                            <label className="text-xs text-gray-600 font-semibold">FREQUENCY</label>
                            <p className="font-semibold text-gray-900">{med.frequency}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 font-semibold">ROUTE</label>
                            <p className="font-semibold text-gray-900">{med.route}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 font-semibold">QUANTITY</label>
                            <p className="font-semibold text-gray-900">{med.quantity} {med.unit}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-600 font-semibold">TIMING</label>
                            <p className="font-semibold text-gray-900">{med.timing}</p>
                          </div>
                        </div>

                        <div className="border-t pt-3 space-y-2 text-sm">
                          <div>
                            <label className="text-gray-600 font-semibold">Instructions:</label>
                            <p className="text-gray-900">{med.instructions}</p>
                          </div>
                          <div>
                            <label className="text-gray-600 font-semibold">Possible Side Effects:</label>
                            <p className="text-gray-900">{med.sideEffects}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Doctor's Notes */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Doctor's Notes</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedPrescription.notes}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t">
                  <button
                    onClick={() => handleDownload(selectedPrescription.fileUrl)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    📥 Download Prescription
                  </button>
                  <button
                    onClick={() => setSelectedPrescription(null)}
                    className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
