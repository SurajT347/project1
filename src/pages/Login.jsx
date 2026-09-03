// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Demo Credentials for Different Roles
  const demoCredentials = {
    patient: { email: "patient@hospital.com", password: "patient123", name: "Amit Sharma" },
    doctor: { email: "doctor@hospital.com", password: "doctor123", name: "Dr. Sarah Johnson" },
    staff: { email: "staff@hospital.com", password: "staff123", name: "Anita Desai" },
    admin: { email: "admin@hospital.com", password: "admin123", name: "Dr. Vikram Singh" },
    superadmin: { email: "superadmin@hospital.com", password: "superadmin123", name: "Vikram Mehta" },
  };

  const [selectedRole, setSelectedRole] = useState("patient");
  const [formData, setFormData] = useState({
    email: demoCredentials.patient.email,
    password: demoCredentials.patient.password,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setFormData({
      email: demoCredentials[role].email,
      password: demoCredentials[role].password,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      // Check credentials for selected role
      const creds = demoCredentials[selectedRole];
      
      if (email === creds.email && password === creds.password) {
        login(
          {
            name: creds.name,
            email,
            role: selectedRole,
          },
          `${selectedRole}-demo-token`
        );
        navigate("/dashboard");
      } else {
        setError("Invalid email or password for this role.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const useDemoCredentials = () => {
    const creds = demoCredentials[selectedRole];
    setFormData({
      email: creds.email,
      password: creds.password,
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-violet-50 to-purple-100 px-4 py-5">
      <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-purple-300/30 blur-3xl" />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/80 bg-white shadow-2xl shadow-blue-900/15">
        
        {/* Logo / Title */}
        <div className="bg-gradient-to-r from-blue-700 via-violet-600 to-purple-600 px-5 py-5 text-center text-white">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-sm font-bold shadow-inner ring-1 ring-white/25">
            HMS
          </div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            Hospital Management System
          </h1>
          <p className="mt-1 text-sm text-blue-50">
            Sign in to your account
          </p>
        </div>

        <div className="space-y-4 p-5 sm:p-6">

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-5 gap-2 rounded-lg bg-gray-100 p-1">
          {[
            { key: "patient", label: "👤", title: "Patient" },
            { key: "doctor", label: "🩺", title: "Doctor" },
            { key: "staff", label: "👨‍⚕️", title: "Staff" },
            { key: "admin", label: "⚙️", title: "Admin" },
            { key: "superadmin", label: "👑", title: "Super" },
          ].map((role) => (
            <button
              key={role.key}
              onClick={() => handleRoleChange(role.key)}
              className={`rounded-md py-2 text-xs font-semibold transition ${
                selectedRole === role.key
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              title={role.title}
            >
              {role.label}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Demo Credentials Info */}
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-3 text-xs text-blue-700">
          <div className="font-semibold mb-1">Demo Credentials for {selectedRole.toUpperCase()}:</div>
          <div>📧 {demoCredentials[selectedRole].email}</div>
          <div>🔐 {demoCredentials[selectedRole].password}</div>
        </div>

        <button
          type="button"
          onClick={useDemoCredentials}
          className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50"
        >
          ✓ Use demo credentials
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-semibold text-slate-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@hospital.com"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-semibold text-slate-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="font-semibold text-blue-600 hover:text-purple-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Role Info Section */}
        <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600 border border-gray-200">
          <div className="font-semibold text-gray-900 mb-2">Role Access Info:</div>
          <div className="space-y-1">
            {selectedRole === "patient" && <div>✓ View appointments, medical records, prescriptions</div>}
            {selectedRole === "doctor" && <div>✓ Manage patients, view schedules, write prescriptions</div>}
            {selectedRole === "staff" && <div>✓ Book appointments, patient registration, manage records</div>}
            {selectedRole === "admin" && <div>✓ Full access: Patients, Doctors, Appointments, Billing</div>}
            {selectedRole === "superadmin" && <div>✓ Complete system access: Users, Settings, All Features</div>}
          </div>
        </div>

        {/* Footer */}
        <p className="mt-1 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-blue-600 hover:text-purple-600 hover:underline">
            Register
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}