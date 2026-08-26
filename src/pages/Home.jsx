// src/pages/Home.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ---------- Design tokens (see inline <style> for fonts + keyframes) ----------
  Paper   #F5F7F5   ink   #12241F
  Teal    #146356   Teal-bright #2E9C86
  Coral   #E8664B   Line  #DCE4E0   Muted #5B6B65
---------------------------------------------------------------------------- */

const services = [
  {
    id: "REC-01",
    title: "Patient Records",
    desc: "Unified medical history, prescriptions and visit notes — searchable in seconds, not folders.",
    icon: PatientIcon,
  },
  {
    id: "REC-02",
    title: "Doctor Directory",
    desc: "Profiles, specialties and live availability for every doctor across every department.",
    icon: DoctorIcon,
  },
  {
    id: "REC-03",
    title: "Appointments",
    desc: "Book, reschedule and confirm visits with automatic conflict checks against doctor schedules.",
    icon: CalendarIcon,
  },
  {
    id: "REC-04",
    title: "Departments",
    desc: "Organize staff, rooms and equipment by department, from Cardiology to General Medicine.",
    icon: DeptIcon,
  },
  {
    id: "REC-05",
    title: "Billing",
    desc: "Itemized invoices, insurance claims and payment tracking, reconciled automatically.",
    icon: BillingIcon,
  },
  {
    id: "REC-06",
    title: "Reports & Analytics",
    desc: "Occupancy, revenue and patient-outcome trends, updated as the day happens.",
    icon: ReportIcon,
  },
];

const stats = [
  { value: "1,240+", label: "Patients managed" },
  { value: "48", label: "Doctors onboard" },
  { value: "12", label: "Departments" },
  { value: "99.9%", label: "Uptime" },
];

export default function Home() {
  return (
    <div className="bg-[#F5F7F5] text-[#12241F]">
      <FontsAndMotion />
      <Nav />
      <Hero />
      <TrustStrip />
      <Services />
      <WhyHMS />
      <CTA />
      <Footer />
    </div>
  );
}

