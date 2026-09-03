// StaffCard.jsx
import { useNavigate } from "react-router-dom";

const roleColors = {
  "Admin": "bg-blue-100 text-blue-800",
  "Doctor": "bg-red-100 text-red-800",
  "Receptionist": "bg-green-100 text-green-800",
  "Nurse": "bg-orange-100 text-orange-800",
  "Super Admin": "bg-purple-100 text-purple-800",
};

export default function StaffCard({ staff, onToggleStatus }) {
  const navigate = useNavigate();
  const statusColor = staff.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  const roleColor = roleColors[staff.role] || "bg-gray-100 text-gray-800";

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-900">{staff.name}</h3>
          <p className="text-sm text-gray-600">{staff.id}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${statusColor}`}>
          {staff.status}
        </span>
      </div>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Role:</span>
          <span className={`text-xs font-semibold px-2 py-1 rounded ${roleColor}`}>
            {staff.role}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Department:</span>
          <span className="font-medium">{staff.department}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Email:</span>
          <span className="font-medium text-blue-600 text-xs">{staff.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Join Date:</span>
          <span className="font-medium">{staff.joinDate}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => navigate(`/staff/edit/${staff.id}`)}
          className="flex-1 bg-purple-600 text-white py-2 rounded text-sm hover:bg-purple-700 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onToggleStatus(staff.id)}
          className="flex-1 border border-purple-600 text-purple-600 py-2 rounded text-sm hover:bg-purple-50 transition"
        >
          {staff.status === "Active" ? "Deactivate" : "Activate"}
        </button>
      </div>
    </div>
  );
}