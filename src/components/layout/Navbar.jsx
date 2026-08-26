import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ onMenuClick = () => {} }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close the profile dropdown when clicking outside it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const today = new Date();

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-3 sm:px-6 gap-2">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Hamburger — visible only below the lg breakpoint, opens the drawer sidebar */}
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-gray-700 text-xl leading-none shrink-0 p-1 -ml-1"
          aria-label="Open menu"
        >
          ☰
        </button>

        {/* Full date on sm+ screens */}
        <div className="hidden sm:block text-sm text-gray-500 truncate">
          {today.toLocaleDateString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>

        {/* Short date on mobile so it never crowds the avatar */}
        <div className="sm:hidden text-xs text-gray-500 truncate">
          {today.toLocaleDateString("en-IN", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="relative shrink-0" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 sm:gap-3"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm shrink-0">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-gray-800">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {user?.role || "guest"}
            </p>
          </div>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-44 max-w-[calc(100vw-1.5rem)] bg-white rounded-lg shadow-md border border-gray-100 py-1 z-10">
            {/* Name/role shown here on mobile since header hides it */}
            <div className="sm:hidden px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-800 truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {user?.role || "guest"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Profile
            </button>
            <button
              type="button"
              onClick={() => {
                navigate("/settings");
                setMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Settings
            </button>
            <hr className="my-1 border-gray-100" />
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}