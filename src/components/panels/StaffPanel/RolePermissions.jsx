// RolePermissions.jsx
export default function RolePermissions() {
  const permissions = [
    {
      role: "Super Admin",
      permissions: ["All Access", "User Management", "System Settings", "Reports", "Audit Logs"]
    },
    {
      role: "Admin",
      permissions: ["Patient Management", "Doctor Management", "Appointments", "Billing", "Reports"]
    },
    {
      role: "Doctor",
      permissions: ["View Patients", "Manage Appointments", "Medical Records", "Prescriptions"]
    },
    {
      role: "Receptionist",
      permissions: ["Appointment Booking", "Patient Registration", "Call Logs", "Basic Reports"]
    },
    {
      role: "Nurse",
      permissions: ["Patient Care", "Vital Signs", "Medicine Distribution", "Patient Notes"]
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Role Permissions Matrix</h3>
      
      <div className="space-y-4">
        {permissions.map((item, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-bold text-gray-900 mb-3">{item.role}</h4>
            <div className="flex flex-wrap gap-2">
              {item.permissions.map((perm, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  ✓ {perm}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
