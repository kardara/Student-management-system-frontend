import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import InputField from "../forms/InputField";
import { manageTeachersService } from "../../services/manageTeachersService";
import SelectTeacherQualification from "../forms/SelectTeacherQualification";
import SelectTeacherRole from "../forms/SelectTeacherRole";
import { toast } from "react-toastify";
import Button from "../forms/Button";

export default function AddTeacherModal({ isOpen, onClose }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [qualification, setQualification] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const addTeacher = () => {
    const teacher = {
      firstName,
      lastName,
      qualification,
      role,
      email,
      phone,
      address,
      password,
    };

    console.log(teacher);

    manageTeachersService
      .add(teacher, parent)
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

  if (!isOpen) return null;

  return (
    <div>
      <div className="flex justify-between md:mb-10">
        <div className="flex gap-3 items-center">
          <FaArrowLeftLong
            onClick={onClose}
            className="hover:cursor-pointer text-xl"
          />
          <h1 className="text-2xl font-bold uppercase">Add Teacher</h1>
        </div>
      </div>

      <div className=" bg-bg-secondary-light dark:bg-bg-secondary-dark mt-5 px-5 py-10 rounded-2xl max-w-md mx-auto  ">
        <div>
          <div>
            <div className="flex flex-col mt-4">
              {/* <SelectAcademicUnitType onChange={(e) => setType(e.target.value)} /> */}
            </div>
            <div className="flex flex-col mt-4">
              <InputField
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                name="First name"
              />
            </div>

            <div className="flex flex-col mt-4">
              <InputField
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                name="Last name"
              />
            </div>

            <div className="flex flex-col mt-4">
              <SelectTeacherQualification
                qualification={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-4">
              <SelectTeacherRole
                role={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div className="flex flex-col mt-4">
              <InputField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="Email"
              />
            </div>

            <div className="flex flex-col mt-4">
              <InputField
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                name="Phone"
              />
            </div>

            <div className="flex flex-col mt-4">
              <InputField
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="Password"
                secured={true}
              />
            </div>

            <div className="flex flex-col mt-4">
              <InputField
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                name="Address"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-5 justify-center mt-5">
        <Button name="Cancel" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button name="Add" onClick={() => addTeacher()}>
          ADD
        </Button>
      </div>
    </div>
  );
}
