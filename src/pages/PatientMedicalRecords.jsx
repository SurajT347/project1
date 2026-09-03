// src/pages/PatientMedicalRecords.jsx
import { useState } from "react";

export default function PatientMedicalRecords() {
  const [records, setRecords] = useState([
    {
      id: "MR-001",
      date: "2026-08-15",
      type: "Check-up",
      doctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      diagnosis: "Hypertension",
      symptoms: "High blood pressure, occasional headaches",
      treatment: "Prescribed Atenolol 50mg daily",
      bloodPressure: "150/95 mmHg",
      temperature: "98.6°F",
      weight: "75 kg",
      height: "5'10\"",
      bmi: "27.1",
      notes: "Continue current medication. Follow-up in 2 weeks.",
      fileUrl: "medical-record-001.pdf",
    },
    {
      id: "MR-002",
      date: "2026-07-20",
      type: "Consultation",
      doctor: "Dr. Rakesh Verma",
      department: "General Medicine",
      diagnosis: "Type 2 Diabetes",
      symptoms: "Increased thirst, fatigue",
      treatment: "Prescribed Metformin 500mg, Lifestyle changes",
      bloodPressure: "145/90 mmHg",
      temperature: "98.5°F",
      weight: "75 kg",
      bloodSugar: "165 mg/dL",
      bmi: "27.1",
      notes: "Diet modification recommended. Monthly follow-up required.",
      fileUrl: "medical-record-002.pdf",
    },
    {
      id: "MR-003",
      date: "2026-06-10",
      type: "Lab Report",
      doctor: "Dr. Neha Kapoor",
      department: "Pathology",
      diagnosis: "Normal",
      symptoms: "None",
      treatment: "No treatment needed",
      whiteBloodCells: "7.5 K/μL",
      redBloodCells: "4.8 M/μL",
      hemoglobin: "14.5 g/dL",
      platelets: "250 K/μL",
      cholesterol: "180 mg/dL",
      notes: "All parameters within normal range.",
      fileUrl: "lab-report-001.pdf",
    },
  ]);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredRecords = records.filter((record) => {
    if (filter === "all") return true;
    return record.type === filter;
  });

  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}...`);
    // In real implementation, this would download the file
  };

  return (
    <div className="patient-page min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">📋 Medical Records</h1>
          <p className="text-gray-600 mt-1">View and manage your medical history</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {["all", "Check-up", "Consultation", "Lab Report"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-4">
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <div key={record.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{record.type}</h3>
                      <p className="text-sm text-gray-600">Record ID: {record.id}</p>
                    </div>
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                    >
                      View Details
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">DATE</label>
                      <p className="font-semibold text-gray-900">{record.date}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">DOCTOR</label>
                      <p className="font-semibold text-gray-900">{record.doctor}</p>
                      <p className="text-sm text-gray-600">{record.department}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">DIAGNOSIS</label>
                      <p className="font-semibold text-gray-900">{record.diagnosis}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 font-semibold">TREATMENT</label>
                      <p className="font-semibold text-gray-900 truncate">{record.treatment}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <p className="text-gray-500 text-lg">No medical records found</p>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedRecord && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-blue-600 text-white p-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold">Medical Record Details</h2>
                <button onClick={() => setSelectedRecord(null)} className="text-2xl hover:text-blue-200">✕</button>
              </div>

              <div className="p-6 space-y-6">
                {/* Header Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Record ID</label>
                    <p className="font-semibold text-gray-900">{selectedRecord.id}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Date</label>
                    <p className="font-semibold text-gray-900">{selectedRecord.date}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Type</label>
                    <p className="font-semibold text-gray-900">{selectedRecord.type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 font-semibold">Doctor</label>
                    <p className="font-semibold text-gray-900">{selectedRecord.doctor}</p>
                  </div>
                </div>

                {/* Clinical Details */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Clinical Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 font-semibold">Diagnosis</label>
                      <p className="font-semibold text-gray-900">{selectedRecord.diagnosis}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-semibold">Symptoms</label>
                      <p className="font-semibold text-gray-900">{selectedRecord.symptoms}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 font-semibold">Treatment</label>
                      <p className="font-semibold text-gray-900">{selectedRecord.treatment}</p>
                    </div>
                  </div>
                </div>

                {/* Vital Signs */}
                {(selectedRecord.bloodPressure || selectedRecord.temperature || selectedRecord.weight) && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Vital Signs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {selectedRecord.bloodPressure && (
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <label className="text-sm text-gray-600 font-semibold">Blood Pressure</label>
                          <p className="font-bold text-blue-900 text-lg">{selectedRecord.bloodPressure}</p>
                        </div>
                      )}
                      {selectedRecord.temperature && (
                        <div className="bg-green-50 p-4 rounded-lg">
                          <label className="text-sm text-gray-600 font-semibold">Temperature</label>
                          <p className="font-bold text-green-900 text-lg">{selectedRecord.temperature}</p>
                        </div>
                      )}
                      {selectedRecord.weight && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <label className="text-sm text-gray-600 font-semibold">Weight</label>
                          <p className="font-bold text-purple-900 text-lg">{selectedRecord.weight}</p>
                        </div>
                      )}
                      {selectedRecord.bmi && (
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <label className="text-sm text-gray-600 font-semibold">BMI</label>
                          <p className="font-bold text-orange-900 text-lg">{selectedRecord.bmi}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Lab Results */}
                {(selectedRecord.bloodSugar || selectedRecord.hemoglobin || selectedRecord.cholesterol) && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Lab Results</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedRecord.bloodSugar && (
                        <div className="border border-gray-200 p-4 rounded-lg">
                          <label className="text-sm text-gray-600 font-semibold">Blood Sugar</label>
                          <p className="font-bold text-gray-900">{selectedRecord.bloodSugar}</p>
                        </div>
                      )}
                      {selectedRecord.hemoglobin && (
                        <div className="border border-gray-200 p-4 rounded-lg">
                          <label className="text-sm text-gray-600 font-semibold">Hemoglobin</label>
                          <p className="font-bold text-gray-900">{selectedRecord.hemoglobin}</p>
                        </div>
                      )}
                      {selectedRecord.cholesterol && (
                        <div className="border border-gray-200 p-4 rounded-lg">
                          <label className="text-sm text-gray-600 font-semibold">Cholesterol</label>
                          <p className="font-bold text-gray-900">{selectedRecord.cholesterol}</p>
                        </div>
                      )}
                      {selectedRecord.whiteBloodCells && (
                        <div className="border border-gray-200 p-4 rounded-lg">
                          <label className="text-sm text-gray-600 font-semibold">WBC</label>
                          <p className="font-bold text-gray-900">{selectedRecord.whiteBloodCells}</p>
                        </div>
                      )}
                      {selectedRecord.redBloodCells && (
                        <div className="border border-gray-200 p-4 rounded-lg">
                          <label className="text-sm text-gray-600 font-semibold">RBC</label>
                          <p className="font-bold text-gray-900">{selectedRecord.redBloodCells}</p>
                        </div>
                      )}
                      {selectedRecord.platelets && (
                        <div className="border border-gray-200 p-4 rounded-lg">
                          <label className="text-sm text-gray-600 font-semibold">Platelets</label>
                          <p className="font-bold text-gray-900">{selectedRecord.platelets}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Doctor's Notes</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRecord.notes}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t">
                  <button
                    onClick={() => handleDownload(selectedRecord.fileUrl)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    📥 Download Record
                  </button>
                  <button
                    onClick={() => setSelectedRecord(null)}
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
