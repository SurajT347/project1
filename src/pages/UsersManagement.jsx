// src/pages/UsersManagement.jsx
import { useState } from "react";

const INITIAL_USERS = [
    { id: "USR-101", name: "Dr. Sarah Johnson", email: "sarah.j@hospital.com", role: "admin", department: "Cardiology", status: "Active" },
    { id: "USR-102", name: "Dr. Rakesh Verma", email: "rakesh.v@hospital.com", role: "doctor", department: "Neurology", status: "Active" },
    { id: "USR-103", name: "Anita Desai", email: "anita.d@hospital.com", role: "receptionist", department: "Front Desk", status: "Active" },
    { id: "USR-104", name: "Vikram Mehta", email: "vikram.m@hospital.com", role: "superadmin", department: "IT & Operations", status: "Active" },
    { id: "USR-105", name: "Dr. Priya Patel", email: "priya.p@hospital.com", role: "doctor", department: "Pediatrics", status: "Inactive" },
];

export default function UsersManagement() {
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
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
                        <div className="flex justify-between items-center border-b pb-3">
                            <h3 className="font-bold text-gray-800 text-lg">Add New System User</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
                        </div>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    placeholder="e.g. Dr. John Doe"
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
                                    <select
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                    >
                                        <option value="superadmin">Super Admin</option>
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
                                        className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-3 border-t">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
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
