// StaffStats.jsx
export default function StaffStats({ staff = [] }) {
  const totalStaff = staff.length || 6;
  const activeStaff = (staff || []).filter(s => s.status === "Active").length || 5;
  const doctors = (staff || []).filter(s => s.role === "Doctor").length || 2;
  const admins = (staff || []).filter(s => s.role === "Admin" || s.role === "Super Admin").length || 2;

  const stats = [
    { label: "Total Staff", value: totalStaff, color: "bg-purple-100 text-purple-600", icon: "👥" },
    { label: "Active Staff", value: activeStaff, color: "bg-green-100 text-green-600", icon: "✓" },
    { label: "Doctors", value: doctors, color: "bg-red-100 text-red-600", icon: "🩺" },
    { label: "Admins", value: admins, color: "bg-blue-100 text-blue-600", icon: "⚙️" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className={`rounded-lg p-4 ${stat.color}`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium opacity-75">{stat.label}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
            <span className="text-3xl">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
