// src/components/layout/Sidebar.jsx
import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠", roles: ["admin", "doctor", "receptionist"] },
  { to: "/patients", label: "Patients", icon: "🧑‍🤝‍🧑", roles: ["admin", "doctor", "receptionist"] },
  { to: "/doctors", label: "Doctors", icon: "🩺", roles: ["admin"] },
  { to: "/appointments", label: "Appointments", icon: "📅", roles: ["admin", "doctor", "receptionist"] },
  { to: "/departments", label: "Departments", icon: "🏥", roles: ["admin"] },
  { to: "/billing", label: "Billing", icon: "💰", roles: ["admin", "receptionist"] },
  { to: "/reports", label: "Reports", icon: "📊", roles: ["admin"] },
  { to: "/settings", label: "Settings", icon: "⚙️", roles: ["admin", "doctor", "receptionist"] },
];

export default function Sidebar({ isOpen = false, onClose = () => {} }) {
  const { user } = useAuth();
  const role = user?.role || "receptionist";
  const visibleLinks = links.filter((link) => link.roles.includes(role));
  const asideRef = useRef(null);

  // Close on Escape, and lock background scroll while the mobile drawer is open
  useEffect(() => {
    if (!isOpen) {
      // If focus is still inside the (now hidden) drawer, move it out first —
      // otherwise aria-hidden gets applied to an element that retains focus,
      // which browsers correctly warn about.
      if (asideRef.current?.contains(document.activeElement)) {
        document.activeElement.blur();
      }
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Move focus into the drawer for keyboard/screen-reader users
    asideRef.current?.querySelector("a, button")?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        ref={asideRef}
        role="navigation"
        aria-label="Main navigation"
        // On mobile this behaves as a modal drawer; hide it from assistive tech
        // entirely when closed instead of just visually shifting it off-screen
        aria-hidden={!isOpen && window.innerWidth < 1024 ? true : undefined}
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100
          flex flex-col transform transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-blue-600">HMS</h1>
            <p className="text-xs text-gray-400">Hospital Management</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.currentTarget.blur();
              onClose();
            }}
            className="lg:hidden text-gray-400 hover:text-gray-600 text-xl leading-none"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {visibleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <span aria-hidden="true">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}