// DoctorStats.jsx
export default function DoctorStats({ doctors }) {
  const totalDoctors = doctors.length;
  const activeDoctors = doctors.filter(d => d.status === "Active").length;
  const onLeaveDoctors = doctors.filter(d => d.status === "On Leave").length;
  const avgExperience = doctors.length > 0
    ? Math.round(doctors.reduce((sum, d) => sum + d.experience, 0) / doctors.length)
    : 0;

  const stats = [
    { label: "Total Doctors", value: totalDoctors, color: "bg-red-100 text-red-600", icon: "🩺" },
    { label: "Active Doctors", value: activeDoctors, color: "bg-green-100 text-green-600", icon: "✓" },
    { label: "On Leave", value: onLeaveDoctors, color: "bg-yellow-100 text-yellow-600", icon: "🏥" },
    { label: "Avg Experience", value: `${avgExperience}y`, color: "bg-blue-100 text-blue-600", icon: "⭐" },
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
