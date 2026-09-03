// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

// Auth pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

// Core pages
import Dashboard from "../pages/Dashboard";
import Patients from "../pages/Patients";
import PatientDetails from "../pages/PatientDetails";
import AddEditPatient from "../pages/AddEditPatient";
import Doctors from "../pages/Doctors";
import DoctorDetails from "../pages/DoctorDetails";
import AddEditDoctor from "../pages/AddEditDoctor";
import Appointments from "../pages/Appointments";
import AddEditAppointment from "../pages/AddEditAppointment";
import Departments from "../pages/Departments";
import Billing from "../pages/Billing";
import Reports from "../pages/Reports";
import UsersManagement from "../pages/UsersManagement";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

// Patient Portal Pages
import PatientDashboard from "../pages/PatientDashboard";
import PatientAppointments from "../pages/PatientAppointments";
import PatientMedicalRecords from "../pages/PatientMedicalRecords";
import PatientPrescriptions from "../pages/PatientPrescriptions";
import PatientProfile from "../pages/PatientProfile";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Redirect root to dashboard */}
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

      {/* Protected routes — all roles */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />

      {/* Patient Portal Routes — Patient role only */}
      <Route
        path="/patient-dashboard"
        element={
          <PrivateRoute allowedRoles={["patient"]}>
            <PatientDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/patient-appointments"
        element={
          <PrivateRoute allowedRoles={["patient"]}>
            <PatientAppointments />
          </PrivateRoute>
        }
      />
      <Route
        path="/patient-medical-records"
        element={
          <PrivateRoute allowedRoles={["patient"]}>
            <PatientMedicalRecords />
          </PrivateRoute>
        }
      />
      <Route
        path="/patient-prescriptions"
        element={
          <PrivateRoute allowedRoles={["patient"]}>
            <PatientPrescriptions />
          </PrivateRoute>
        }
      />
      <Route
        path="/patient-profile"
        element={
          <PrivateRoute allowedRoles={["patient"]}>
            <PatientProfile />
          </PrivateRoute>
        }
      />

      {/* Patients — Admin, Doctor, Receptionist */}
      <Route
        path="/patients"
        element={
          <PrivateRoute allowedRoles={["admin", "doctor", "receptionist"]}>
            <Patients />
          </PrivateRoute>
        }
      />
      <Route
        path="/patients/add"
        element={
          <PrivateRoute allowedRoles={["admin", "receptionist"]}>
            <Patients initialShowAddModal />
          </PrivateRoute>
        }
      />
      <Route
        path="/patients/edit/:id"
        element={
          <PrivateRoute allowedRoles={["admin", "receptionist"]}>
            <AddEditPatient />
          </PrivateRoute>
        }
      />
      <Route
        path="/patients/:id"
        element={
          <PrivateRoute allowedRoles={["admin", "doctor", "receptionist"]}>
            <PatientDetails />
          </PrivateRoute>
        }
      />

      {/* Doctors — Admin only for add/edit, all can view */}
      <Route
        path="/doctors"
        element={
          <PrivateRoute allowedRoles={["admin", "doctor", "receptionist"]}>
            <Doctors />
          </PrivateRoute>
        }
      />
      <Route
        path="/doctors/add"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Doctors initialShowAddModal />
          </PrivateRoute>
        }
      />
      <Route
        path="/doctors/edit/:id"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AddEditDoctor />
          </PrivateRoute>
        }
      />
      <Route
        path="/doctors/:id"
        element={
          <PrivateRoute allowedRoles={["admin", "doctor", "receptionist"]}>
            <DoctorDetails />
          </PrivateRoute>
        }
      />

      {/* Appointments — all roles */}
      <Route
        path="/appointments"
        element={
          <PrivateRoute allowedRoles={["admin", "doctor", "receptionist"]}>
            <Appointments />
          </PrivateRoute>
        }
      />
      <Route
        path="/appointments/add"
        element={
          <PrivateRoute allowedRoles={["admin", "receptionist"]}>
            <Appointments initialShowAddModal />
          </PrivateRoute>
        }
      />
      <Route
        path="/appointments/edit/:id"
        element={
          <PrivateRoute allowedRoles={["admin", "receptionist"]}>
            <AddEditAppointment />
          </PrivateRoute>
        }
      />

      {/* Departments — Admin only */}
      <Route
        path="/departments"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Departments />
          </PrivateRoute>
        }
      />

      {/* Billing — all clinical and administrative roles */}
      <Route
        path="/billing"
        element={
          <PrivateRoute allowedRoles={["admin", "doctor", "receptionist"]}>
            <Billing />
          </PrivateRoute>
        }
      />
      <Route
        path="/billing/add"
        element={
          <PrivateRoute allowedRoles={["admin", "doctor", "receptionist"]}>
            <Billing initialShowAddModal />
          </PrivateRoute>
        }
      />

      {/* Reports — Admin only */}
      <Route
        path="/reports"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Reports />
          </PrivateRoute>
        }
      />

      {/* User management — Admin only */}
      <Route
        path="/users"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <UsersManagement />
          </PrivateRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}