import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { authApi } from "../../services/apiClient";
import Button from "../forms/Button";
import InputField from "../forms/InputField";

export default function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { user, updateUser } = useAuth();

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Since we have user data from auth context, use that
      // In a real app, you might fetch fresh data from server
      setProfile(user);
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        birthDate: user.birthDate
          ? new Date(user.birthDate).toISOString().split("T")[0]
          : "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile", {
        theme: localStorage.getItem("theme"),
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      // In a real app, you'd call an update API
      // For now, just update local state
      const updatedUser = { ...user, ...formData };
      updateUser(updatedUser);
      setProfile(updatedUser);
      setEditing(false);
      toast.success("Profile updated successfully", {
        theme: localStorage.getItem("theme"),
        position: "top-center",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile", {
        theme: localStorage.getItem("theme"),
        position: "top-center",
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address || "",
      birthDate: profile.birthDate
        ? new Date(profile.birthDate).toISOString().split("T")[0]
        : "",
    });
    setEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light dark:border-primary-dark"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-light dark:bg-bg-dark">
        <div className="text-text-primary-light dark:text-text-primary-dark text-lg">
          Profile not available
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2">
            My Profile
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Manage your personal information and account details
          </p>
        </div>

        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg border border-border-light dark:border-border-dark overflow-hidden">
          <div className="px-6 py-4 border-b border-border-light dark:border-border-dark flex justify-between items-center">
            <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Personal Information
            </h2>
            {!editing ? (
              <Button
                name="Edit Profile"
                onClick={() => setEditing(true)}
                className="bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light hover:bg-primary-dark dark:hover:bg-primary-light"
              />
            ) : (
              <div className="flex gap-2">
                <Button
                  name="Save"
                  onClick={handleSave}
                  className="bg-success-light dark:bg-success-dark text-success-dark dark:text-success-light"
                />
                <Button
                  name="Cancel"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white hover:bg-gray-600"
                />
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  First Name
                </label>
                {editing ? (
                  <InputField
                    value={formData.firstName}
                    onChange={handleInputChange}
                    name="firstName"
                    placeholder="Enter first name"
                  />
                ) : (
                  <p className="text-text-primary-light dark:text-text-primary-dark py-2 px-3 bg-bg-light dark:bg-bg-dark rounded border">
                    {profile.firstName || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  Last Name
                </label>
                {editing ? (
                  <InputField
                    value={formData.lastName}
                    onChange={handleInputChange}
                    name="lastName"
                    placeholder="Enter last name"
                  />
                ) : (
                  <p className="text-text-primary-light dark:text-text-primary-dark py-2 px-3 bg-bg-light dark:bg-bg-dark rounded border">
                    {profile.lastName || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  Email
                </label>
                {editing ? (
                  <InputField
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                  />
                ) : (
                  <p className="text-text-primary-light dark:text-text-primary-dark py-2 px-3 bg-bg-light dark:bg-bg-dark rounded border">
                    {profile.email || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  Phone
                </label>
                {editing ? (
                  <InputField
                    value={formData.phone}
                    onChange={handleInputChange}
                    name="phone"
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-text-primary-light dark:text-text-primary-dark py-2 px-3 bg-bg-light dark:bg-bg-dark rounded border">
                    {profile.phone || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  Address
                </label>
                {editing ? (
                  <InputField
                    value={formData.address}
                    onChange={handleInputChange}
                    name="address"
                    placeholder="Enter address"
                  />
                ) : (
                  <p className="text-text-primary-light dark:text-text-primary-dark py-2 px-3 bg-bg-light dark:bg-bg-dark rounded border">
                    {profile.address || "Not provided"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark mb-2">
                  Date of Birth
                </label>
                {editing ? (
                  <InputField
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    name="birthDate"
                    type="date"
                  />
                ) : (
                  <p className="text-text-primary-light dark:text-text-primary-dark py-2 px-3 bg-bg-light dark:bg-bg-dark rounded border">
                    {profile.birthDate
                      ? new Date(profile.birthDate).toLocaleDateString()
                      : "Not provided"}
                  </p>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark">
              <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Student ID
                  </label>
                  <p className="text-text-primary-light dark:text-text-primary-dark py-2 px-3 bg-bg-light dark:bg-bg-dark rounded border">
                    {profile.id || "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Program
                  </label>
                  <p className="text-text-primary-light dark:text-text-primary-dark py-2 px-3 bg-bg-light dark:bg-bg-dark rounded border">
                    {profile.program || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Status
                  </label>
                  <p className="text-text-primary-light dark:text-text-primary-dark py-2 px-3 bg-bg-light dark:bg-bg-dark rounded border">
                    {profile.status || "Active"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