/* ---------------------------------- Nav ---------------------------------- */

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-[#DCE4E0]/80 bg-[#F5F7F5]/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-[#146356] text-white flex items-center justify-center font-bold text-sm font-[Fraunces]">
            H
          </span>
          <span className="font-semibold tracking-tight">
            HMS <span className="text-[#5B6B65] font-normal hidden sm:inline">— Hospital Management</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[#3C4B45]">
          <a href="#services" className="hover:text-[#146356] transition">Services</a>
          <a href="#why" className="hover:text-[#146356] transition">Why HMS</a>
          <Link to="/login" className="hover:text-[#146356] transition">Log in</Link>
          <Link
            to="/login"
            className="bg-[#146356] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#0F4E44] transition"
          >
            Get started
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-2xl leading-none text-[#12241F] p-1"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#DCE4E0] bg-[#F5F7F5] px-4 sm:px-6 py-4 flex flex-col gap-4 text-sm">
          <a href="#services" onClick={() => setOpen(false)} className="text-[#3C4B45]">Services</a>
          <a href="#why" onClick={() => setOpen(false)} className="text-[#3C4B45]">Why HMS</a>
          <Link to="/login" onClick={() => setOpen(false)} className="text-[#3C4B45]">Log in</Link>
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="bg-[#146356] text-white px-4 py-2.5 rounded-lg font-medium text-center"
          >
            Get started
          </Link>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
      <div>
        <p className="font-[IBM_Plex_Mono] text-xs tracking-widest text-[#146356] uppercase mb-4">
          Hospital Management System
        </p>
        <h1 className="font-[Fraunces] text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight text-[#0F1F1A]">
          Every ward, chart and
          <br className="hidden sm:block" /> appointment, <span className="text-[#146356]">in one pulse</span>.
        </h1>
        <p className="mt-5 text-base sm:text-lg text-[#5B6B65] max-w-md">
          HMS brings patients, doctors, departments and billing onto a single
          screen — so your staff spend less time switching tools and more
          time with people.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/login"
            className="bg-[#E8664B] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#D6553B] transition"
          >
            Get started
          </Link>
          <a
            href="#services"
            className="border border-[#DCE4E0] text-[#12241F] px-6 py-3 rounded-lg font-medium hover:border-[#146356] hover:text-[#146356] transition"
          >
            Explore services
          </a>
        </div>
      </div>

      <HeroMonitor />
    </section>
  );
}

/* Signature element: an EKG line that draws itself, then settles into a bar chart. */
function HeroMonitor() {
  return (
    <div className="relative rounded-2xl bg-[#0F1F1A] p-6 sm:p-8 shadow-xl shadow-[#0F1F1A]/10 overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <span className="font-[IBM_Plex_Mono] text-[11px] tracking-widest text-[#8FB6AC] uppercase">
          Live overview
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-[#8FB6AC] font-[IBM_Plex_Mono]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E9C86] hms-pulse" />
          synced
        </span>
      </div>

      <svg viewBox="0 0 400 120" className="w-full h-28" aria-hidden="true">
        <polyline
          points="0,60 40,60 55,20 70,100 85,40 100,60 400,60"
          fill="none"
          stroke="#2E9C86"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="hms-ekg"
        />
      </svg>

      <div className="mt-6 grid grid-cols-4 gap-3">
        {[52, 78, 40, 90].map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-full h-16 bg-[#1B342C] rounded-md flex items-end overflow-hidden">
              <div
                className="w-full bg-[#2E9C86] rounded-md hms-bar"
                style={{ height: `${h}%`, animationDelay: `${i * 0.15 + 0.9}s` }}
              />
            </div>
            <span className="text-[10px] font-[IBM_Plex_Mono] text-[#8FB6AC]">
              {["Mon", "Tue", "Wed", "Thu"][i]}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#2E9C86]/10 blur-2xl" />
    </div>
  );
}

/* ------------------------------- Trust strip ------------------------------- */

function TrustStrip() {
  return (
    <section className="border-y border-[#DCE4E0] bg-white/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-[Fraunces] text-2xl sm:text-3xl text-[#0F1F1A]">{s.value}</p>
            <p className="text-xs sm:text-sm text-[#5B6B65] mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Services --------------------------------- */

function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-xl mb-12">
        <p className="font-[IBM_Plex_Mono] text-xs tracking-widest text-[#146356] uppercase mb-3">
          Departmental directory
        </p>
        <h2 className="font-[Fraunces] text-3xl sm:text-4xl text-[#0F1F1A]">
          Six services. One record system.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map(({ id, title, desc, icon: Icon }) => (
          <div
            key={id}
            className="group bg-white border border-[#DCE4E0] rounded-2xl p-6 hover:border-[#146356] hover:shadow-md hover:shadow-[#146356]/5 transition"
          >
            <div className="flex items-start justify-between mb-5">
              <span className="w-11 h-11 rounded-xl bg-[#EAF3F0] text-[#146356] flex items-center justify-center group-hover:bg-[#146356] group-hover:text-white transition">
                <Icon />
              </span>
              <span className="font-[IBM_Plex_Mono] text-[11px] text-[#9AA8A2]">{id}</span>
            </div>
            <h3 className="font-semibold text-[#12241F] mb-1.5">{title}</h3>
            <p className="text-sm text-[#5B6B65] leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Why HMS --------------------------------- */

function WhyHMS() {
  const items = [
    {
      title: "Role-based access",
      desc: "Admins, doctors and receptionists each see exactly what their role needs — nothing more.",
    },
    {
      title: "Real-time scheduling",
      desc: "Appointment conflicts are caught before they happen, across every doctor and room.",
    },
    {
      title: "Records that stay put",
      desc: "One patient, one history — no re-entering the same details across departments.",
    },
  ];
  return (
    <section id="why" className="bg-[#0F1F1A] text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <p className="font-[IBM_Plex_Mono] text-xs tracking-widest text-[#2E9C86] uppercase mb-3">
          Why HMS
        </p>
        <h2 className="font-[Fraunces] text-3xl sm:text-4xl mb-12 max-w-lg">
          Built for the pace of a hospital floor.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {items.map((it) => (
            <div key={it.title} className="border-t border-white/15 pt-5">
              <h3 className="font-semibold mb-2">{it.title}</h3>
              <p className="text-sm text-[#A9BDB6] leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- CTA ----------------------------------- */

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="rounded-2xl bg-[#146356] px-6 sm:px-12 py-12 sm:py-14 text-center">
        <h2 className="font-[Fraunces] text-2xl sm:text-3xl text-white mb-3">
          Ready to bring your hospital onto one screen?
        </h2>
        <p className="text-[#CFE6DF] mb-8 max-w-md mx-auto">
          Set up takes minutes. Your team keeps the workflow, we just remove the friction.
        </p>
        <Link
          to="/login"
          className="inline-block bg-[#E8664B] text-white px-7 py-3 rounded-lg font-medium hover:bg-[#D6553B] transition"
        >
          Get started
        </Link>
      </div>
    </section>
  );
}

/* --------------------------------- Footer --------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-[#DCE4E0]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#5B6B65]">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-[#146356] text-white flex items-center justify-center font-bold text-xs font-[Fraunces]">
            H
          </span>
          <span>HMS — Hospital Management System</span>
        </div>
        <p>© {new Date().getFullYear()} HMS. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ------------------------------- Fonts + motion ------------------------------- */

function FontsAndMotion() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

      #root, body { font-family: 'Inter', sans-serif; }

      .hms-ekg {
        stroke-dasharray: 480;
        stroke-dashoffset: 480;
        animation: hms-draw 1.8s ease-out forwards;
      }
      @keyframes hms-draw {
        to { stroke-dashoffset: 0; }
      }

      .hms-bar {
        transform: scaleY(0);
        transform-origin: bottom;
        animation: hms-grow 0.6s ease-out forwards;
      }
      @keyframes hms-grow {
        to { transform: scaleY(1); }
      }

      .hms-pulse {
        animation: hms-pulse 1.6s ease-in-out infinite;
      }
      @keyframes hms-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.35; }
      }

      @media (prefers-reduced-motion: reduce) {
        .hms-ekg, .hms-bar, .hms-pulse { animation: none !important; }
        .hms-ekg { stroke-dashoffset: 0; }
        .hms-bar { transform: scaleY(1); }
      }
    `}</style>
  );
}

/* ---------------------------------- Icons ---------------------------------- */
/* Small inline SVGs, stroke-based, sized to 20px, inherit currentColor */

function iconProps() {
  return { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
}

function PatientIcon() {
  return (
    <svg {...iconProps()}>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
    </svg>
  );
}
function DoctorIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M9 3v4a3 3 0 0 0 6 0V3" />
      <path d="M6 4v5a6 6 0 0 0 12 0V4" />
      <circle cx="18" cy="17" r="3" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg {...iconProps()}>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
    </svg>
  );
}
function DeptIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M4 21V9l8-5 8 5v12" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}
function BillingIcon() {
  return (
    <svg {...iconProps()}>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="M3.5 10h17M7 14.5h4" />
    </svg>
  );
}
function ReportIcon() {
  return (
    <svg {...iconProps()}>
      <path d="M4 20V10M11 20V4M18 20v-7" />
    </svg>
  );
}