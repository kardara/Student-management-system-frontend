import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import InputField from '../forms/InputField';
import SelectStudentStatus from '../forms/SelectStudentStatus';
import SelectStudentProgram from '../forms/SelectStudentProgram';
import SelectStudentDepartment from '../forms/SelectStudentDepartment';
import { manageStudentService } from '../../services/manageStudentService';
import { toast } from 'react-toastify';
import Button from '../forms/Button';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponents from '../UI/Loading';

export default function EditStudentModal({ isOpen, onClose, students, id }) {
  const { studentId } = useParams();
  id = studentId
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState();

  useEffect(() => {
    manageStudentService.get(studentId).
      then(st => { setStudent(st); console.log(st); }).
      finally(() => setLoading(false))
  }, [])


  const goBack = () => {
    navigate(-1);
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("2005-01-01");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [program, setProgram] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartement] = useState("");
  const [password, setPassword] = useState("");



  useEffect(() => {
    if (student) {
      setFirstName(student.firstName || "");
      setLastName(student.lastName || "");
      setEmail(student.email || "");
      setPhone(student.phone || "");
      setAddress(student.address || "");
      setDepartement(student.department.code || "");
      setBirthDate(student.birthDate || "");
      setProgram(student.program || "");
      setStatus(student.status || "");

    }

  }, [student]);


  const updateStudent = () => {
    const student = { id, firstName, lastName, birthDate, email, phone, address, program, status, password }


    manageStudentService.update(student, department)
      .then((resp) => {
        console.log(resp);
        toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
        goBack();
      },
        (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
      .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));

  }


  // if (!isOpen) return <> </>
  if (loading) return <LoadingComponents type={"dots"} />

  if (!student) return (
    <div className='min-h-screen p-6 bg-bg-light dark:bg-bg-dark'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <div className='flex gap-4 items-center'>
            <button
              onClick={goBack}
              className='group p-3 rounded-full bg-bg-secondary-light dark:bg-bg-secondary-dark hover:bg-border-light dark:hover:bg-border-dark transition-all duration-200 shadow-sm'
            >
              <FaArrowLeftLong className='text-xl text-text-primary-light dark:text-text-primary-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors duration-200' />
            </button>
            <div>
              <h1 className='text-3xl font-bold text-text-primary-light dark:text-text-primary-dark'>Edit Student</h1>
              <p className='text-text-secondary-light dark:text-text-secondary-dark mt-1'>Update student information and details</p>
            </div>
          </div>
        </div>

        {/* Error State Card */}
        <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden'>
          <div className='p-8 text-center'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-error-light/10 dark:bg-error-dark/10 rounded-full mb-4'>
              <svg className='w-8 h-8 text-error-light dark:text-error-dark' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z' />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-error-light dark:text-error-dark mb-2'>Student Not Found</h2>
            <p className='text-text-secondary-light dark:text-text-secondary-dark'>The requested student could not be found in the system.</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen p-6 bg-bg-light dark:bg-bg-dark'>
      <div className='max-w-6xl mx-auto'>
        {/* Header Section */}
        <div className='flex justify-between items-center mb-8'>
          <div className='flex gap-4 items-center'>
            <button
              onClick={goBack}
              className='group p-3 rounded-full bg-bg-secondary-light dark:bg-bg-secondary-dark hover:bg-border-light dark:hover:bg-border-dark transition-all duration-200 shadow-sm'
            >
              <FaArrowLeftLong className='text-xl text-text-primary-light dark:text-text-primary-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors duration-200' />
            </button>
            <div>
              <h1 className='text-3xl font-bold text-text-primary-light dark:text-text-primary-dark'>Edit Student</h1>
              <p className='text-text-secondary-light dark:text-text-secondary-dark mt-1'>Update student information and details</p>
            </div>
          </div>
        </div>

        {/* Main Form Grid */}
        <div className='grid lg:grid-cols-2 gap-8 mb-8'>
          {/* Personal Information Card */}
          <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden'>
            <div className='p-6 border-b border-border-light dark:border-border-dark'>
              <div className='flex items-center gap-3'>
                <div className='p-2 bg-accent-light/10 dark:bg-accent-dark/10 rounded-lg'>
                  <svg className='w-5 h-5 text-accent-light dark:text-accent-dark' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                </div>
                <h2 className='text-xl font-bold text-text-primary-light dark:text-text-primary-dark'>Personal Information</h2>
              </div>
              <p className='text-text-secondary-light dark:text-text-secondary-dark mt-2 text-sm'>Update the student's personal details</p>
            </div>

            <div className='p-6 space-y-6'>
              <div className='flex flex-col'>
                <InputField value={student.id} name="Student ID" disabled={true} />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='flex flex-col'>
                  <InputField value={firstName} onChange={(e) => setFirstName(e.target.value)} name="First name" />
                </div>
                <div className='flex flex-col'>
                  <InputField value={lastName} onChange={(e) => setLastName(e.target.value)} name="Last name" />
                </div>
              </div>

              <div className='flex flex-col'>
                <InputField value={birthDate} onChange={(e) => setBirthDate(e.target.value)} name="Birth date" />
              </div>

              <div className='flex flex-col'>
                <InputField value={email} onChange={(e) => setEmail(e.target.value)} name="Email" />
              </div>

              <div className='flex flex-col'>
                <InputField value={phone} onChange={(e) => setPhone(e.target.value)} name="Phone number" />
              </div>

              <div className='flex flex-col'>
                <InputField value={address} onChange={(e) => setAddress(e.target.value)} name="Address" />
              </div>
            </div>
          </div>

          {/* Academic Information & Security Card */}
          <div className='space-y-8'>
            {/* Academic Information */}
            <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden'>
              <div className='p-6 border-b border-border-light dark:border-border-dark'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-success-light/10 dark:bg-success-dark/10 rounded-lg'>
                    <svg className='w-5 h-5 text-success-light dark:text-success-dark' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14l9-5-9-5-9 5 9 5z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
                    </svg>
                  </div>
                  <h2 className='text-xl font-bold text-text-primary-light dark:text-text-primary-dark'>Academic Information</h2>
                </div>
                <p className='text-text-secondary-light dark:text-text-secondary-dark mt-2 text-sm'>Manage academic details and enrollment</p>
              </div>

              <div className='p-6 space-y-6'>
                <div className='flex flex-col'>
                  <SelectStudentStatus status={status} onChange={(e) => setStatus(e.target.value)} />
                </div>

                <div className='flex flex-col'>
                  <SelectStudentProgram program={program} onChange={(e) => setProgram(e.target.value)} />
                </div>

                <div className='flex flex-col'>
                  <SelectStudentDepartment department={student.department} onChange={(e) => setDepartement(e.target.value)} />
                </div>

                <div className='flex flex-col'>
                  <InputField value={student.enrollmentDate} name="Enrollment date" disabled={true} />
                </div>
              </div>
            </div>

            {/* Password Reset Section */}
            <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden'>
              <div className='p-6 border-b border-border-light dark:border-border-dark'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-primary-light/10 dark:bg-primary-dark/10 rounded-lg'>
                    <svg className='w-5 h-5 text-primary-light dark:text-primary-dark' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                    </svg>
                  </div>
                  <h2 className='text-xl font-bold text-text-primary-light dark:text-text-primary-dark'>Security Settings</h2>
                </div>
                <p className='text-text-secondary-light dark:text-text-secondary-dark mt-2 text-sm'>Reset student password if needed</p>
              </div>

              <div className='p-6'>
                <div className='bg-primary-light/5 dark:bg-primary-dark/5 border border-primary-light/20 dark:border-primary-dark/20 rounded-xl p-4 mb-4'>
                  <div className='flex items-start gap-3'>
                    <svg className='w-5 h-5 text-primary-light dark:text-primary-dark mt-0.5 flex-shrink-0' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <div>
                      <p className='text-sm font-medium text-primary-light dark:text-primary-dark'>Password Reset</p>
                      <p className='text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1'>Leave empty to keep current password unchanged</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <InputField value={password} onChange={e => setPassword(e.target.value)} name="New password" secured={true} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-end p-6 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark'>
          <button
            onClick={() => onClose()}
            className='px-6 py-3 border-2 border-border-light dark:border-border-dark text-text-primary-light dark:text-text-primary-dark font-semibold rounded-xl hover:bg-border-light dark:hover:bg-border-dark transition-all duration-200'
          >
            Cancel
          </button>
          <button
            onClick={() => updateStudent()}
            className='px-6 py-3 bg-accent-light dark:bg-accent-dark text-button-text-primary-light dark:text-button-text-primary-dark font-semibold rounded-xl hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2'
          >
            <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' />
            </svg>
            Update Student
          </button>
        </div>
      </div>
    </div>
  )
}