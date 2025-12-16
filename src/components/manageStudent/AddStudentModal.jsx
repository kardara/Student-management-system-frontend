// components/student/AddStudentModal.js
import React, { useEffect, useState } from 'react';
import { manageAcademicUnitService } from '../../services/manageAcademicUnitService';
import LoadingComponents from '../UI/Loading';
import { manageStudentService } from '../../services/manageStudentService';
import { toast } from 'react-toastify';
import Button from '../forms/Button';

export default function AddStudentModal({ isOpen, onClose }) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartement] = useState("");
  const [birthDate, setBirthDate] = useState("2005-01-01");
  const [program, setProgram] = useState("");
  const [status, setStatus] = useState("");

  const [departments, setDepartments] = useState(null);
  const [loading, setLoading] = useState(true);



  const addStudent = () => {
    const student = { firstName, lastName, email, phone, address, birthDate, program, status }

    console.log(student);
    console.log(department);

    manageStudentService.add(student, department)
      .then((resp) => {
        toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
        setTimeout(() => window.location.reload(), 750);
        onClose()
      },
        (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
      .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));

  }

  useEffect(() => {

    manageAcademicUnitService.get()
      .then(
        (resp) => {
          setDepartments(resp.filter((a) => a.type == "DEPARTMENT"));
          console.log(resp.filter((a) => a.type == "DEPARTMENT"));

        },
        () => { })
      .catch()
      .finally(() => {
        setLoading(false);
        setProgram("DAY")
        setStatus("ACTIVE")
      });

  }, []);


  if (!isOpen) return null;

  if (loading) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg ">

      <LoadingComponents type="dots" />
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg py-5 overflow-y-auto ">
      <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Student</h2>
          <Button name="&times;" onClick={onClose} className="hover:cursor-pointer">
            
          </Button>
        </div>
        <br />
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input type="text" className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-md " onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <br />

        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input type="text" className="w-full px-3 py-2 border  border-border-light dark:border-border-dark rounded-md" onChange={(e) => setLastName(e.target.value)} />
        </div>
        <br />

        <div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" className="w-full px-3 py-2 border  border-border-light dark:border-border-dark rounded-md" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <br />

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input type="tel" className="w-full px-3 py-2 border  border-border-light dark:border-border-dark rounded-md" onChange={(e) => setPhone(e.target.value)} />
          </div>
        </div>
        <br />

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input type="email" className="w-full px-3 py-2 border  border-border-light dark:border-border-dark rounded-md" onChange={(e) => setAddress(e.target.value)} />
        </div>
        <br />

        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark rounded-md" onChange={(e) => setDepartement(e.target.value)}>
            <option className='bg-bg-secondary-light dark:bg-bg-secondary-dark' value="">Choose one </option>
            {departments.map(a => <option className='bg-bg-secondary-light dark:bg-bg-secondary-dark ' value={a.code}> {a.name} </option>)}
          </select>
        </div>
        <br />


        <div>
          <label className="block text-sm font-medium mb-1">Birthdate</label>
          <input type="date" className="w-full px-3 py-2 border  border-border-light dark:border-border-dark rounded-md" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <br />

        <div className='flex justify-between ' >
          <div>
            <label className="block text-sm font-medium mb-1">Program</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark rounded-md" onChange={(e) => setProgram(e.target.value)}>
              <option value="DAY" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Day</option>
              <option value="EVENING" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Evening</option>
            </select>
          </div>
          <br />
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark rounded-md" onChange={(e) => setStatus(e.target.value)}>
              <option value="ACTIVE" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Active</option>
              <option value="SUSPENDED" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Suspended</option>
              <option value="EXCLUDED" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Excluded</option>
              <option value="GRADUATED" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Graduated</option>
            </select>
          </div>
        </div>
        <br />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button" name={"Cancel"} onClick={onClose} className="" >
            Cancel
          </Button>
          <Button name="Add student" type="submit" className="" onClick={addStudent} >
            Add Student
          </Button>
        </div>
      </div>
    </div>
  );
};

