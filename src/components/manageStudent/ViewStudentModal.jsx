import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import Button from '../forms/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { manageStudentService } from '../../services/manageStudentService';
import LoadingComponents from '../UI/Loading';

export default function ViewStudentModal({ openEdit, students, id }) {

  const { studentId } = useParams();
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

  const goEdit = () => {
    const pathname = window.location.pathname.split("/");
    pathname.splice(pathname.length - 2, 1, "edit");
    console.log(pathname.join("/"));
    navigate(pathname.join("/"));
  }

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
              <h1 className='text-3xl font-bold text-text-primary-light dark:text-text-primary-dark'>Student Information</h1>
              <p className='text-text-secondary-light dark:text-text-secondary-dark mt-1'>View student details and information</p>
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
              <h1 className='text-3xl font-bold text-text-primary-light dark:text-text-primary-dark'>Student Information</h1>
              <p className='text-text-secondary-light dark:text-text-secondary-dark mt-1'>View student details and information</p>
            </div>
          </div>

          <div className='flex gap-3'>
            <button
              onClick={goEdit}
              className='inline-flex items-center gap-2 px-6 py-3 bg-accent-light dark:bg-accent-dark text-button-text-primary-light dark:text-button-text-primary-dark font-semibold rounded-xl hover:bg-button-hover-bg-light dark:hover:bg-button-hover-bg-dark transition-all duration-200 shadow-sm hover:shadow-md'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
              </svg>
              Edit Student
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className='grid lg:grid-cols-2 gap-8'>
          {/* Personal Information Card */}
          <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden'>
            <div className='p-6 border-b border-border-light dark:border-border-dark'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='p-2 bg-accent-light/10 dark:bg-accent-dark/10 rounded-lg'>
                  <svg className='w-5 h-5 text-accent-light dark:text-accent-dark' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                  </svg>
                </div>
                <h2 className='text-xl font-bold text-text-primary-light dark:text-text-primary-dark'>Personal Information</h2>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div className='space-y-1'>
                  <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Student ID</label>
                  <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{student.id}</p>
                </div>

                <div className='space-y-1'>
                  <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Full Name</label>
                  <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{student.firstName} {student.lastName}</p>
                </div>

                <div className='space-y-1'>
                  <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Date of Birth</label>
                  <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{student.birthDate}</p>
                </div>

                <div className='space-y-1'>
                  <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Email</label>
                  <p className='text-lg font-semibold text-link-light dark:text-link-dark break-all'>{student.email}</p>
                </div>

                <div className='space-y-1'>
                  <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Phone</label>
                  <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{student.phone}</p>
                </div>

                <div className='space-y-1 sm:col-span-2'>
                  <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Address</label>
                  <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{student.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Information Card */}
          <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark overflow-hidden'>
            <div className='p-6 border-b border-border-light dark:border-border-dark'>
              <div className='flex items-center gap-3 mb-2'>
                <div className='p-2 bg-success-light/10 dark:bg-success-dark/10 rounded-lg'>
                  <svg className='w-5 h-5 text-success-light dark:text-success-dark' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14l9-5-9-5-9 5 9 5z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
                  </svg>
                </div>
                <h2 className='text-xl font-bold text-text-primary-light dark:text-text-primary-dark'>Academic Information</h2>
              </div>
            </div>

            <div className='p-6 space-y-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div className='space-y-1'>
                  <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Program</label>
                  <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{student.program}</p>
                </div>

                <div className='space-y-1'>
                  <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>GPA</label>
                  <div className='flex items-center gap-2'>
                    <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{student.gpa}</p>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${parseFloat(student.gpa) >= 3.5 
                      ? 'bg-success-light/10 text-success-light dark:bg-success-dark/10 dark:text-success-dark' 
                      : parseFloat(student.gpa) >= 2.5 
                      ? 'bg-primary-light/10 text-primary-light dark:bg-primary-dark/10 dark:text-primary-dark'
                      : 'bg-error-light/10 text-error-light dark:bg-error-dark/10 dark:text-error-dark'
                    }`}>
                      {parseFloat(student.gpa) >= 3.5 ? 'Excellent' : parseFloat(student.gpa) >= 2.5 ? 'Good' : 'Needs Improvement'}
                    </div>
                  </div>
                </div>

                <div className='space-y-1'>
                  <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Status</label>
                  <div className='flex items-center gap-2'>
                    <div className={`w-2 h-2 rounded-full ${student.status === 'Active' ? 'bg-success-light dark:bg-success-dark' : 'bg-error-light dark:bg-error-dark'}`}></div>
                    <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{student.status}</p>
                  </div>
                </div>

                <div className='space-y-1'>
                  <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Department</label>
                  <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{student.departmentName} {student.department?.code && `(${student.department.code})`}</p>
                </div>

                <div className='space-y-1'>
                  <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Enrollment Date</label>
                  <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{student.enrollmentDate || "N/A"}</p>
                </div>

                <div className='space-y-1'>
                  <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Faculty</label>
                  <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{student.department?.parent?.name || "N/A"}</p>
                </div>

                <div className='space-y-1 sm:col-span-2'>
                  <label className='text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wide'>Program Type</label>
                  <p className='text-lg font-semibold text-text-primary-light dark:text-text-primary-dark'>{student.department?.parent?.parent?.name || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}