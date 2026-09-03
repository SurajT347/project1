// PatientCard.jsx
export default function PatientCard({ patient }) {
  const statusColor = patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-900">{patient.name}</h3>
          <p className="text-sm text-gray-600">{patient.id}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColor}`}>
          {patient.status}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Age:</span>
          <span className="font-medium">{patient.age} years</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Gender:</span>
          <span className="font-medium">{patient.gender}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phone:</span>
          <span className="font-medium text-blue-600">{patient.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Last Visit:</span>
          <span className="font-medium">{patient.lastVisit}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition">
          View Details
        </button>
        <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded text-sm hover:bg-blue-50 transition">
          Edit
        </button>
      </div>
    </div>
  );
}
