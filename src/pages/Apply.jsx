// components/student/AddStudentModal.js
import React, { useEffect, useState } from 'react';
import { manageAcademicUnitService } from '../services/manageAcademicUnitService';
import LoadingComponents from '../components/UI/Loading';
import { manageStudentService } from '../services/manageStudentService';
import { toast } from 'react-toastify';
import Button from '../components/forms/Button';
import Navbar from '../components/homePage/Navbar'
import Footer from '../components/homePage/Footer'
import { useNavigate } from 'react-router-dom';
import { manageApplicationService } from '../services/manageApplicationService';

export default function Apply() {

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartement] = useState("");
  const [birthDate, setBirthDate] = useState("2005-01-01");
  const [program, setProgram] = useState("");
  // const [status, setStatus] = useState("");

  const [departments, setDepartments] = useState(null);
  const [loading, setLoading] = useState(false);


  const addStudent = () => {
    const student = { firstName, lastName, email, phone, address, birthDate, program }

    console.log(student);
    console.log(department);

    manageApplicationService.apply(student, department)
      .then((resp) => {
        toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
        setTimeout(() => navigate(-1), 1500);
      },
        (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
      .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));

  }

  useEffect(() => {
    manageAcademicUnitService.get()
      .then(
        (resp) => {
          setDepartments(resp.filter((a) => a.type == "DEPARTMENT"));
        },
        () => { })
      .catch()
      .finally(() => {
        setLoading(false);
        setProgram("DAY")
      });

  }, []);



  if (loading) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg ">

      <LoadingComponents type="spinner" />
    </div>
  )

  return (
    <>
      <div className="min-h-screen bg-light-bg dark:bg-[#1A202C]">
        <Navbar />
        <main className='mt-20'>

          <div className="flex flex-col items-center justify-center py-5 overflow-y-auto">
            <div className="flex flex-col items-center mb-6">
             <p className="flex items-center cursor-pointer gap-12" onClick={() => navigate("/")}>
          <img src="https://yt3.ggpht.com/ytc/AIdro_kxYtR3zxZ06I5vQ41JCt4phG2gudke6oY9WCxoxo5jz_0=s68-c-k-c0x00ffffff-no-rj" className=' rounded-full' alt="AUCA Logo" />
          {/* <span className="text-xl font-bold text-light-primary dark:text-dark-primary">AUCA</span> */}
        </p>
              <h2 className="text-2xl font-bold text-primary-light dark:text-primary-dark">Application Portal</h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">Apply to join our community</p>
            </div>

            <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg shadow-lg w-full max-w-md md:max-w-max p-6">
              <div className='md:flex md:gap-4'>
                <div>
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
                </div>
                <div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input type="email" className="w-full px-3 py-2 border  border-border-light dark:border-border-dark rounded-md" onChange={(e) => setAddress(e.target.value)} />
                  </div>
                  <br />

                  <div>
                    <label className="block text-sm font-medium mb-1">Department you which to join</label>
                    <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark rounded-md" onChange={(e) => setDepartement(e.target.value)}>
                      <option className='bg-bg-secondary-light dark:bg-bg-secondary-dark' value="">Choose one </option>
                      {departments?.map((a, k) => <option key={k} className='bg-bg-secondary-light dark:bg-bg-secondary-dark ' value={a.code}> {a.name} </option>)}
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

                  </div>
                  <br />
                </div>

              </div>
              <div className='flex justify-center'>
                <div className="flex justify-end gap-3 pt-4">
                  <Button name="Cancel"
                    type="button" onClick={() => navigate(-1)} className="" >
                  </Button>
                  <Button name="Apply" type="submit" onClick={addStudent} />
                </div>
              </div>
            </div>
          </div>


        </main>
        <Footer />
      </div>
    </>)
}


