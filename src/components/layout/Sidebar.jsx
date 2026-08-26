// src/components/layout/Sidebar.jsx
import { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || "receptionist";
  const visibleLinks = links.filter((link) => link.roles.includes(role));
  const asideRef = useRef(null);

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login");
  };

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
          fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-700 via-violet-700 to-purple-800 text-white shadow-xl shadow-blue-950/20
          flex flex-col transform transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0 lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between border-b border-white/15 px-6 py-5">
          <div>
            <h1 className="text-lg font-bold tracking-widest text-white">HMS</h1>
            <p className="text-xs text-blue-100">Hospital Management</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.currentTarget.blur();
              onClose();
            }}
            className="text-xl leading-none text-white/70 transition hover:text-white lg:hidden"
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
                    ? "bg-white/20 text-white shadow-inner shadow-white/10"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <span aria-hidden="true">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/15 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-blue-100 transition hover:bg-white/10 hover:text-white"
          >
            <span aria-hidden="true">↪</span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}