import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import InputField from "../forms/InputField";
import { manageTeachersService } from "../../services/manageTeachersService";
import SelectTeacherQualification from "../forms/SelectTeacherQualification";
import SelectTeacherRole from "../forms/SelectTeacherRole";
import { toast } from "react-toastify";
import Button from "../forms/Button";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponents from "../UI/Loading";

export default function EditTeacherModal({ isOpen, teachers /* id*/ }) {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  // const currentTeacher = teachers.find((t => t.id === id));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [qualification, setQualification] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchTeacherDetails = () => {
      setLoading(true);
      manageTeachersService
        .get(id)
        .then((response) => {
          setCurrentTeacher(response);
          console.log(response);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Failed to fetch teacher details", {
            theme: localStorage.getItem("theme"),
            position: "top-center",
          });
          console.error(error);
          setLoading(false);
        });
    };
    fetchTeacherDetails();
  }, [id]);

  useEffect(() => {
    if (currentTeacher) {
      setFirstName(currentTeacher.firstName);
      setLastName(currentTeacher.lastName);
      setQualification(currentTeacher.qualification);
      setRole(currentTeacher.role);
      setEmail(currentTeacher.email);
      setPhone(currentTeacher.phone);
      setAddress(currentTeacher.address);
    }
  }, [currentTeacher]);

  const updateTeacher = () => {
    const teacher = {
      id,
      firstName,
      lastName,
      qualification,
      role,
      email,
      phone,
      address,
      password,
    };
    manageTeachersService
      .update(teacher)
      .then(
        (resp) => {
          toast.success(resp, {
            theme: localStorage.getItem("theme"),
            position: "top-center",
          });
          setTimeout(() => window.location.reload(), 750);
          onClose();
        },
        (err) => {
          toast.error(err, {
            theme: localStorage.getItem("theme"),
            position: "top-center",
          });
          console.log(err);
        }
      )
      .catch(() =>
        toast.error("An error occured", {
          theme: localStorage.getItem("theme"),
          position: "top-center",
        })
      );
  };

  // if (!isOpen) return null

  const onClose = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
        <LoadingComponents type="dots" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark py-6 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8 p-6 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm">
          <button
            onClick={onClose}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-light dark:bg-primary-dark hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark text-white transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <FaArrowLeftLong className="text-lg" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Edit Teacher
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1">
              Update teacher information
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
          {/* Form Header */}
          <div className="px-6 py-4 border-b border-border-light dark:border-border-dark">
            <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">
              Teacher Details
            </h2>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
              Please fill in the required information
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* Name Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                  First Name
                </label>
                <InputField
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  name="First name"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                  Last Name
                </label>
                <InputField
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  name="Last name"
                />
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-accent-light dark:text-accent-dark border-b border-border-light dark:border-border-dark pb-2">
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                    Qualification
                  </label>
                  <SelectTeacherQualification
                    qualification={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                    Role
                  </label>
                  <SelectTeacherRole
                    role={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-accent-light dark:text-accent-dark border-b border-border-light dark:border-border-dark pb-2">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                    Email Address
                  </label>
                  <InputField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="Email"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                    Phone Number
                  </label>
                  <InputField
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    name="Phone"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                    Address
                  </label>
                  <InputField
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    name="Address"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                    Password
                  </label>
                  <InputField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="Password"
                    secured={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button
            onClick={onClose}
            className="px-8 py-3 border-2 border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark rounded-lg hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark transition-all duration-200 font-medium min-w-[120px]"
          >
            Cancel
          </button>
          <button
            onClick={updateTeacher}
            className="px-8 py-3 bg-primary-light dark:bg-primary-dark hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark text-white rounded-lg transition-all duration-200 font-medium min-w-[120px] shadow-sm hover:shadow-md"
          >
            Update Teacher
          </button>
        </div>
      </div>
    </div>
  );
}
