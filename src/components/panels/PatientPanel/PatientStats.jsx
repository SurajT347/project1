// PatientStats.jsx
export default function PatientStats({ patients }) {
  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === "Active").length;
  const malePatients = patients.filter(p => p.gender === "Male").length;
  const femalePatients = patients.filter(p => p.gender === "Female").length;
  const averageAge = patients.length > 0 
    ? Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length)
    : 0;

  const stats = [
    { label: "Total Patients", value: totalPatients, color: "bg-blue-100 text-blue-600", icon: "👥" },
    { label: "Active Patients", value: activePatients, color: "bg-green-100 text-green-600", icon: "✓" },
    { label: "Male Patients", value: malePatients, color: "bg-cyan-100 text-cyan-600", icon: "♂️" },
    { label: "Female Patients", value: femalePatients, color: "bg-pink-100 text-pink-600", icon: "♀️" },
    { label: "Average Age", value: `${averageAge}y`, color: "bg-purple-100 text-purple-600", icon: "📊" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
