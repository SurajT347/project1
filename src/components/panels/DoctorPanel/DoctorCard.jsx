// DoctorCard.jsx
export default function DoctorCard({ doctor }) {
  const statusColor = doctor.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-900">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.id}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColor}`}>
          {doctor.status}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Department:</span>
          <span className="font-medium text-red-600">{doctor.department}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Experience:</span>
          <span className="font-medium">{doctor.experience} years</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phone:</span>
          <span className="font-medium text-blue-600">{doctor.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Availability:</span>
          <span className="font-medium text-xs text-right">{doctor.availability}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-red-600 text-white py-2 rounded text-sm hover:bg-red-700 transition">
          View Profile
        </button>
        <button className="flex-1 border border-red-600 text-red-600 py-2 rounded text-sm hover:bg-red-50 transition">
          Schedule
        </button>
      </div>
    </div>
  );
}
