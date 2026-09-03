// PatientDetails.jsx
export default function PatientDetails({ patient, onClose }) {
  if (!patient) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-blue-600 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Patient Details</h2>
          <button onClick={onClose} className="text-2xl hover:text-blue-200">✕</button>
        </div>

        <div className="p-6 space-y-6">
          {/* Personal Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Patient ID</p>
                <p className="font-medium">{patient.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{patient.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-medium">{patient.age} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="font-medium">{patient.gender}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{patient.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                  patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}>
                  {patient.status}
                </span>
              </div>
            </div>
          </div>

          {/* Medical Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">Medical Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Last Visit</p>
                <p className="font-medium">{patient.lastVisit}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Blood Type</p>
                <p className="font-medium">O+</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Allergies</p>
                <p className="font-medium">None Reported</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Chronic Diseases</p>
                <p className="font-medium">None</p>
              </div>
            </div>
          </div>

          {/* Recent Appointments */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 border-b pb-2">Recent Appointments</h3>
            <div className="space-y-2 text-sm">
              <p>2026-08-01 - General Checkup - Dr. Sarah Johnson</p>
              <p>2026-07-15 - Follow-up - Dr. Rakesh Verma</p>
              <p>2026-06-20 - Consultation - Dr. Neha Kapoor</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Edit Patient
            </button>
            <button className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50">
              View Medical History
            </button>
            <button onClick={onClose} className="flex-1 border border-gray-300 py-2 rounded hover:bg-gray-50">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
