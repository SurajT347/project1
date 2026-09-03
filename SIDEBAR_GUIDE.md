# 📋 SIDEBAR MENU GUIDE - Role-Based Navigation

## Overview
The sidebar menu dynamically changes based on the user's role. Each role sees only the menu items relevant to their access level.

---

## 👤 PATIENT MENU

When logged in as **Patient**:

```
🏠 Dashboard
📅 My Appointments       → View scheduled appointments
📋 Medical Records       → View past medical records
💊 Prescriptions         → View doctor prescriptions
👤 My Profile            → Update personal information
```

**Features:**
- View personal appointments only
- Cannot see other patients' records
- Read-only access to prescriptions
- Update own profile information

---

## 🩺 DOCTOR MENU

When logged in as **Doctor**:

```
🏠 Dashboard
👥 My Patients           → View assigned patients
📅 Appointments          → View appointment schedule
💊 Prescriptions         → Write prescriptions
📋 Medical Records       → View patient medical history
⚙️ Settings              → Update doctor profile
```

**Features:**
- Manage assigned patients
- View consultation schedule
- Write and manage prescriptions
- Access patient medical records
- Update professional profile

---

## 👨‍⚕️ STAFF MENU

When logged in as **Staff**:

```
🏠 Dashboard
📅 Appointments          → Book/manage appointments
🧑‍🤝‍🧑 Patients              → Manage patient records
📊 Reports               → Generate staff reports
⚙️ Settings              → Update settings
```

**Features:**
- Book new appointments
- Patient registration
- Manage patient inquiries
- Generate basic reports
- View call logs

---

## ⚙️ ADMIN MENU

When logged in as **Admin**:

```
🏠 Dashboard
🧑‍🤝‍🧑 Patients              → Full patient management
🩺 Doctors                → Full doctor management
📅 Appointments          → Manage all appointments
🏥 Departments           → Manage departments
💰 Billing               → Manage billing & invoices
📊 Reports               → View all reports
👥 User Management       → Manage system users
⚙️ Settings              → System settings
```

**Features:**
- Full system control (except settings)
- Manage all patients and doctors
- Handle billing and invoicing
- View comprehensive reports
- Manage user accounts
- Department management

---

## 👑 SUPER ADMIN MENU

When logged in as **Super Admin**:

```
🏠 Dashboard
🧑‍🤝‍🧑 Patients              → Full patient management
🩺 Doctors                → Full doctor management
📅 Appointments          → Manage all appointments
🏥 Departments           → Manage departments
💰 Billing               → Manage billing & invoices
📊 Reports               → View all reports
👥 User Management       → Manage all users
⚙️ Settings              → Complete system settings
```

**Features:**
- **COMPLETE SYSTEM ACCESS**
- All Admin features + more
- Full system settings access
- User role & permission management
- Audit log access
- Database backup management

---

## 🔍 HOW SIDEBAR WORKS

### Dynamic Role Detection
```javascript
const role = user?.role || "patient";
const visibleLinks = getMenuItems(role);
```

### Menu is Generated From Role
```javascript
const getMenuItems = (role) => {
  const menusByRole = {
    patient: [...],
    doctor: [...],
    staff: [...],
    admin: [...],
    superadmin: [...]
  };
  return menusByRole[role] || menusByRole.patient;
};
```

### Each Role Gets Unique Menu
- **Patient**: Simple 5-item menu
- **Doctor**: 6-item clinical menu
- **Staff**: 5-item operational menu
- **Admin**: 9-item full admin menu
- **Super Admin**: 9-item complete menu

---

## 👤 USER INFO DISPLAY

At the bottom of sidebar, each logged-in user sees:

```
┌─────────────────────────┐
│  [Name]                 │  👤
│  Role (lowercase)       │
│  Email Address          │
└─────────────────────────┘
    ↪ Logout Button
```

**Example for Doctor:**
```
┌─────────────────────────┐
│  Dr. Sarah Johnson      │
│  doctor                 │
│  doctor@hospital.com    │
└─────────────────────────┘
    ↪ Logout
```

---

## 🏷️ SIDEBAR HEADER

The sidebar header shows the portal type based on role:

| Role | Header Text | Icon |
|------|-------------|------|
| Patient | Patient Portal | 👤 |
| Doctor | Doctor Portal | 🩺 |
| Staff | Staff Portal | 👨‍⚕️ |
| Admin | Admin Panel | ⚙️ |
| Super Admin | Super Admin Panel | 👑 |

---

## 📱 MOBILE & RESPONSIVE

✅ Sidebar works on all screen sizes  
✅ Mobile: Drawer that slides in from left  
✅ Tablet: Partial sidebar visible  
✅ Desktop: Full sidebar always visible  
✅ Touch-friendly menu items  

---

## 🔐 SECURITY FEATURES

✅ **Role-Based Access**: Only relevant menu items shown  
✅ **No Direct Access**: Can't navigate to unauthorized pages  
✅ **Private Routes**: Route protection in place  
✅ **User Context**: Uses AuthContext for role  
✅ **Fallback**: Defaults to "patient" if no role  

---

## 🎨 STYLING

**Colors by Role:**
- Background: Gradient (Blue → Violet → Purple)
- Hover: White/10 overlay
- Active: White/20 background
- Text: Blue-100 (inactive), White (active)
- Icons: Emoji-based for simplicity

---

## 🧪 TESTING

### Test Patient Menu:
1. Login as patient@hospital.com / patient123
2. See 5-item Patient menu
3. Check user info at bottom

### Test Doctor Menu:
1. Login as doctor@hospital.com / doctor123
2. See 6-item Doctor menu
3. Check user info shows "doctor"

### Test Staff Menu:
1. Login as staff@hospital.com / staff123
2. See 5-item Staff menu

### Test Admin Menu:
1. Login as admin@hospital.com / admin123
2. See 9-item Admin menu
3. All features accessible

### Test Super Admin Menu:
1. Login as superadmin@hospital.com / superadmin123
2. See complete 9-item menu
3. Full system access

---

## 📝 CUSTOMIZATION

To add/remove menu items for a role, edit the `getMenuItems()` function:

```javascript
const getMenuItems = (role) => {
  const menusByRole = {
    patient: [
      { to: "/dashboard", label: "Dashboard", icon: "🏠" },
      // Add or remove items here
    ],
    // ... other roles
  };
  return menusByRole[role] || menusByRole.patient;
};
```

---

## 🔗 RELATED FILES

- [src/components/layout/Sidebar.jsx](src/components/layout/Sidebar.jsx)
- [src/context/AuthContext.jsx](src/context/AuthContext.jsx)
- [src/pages/Login.jsx](src/pages/Login.jsx)
- [LOGIN_GUIDE.md](LOGIN_GUIDE.md)

---

**Last Updated:** 2026-08-29  
**Version:** 2.0  
**Status:** ✅ Complete
