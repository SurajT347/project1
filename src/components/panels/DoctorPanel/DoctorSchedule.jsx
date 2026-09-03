// DoctorSchedule.jsx
export default function DoctorSchedule({ doctor }) {
  const schedule = [
    { day: "Monday", time: "10:00 AM - 4:00 PM", available: true },
    { day: "Tuesday", time: "10:00 AM - 4:00 PM", available: true },
    { day: "Wednesday", time: "10:00 AM - 4:00 PM", available: true },
    { day: "Thursday", time: "10:00 AM - 4:00 PM", available: true },
    { day: "Friday", time: "10:00 AM - 4:00 PM", available: true },
    { day: "Saturday", time: "Closed", available: false },
    { day: "Sunday", time: "Closed", available: false },
  ];

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-900">Weekly Schedule</h3>
      <div className="space-y-2">
        {schedule.map((slot, idx) => (
          <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded">
            <span className="font-medium text-gray-700">{slot.day}</span>
            <span className={`text-sm ${slot.available ? "text-green-600" : "text-gray-500"}`}>
              {slot.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
