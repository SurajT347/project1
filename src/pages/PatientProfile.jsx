// src/pages/PatientProfile.jsx
import { useState } from "react";

export default function PatientProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    // Personal Information
    firstName: "Amit",
    lastName: "Sharma",
    dateOfBirth: "1992-03-15",
    gender: "Male",
    patientId: "P-1001",
    email: "amit.sharma@email.com",
    phone: "+91 98765 43210",
    alternatePhone: "+91 87654 32109",

    // Address Information
    street: "123 Main Street",
    city: "New Delhi",
    state: "Delhi",
    zipCode: "110001",
    country: "India",

    // Medical Information
    bloodType: "O+",
    height: "5'10\"",
    weight: "75 kg",
    bmi: "27.1",
    allergies: "Penicillin, Shellfish",
    chronicDiseases: "Hypertension, Type 2 Diabetes",
    surgeries: "Appendectomy (2018)",

    // Emergency Contact
    emergencyContactName: "Priya Sharma",
    emergencyContactRelation: "Spouse",
    emergencyContactPhone: "+91 98765 43211",

    // Insurance
    insuranceProvider: "HDFC Insurance",
    insurancePolicyNumber: "POL-12345678",
    insuranceExpiry: "2027-12-31",

    // Account
    memberSince: "2024-01-15",
    status: "Active",
  });

  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    setProfileData(formData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="patient-page min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">👤 My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl">
                {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {profileData.firstName} {profileData.lastName}
                </h2>
                <p className="text-gray-600">Patient ID: {profileData.patientId}</p>
                <p className="text-gray-600">Status: {profileData.status}</p>
                <p className="text-gray-600">Member Since: {profileData.memberSince}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-2 rounded-lg font-medium ${
                isEditing
                  ? "bg-gray-600 text-white hover:bg-gray-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-4 border-b">
            📋 Personal Information
          </h3>
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Alternate Phone</label>
                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600 font-semibold">First Name</label>
                <p className="font-semibold text-gray-900">{profileData.firstName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">Last Name</label>
                <p className="font-semibold text-gray-900">{profileData.lastName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">Date of Birth</label>
                <p className="font-semibold text-gray-900">{profileData.dateOfBirth}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">Gender</label>
                <p className="font-semibold text-gray-900">{profileData.gender}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">Email Address</label>
                <p className="font-semibold text-gray-900">{profileData.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">Phone Number</label>
                <p className="font-semibold text-gray-900">{profileData.phone}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 font-semibold">Alternate Phone</label>
                <p className="font-semibold text-gray-900">{profileData.alternatePhone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-4 border-b">
            🏠 Address Information
          </h3>
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 font-semibold">Street Address</label>
                <p className="font-semibold text-gray-900">{profileData.street}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">City</label>
                <p className="font-semibold text-gray-900">{profileData.city}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">State</label>
                <p className="font-semibold text-gray-900">{profileData.state}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">Zip Code</label>
                <p className="font-semibold text-gray-900">{profileData.zipCode}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">Country</label>
                <p className="font-semibold text-gray-900">{profileData.country}</p>
              </div>
            </div>
          )}
        </div>

        {/* Medical Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-4 border-b">
            🏥 Medical Information
          </h3>
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Blood Type</label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Height</label>
                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">BMI</label>
                  <input
                    type="text"
                    name="bmi"
                    value={formData.bmi}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Allergies</label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Chronic Diseases</label>
                  <textarea
                    name="chronicDiseases"
                    value={formData.chronicDiseases}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Past Surgeries</label>
                  <textarea
                    name="surgeries"
                    value={formData.surgeries}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  ></textarea>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm text-gray-600 font-semibold">Blood Type</label>
                <p className="font-semibold text-gray-900">{profileData.bloodType}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">Height</label>
                <p className="font-semibold text-gray-900">{profileData.height}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">Weight</label>
                <p className="font-semibold text-gray-900">{profileData.weight}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">BMI</label>
                <p className="font-semibold text-gray-900">{profileData.bmi}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 font-semibold">Allergies</label>
                <p className="font-semibold text-gray-900">{profileData.allergies}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 font-semibold">Chronic Diseases</label>
                <p className="font-semibold text-gray-900">{profileData.chronicDiseases}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600 font-semibold">Past Surgeries</label>
                <p className="font-semibold text-gray-900">{profileData.surgeries}</p>
              </div>
            </div>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-4 border-b">
            🆘 Emergency Contact
          </h3>
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Relation</label>
                  <input
                    type="text"
                    name="emergencyContactRelation"
                    value={formData.emergencyContactRelation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm text-gray-600 font-semibold">Contact Name</label>
                <p className="font-semibold text-gray-900">{profileData.emergencyContactName}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">Relation</label>
                <p className="font-semibold text-gray-900">{profileData.emergencyContactRelation}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">Phone Number</label>
                <p className="font-semibold text-gray-900">{profileData.emergencyContactPhone}</p>
              </div>
            </div>
          )}
        </div>

        {/* Insurance Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 pb-4 border-b">
            🔐 Insurance Information
          </h3>
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Insurance Provider</label>
                  <input
                    type="text"
                    name="insuranceProvider"
                    value={formData.insuranceProvider}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Policy Number</label>
                  <input
                    type="text"
                    name="insurancePolicyNumber"
                    value={formData.insurancePolicyNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Expiry Date</label>
                  <input
                    type="date"
                    name="insuranceExpiry"
                    value={formData.insuranceExpiry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm text-gray-600 font-semibold">Insurance Provider</label>
                <p className="font-semibold text-gray-900">{profileData.insuranceProvider}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">Policy Number</label>
                <p className="font-semibold text-gray-900">{profileData.insurancePolicyNumber}</p>
              </div>
              <div>
                <label className="text-sm text-gray-600 font-semibold">Expiry Date</label>
                <p className="font-semibold text-gray-900">{profileData.insuranceExpiry}</p>
              </div>
            </div>
          )}
        </div>

        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex gap-3">
            <button
              onClick={handleSaveChanges}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold text-lg"
            >
              ✓ Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 font-bold text-lg"
            >
              ✕ Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
