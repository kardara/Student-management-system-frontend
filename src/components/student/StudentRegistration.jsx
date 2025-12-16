import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponents from '../UI/Loading';
import { manageStudentRegistrationService } from '../../services/manageStudentRegistrationService';
import RegisterCourse from '../manageRegistration/RegisterCourse';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

/* 

@ NEED TO IMPROVE THE LOGIC OF REGISTRATION,
ESPECIALLY FOR THIC COMPONENT WHICH IS USED BY DIFFERENT ROLES
*/

export default function StudentRegistration({admin, isOpen, registrations, onClose }) {

  const context = useAuth();
  const navigate = useNavigate();

  const {id} = useParams();

  const studentId = id ? id : context.user.id;
  const [showAddCourses, setShowAddCourses] = useState(false);
  const [registration, setRegistration] = useState();
  const [registrationExist, setRegistrationExist] = useState(true); /// see if I can manage in a better way initialization of registrations
  const hasCreatedRegistration = useRef(false);
  const removeCourse = (selectedCourse) => {

    console.log(`/studentregistration/course/add?studentId=${studentId}$&coursesId=${selectedCourse}`);
    console.log("reg:", registration);
    console.log("course", selectedCourse);

    const courseToDelete = registration.courses.find(e => e.id = selectedCourse);

    Swal.fire({
      title: `${courseToDelete.course.name} will be removed`,
      icon: "warning",
      theme: localStorage.getItem("theme"),
      showCancelButton: true,
      confirmButtonColor: "#F56565",
      // cancelButtonColor: `${localStorage.getItem("theme")== 'dark' ? "#2D3748": "#F4F7FA"}`,
      confirmButtonText: "Yes, remove it!"

    }).then((result) => {
      console.log(result)
      if (result.isConfirmed) {
        manageStudentRegistrationService.removeCourse(studentId, selectedCourse)
          .then((resp) => {
            toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
            setTimeout(() => window.location.reload(), 1000);
          },
            (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
          .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));

      }
    });

  }

  const fetchUniqueRegistration = () => {
    if (isNaN(studentId)) { return; }
    manageStudentRegistrationService.getStudent(studentId).then((resp) => {
      if (!resp) {

        if(hasCreatedRegistration.current) return;
        hasCreatedRegistration.current = true;
        manageStudentRegistrationService.create(studentId).then(resp => {
          Swal.fire({
            title: ` ${admin ? "Student now officially registered" : "You're now officially registerd"}`,
            text: "You can now add courses....",
            icon: "info",
            theme: localStorage.getItem("theme"),
            confirmButtonColor: "#4299E1",
          }).then(() => manageStudentRegistrationService.getStudent(studentId).then((data) => { setRegistration(data) }))
        })

      } else {
        setRegistration(resp);
        // setFilterCourses(resp.sort((a, b) => a.name - b.name).filter(e => e.semester.id === currentSemester.id));
        // setLoading(false)
      }

    }).catch(e => console.log(e))
  }
  useEffect(() => { if (registration) manageStudentRegistrationService.getStudent(studentId).then((resp) => setRegistration(resp)) }, [showAddCourses])

  useEffect(() => {
    if (!id && !admin) {

      setTimeout(fetchUniqueRegistration, 200)

    } else {

      // const temp = registrations.find(e => e.student.id == id)

      // if (temp) {
      //   setRegistration(temp)
      // } else {
      //   console.log("Not found from admin");


        // setRegistrationExist(false)

        fetchUniqueRegistration()
      // }
    }
  }, [id])

  const handleClose = () => {
    if (onClose) {
      onClose();
      // window.location.reload()
      return;
    }
    navigate(-1);
  }

  if (!isOpen && admin) {
    return null
  }
  if (!registration) {
    return <div className=' flex h-full justify-center items-center '> <LoadingComponents type="spinner" /> </div>

  }
  const tableHeaders = ["s/n", "Course", "Group", "Day", "Time", "room", "Teacher"]
  return (
    <>
      <div className='min-h-screen bg-bg-primary-light dark:bg-bg-primary-dark' style={{ display: showAddCourses ? "none" : "block" }}>
        {/* Header Section */}
        <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark shadow-lg border-b-2 border-accent-light dark:border-accent-dark'>
          <div className='max-w-7xl mx-auto px-6 py-6'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-4 items-center'>
                <div className='p-2 rounded-full bg-button-bg-primary-light dark:bg-button-bg-primary-dark hover:opacity-80 transition-opacity cursor-pointer'>
                  <FaArrowLeftLong onClick={() => handleClose()} className='text-button-text-primary-light text-xl' />
                </div>
                <div>
                  <h1 className='text-3xl font-bold text-accent-light dark:text-accent-dark'>Student Registration</h1>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>Manage course registrations</p>
                </div>
              </div>
              <div>
                <button className='px-6 py-3 rounded-lg bg-button-bg-primary-light text-button-text-primary-light font-bold dark:bg-button-bg-primary-dark hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105'
                  onClick={() => setShowAddCourses(true)}
                >
                  + Add Courses
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='max-w-7xl mx-auto px-6 py-8'>
          {admin ? (
            <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700'>
              <h2 className='text-xl font-bold text-accent-light dark:text-accent-dark mb-4 border-b border-gray-300 dark:border-gray-600 pb-2'>Student Information</h2>
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <span className='font-semibold text-gray-700 dark:text-gray-300 min-w-[60px]'>ID:</span>
                    <span className='bg-accent-light dark:bg-accent-dark text-white px-3 py-1 rounded-full text-sm font-bold'>{registration.student.id}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='font-semibold text-gray-700 dark:text-gray-300 min-w-[60px]'>Name:</span>
                    <span className='text-lg font-medium'>{`${registration.student.firstName} ${registration.student.lastName}`}</span>
                  </div>
                </div>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <span className='font-semibold text-gray-700 dark:text-gray-300'>Department:</span>
                    <span className='text-lg'>{registration.student.department.name}</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <span className='font-semibold text-gray-700 dark:text-gray-300'>Total Credits:</span>
                    <span className='bg-button-bg-primary-light dark:bg-button-bg-primary-dark text-button-text-primary-light px-4 py-2 rounded-lg font-bold text-lg'>
                      {registration.courses.reduce((p, c) => p + c.course.credit, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Main Content Card */}
          <div className='bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700'>
            <div className='mb-6 flex items-center justify-between'>
              <h3 className='text-2xl font-bold text-accent-light dark:text-accent-dark flex items-center gap-3'>
                <div className='w-1 h-8 bg-accent-light dark:bg-accent-dark rounded-full'></div>
                Registered Courses
              </h3>
              <div className='bg-button-bg-primary-light dark:bg-button-bg-primary-dark px-4 py-2 rounded-lg'>
                <span className='text-button-text-primary-light font-bold'>
                  {registration.courses.length} Course{registration.courses.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            
            {registration.courses.length > 0 ? (
              <div className='space-y-6'>
                <div className='overflow-x-auto shadow-lg rounded-lg border border-gray-200 dark:border-gray-700'>
                  <table className='w-full bg-white dark:bg-gray-800'>
                    <thead className='bg-bg-primary-light dark:bg-bg-primary-dark'>
                      <tr>
                        {tableHeaders.map((h, id) => (
                          <th key={id} className='px-6 py-4 text-left text-xs font-bold text-accent-light dark:text-accent-dark uppercase tracking-wider border-b border-gray-200 dark:border-gray-600'>
                            {h}
                          </th>
                        ))}
                        <th className='px-6 py-4 text-center text-xs font-bold text-accent-light dark:text-accent-dark uppercase tracking-wider border-b border-gray-200 dark:border-gray-600 lg:hidden'>
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
                      {registration.courses.map((e, ind) => (
                        <tr key={ind} 
                            className='hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark transition-colors duration-200 cursor-pointer group' 
                            onDoubleClick={() => removeCourse(e.id)}>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <span className='bg-accent-light dark:bg-accent-dark text-white px-2 py-1 rounded-full text-sm font-bold'>
                              {ind + 1}
                            </span>
                          </td>
                          <td className='px-6 py-4'>
                            <div>
                              <div className='font-bold text-gray-900 dark:text-gray-100'>{e.course.code}</div>
                              <div className='text-sm text-gray-600 dark:text-gray-400'>{e.course.name}</div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <span className='bg-button-bg-primary-light dark:bg-button-bg-primary-dark text-button-text-primary-light px-3 py-1 rounded-lg font-medium'>
                              {e.group}
                            </span>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap font-medium'>{e.day}</td>
                          <td className='px-6 py-4 whitespace-nowrap font-mono text-sm bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 w-fit'>
                            {e.time.slice(0, 5)}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>{e.room}</td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='font-medium'>{e.teacher.firstName} {e.teacher.lastName}</div>
                          </td>
                          <td className='px-6 py-4 text-center lg:hidden'>
                            <button 
                              onClick={() => removeCourse(e.id)}
                              className='p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200'
                            >
                              <FaTrash className='text-sm' />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-600'>
                  <p className='hidden lg:block text-sm text-gray-600 dark:text-gray-400 italic flex items-center gap-2'>
                    <span className='w-2 h-2 bg-accent-light dark:bg-accent-dark rounded-full'></span>
                    Double-click on any course row to remove it
                  </p>
                  <div className='bg-gradient-to-r from-accent-light to-button-bg-primary-light dark:from-accent-dark dark:to-button-bg-primary-dark p-4 rounded-xl shadow-lg'>
                    <p className='text-white font-bold text-xl'>
                      Total Fees: <span className='text-2xl'>{registration.fees.amount.toLocaleString().split(",").join(" ")} RWF</span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className='text-center py-16'>
                <div className='bg-gray-100 dark:bg-gray-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4'>
                  <span className='text-4xl text-gray-400'>📚</span>
                </div>
                <p className='text-xl text-gray-600 dark:text-gray-400 mb-2'>No courses added yet</p>
                <p className='text-sm text-gray-500 dark:text-gray-500'>Click "Add Courses" to get started</p>
              </div>
            )}
          </div>
        </div>

        {/* <div className='flex gap-5 justify-center mt-5'>
        <button onClick={() => handleClose()}>Cancel</button>
        <button onClick={() => saveRegistration()}>Save</button>
      </div> */}
      </div>
      <RegisterCourse isOpen={showAddCourses} studentId={studentId} isAdmin={admin} registration={registration} onClose={() => setShowAddCourses(false)} />
    </>
  )
}