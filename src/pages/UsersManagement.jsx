// src/pages/UsersManagement.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const INITIAL_USERS = [
    { id: "USR-101", name: "Dr. Sarah Johnson", email: "sarah.j@hospital.com", role: "admin", department: "Cardiology", status: "Active" },
    { id: "USR-102", name: "Dr. Rakesh Verma", email: "rakesh.v@hospital.com", role: "doctor", department: "Neurology", status: "Active" },
    { id: "USR-103", name: "Anita Desai", email: "anita.d@hospital.com", role: "receptionist", department: "Front Desk", status: "Active" },
    { id: "USR-104", name: "Vikram Mehta", email: "vikram.m@hospital.com", role: "superadmin", department: "IT & Operations", status: "Active" },
    { id: "USR-105", name: "Dr. Priya Patel", email: "priya.p@hospital.com", role: "doctor", department: "Pediatrics", status: "Inactive" },
];

export default function UsersManagement() {
    const { user } = useAuth();
    const isSuperAdmin = user?.role === "superadmin";
    const [users, setUsers] = useState(INITIAL_USERS);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "doctor", department: "General" });

    const filteredUsers = users.filter((u) => {
        const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === "all" || u.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const toggleStatus = (id) => {
        setUsers(users.map((u) => (u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u)));
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email) return;
        const userToAdd = {
            id: `USR-${100 + users.length + 1}`,
            ...newUser,
            status: "Active",
        };
        setUsers([userToAdd, ...users]);
        setShowModal(false);
        setNewUser({ name: "", email: "", role: "doctor", department: "General" });
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">User & Staff Management</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage system access, assign roles, and activate/deactivate accounts</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition flex items-center gap-2 self-start sm:self-auto"
                >
                    <span>➕</span> Add New Staff / User
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    <option value="all">All Roles</option>
                    <option value="superadmin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="receptionist">Receptionist</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50/80 transition">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">{u.name}</div>
                                        <div className="text-xs text-gray-400">{u.email} • {u.id}</div>
                                    </td>
                                    <td className="px-6 py-4">{u.department}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${u.role === "superadmin" ? "bg-purple-50 text-purple-700 border border-purple-200" :
                                                u.role === "admin" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                                                    u.role === "doctor" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                                                        "bg-amber-50 text-amber-700 border border-amber-200"
                                            }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${u.status === "Active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${u.status === "Active" ? "bg-green-500" : "bg-red-500"}`} />
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => toggleStatus(u.id)}
                                            className={`text-xs px-3 py-1 rounded-lg border font-medium transition ${u.status === "Active" ? "border-red-200 text-red-600 hover:bg-red-50" : "border-green-200 text-green-600 hover:bg-green-50"
                                                }`}
                                        >
                                            {u.status === "Active" ? "Deactivate" : "Activate"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[2px]">
                    <div className="w-full max-w-xl max-h-[84vh] overflow-y-auto rounded-3xl border border-white/70 bg-white shadow-2xl shadow-slate-950/25">
                        <div className="flex items-start justify-between bg-gradient-to-r from-blue-700 via-violet-600 to-purple-600 px-5 py-3.5 text-white">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-xl shadow-inner ring-1 ring-white/20">+</div>
                                <div>
                                    <h3 className="text-xl font-bold tracking-tight">Add New System User</h3>
                                    <p className="mt-1 text-sm text-blue-50">Create access for a hospital team member.</p>
                                </div>
                            </div>
                            <button type="button" onClick={() => setShowModal(false)} aria-label="Close user dialog" title="Close" className="rounded-xl p-2 text-2xl leading-none text-white/75 transition hover:bg-white/15 hover:text-white">&times;</button>
                        </div>
                        <form onSubmit={handleAddUser} className="space-y-4 p-5">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    placeholder="e.g. Dr. John Doe"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    placeholder="john.doe@hospital.com"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                                    <select
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                    >
                                        {isSuperAdmin && <option value="superadmin">Super Admin</option>}
                                        <option value="admin">Admin</option>
                                        <option value="doctor">Doctor</option>
                                        <option value="receptionist">Receptionist</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Department</label>
                                    <input
                                        type="text"
                                        value={newUser.department}
                                        onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                                        placeholder="e.g. Cardiology"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                                >
                                    Save User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
