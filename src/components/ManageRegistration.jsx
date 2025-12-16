import React, { useEffect, useState } from 'react'
import ManagementComponentHeader from './UI/ManagementComponentHeader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { manageStudentRegistrationService } from '../services/manageStudentRegistrationService';
import LoadingComponents from './UI/Loading';
import StudentRegistration from './student/StudentRegistration';
import { manageStudentService } from '../services/manageStudentService';

export default function ManageRegistration() {
  const userContext = useAuth();


  const navigate = useNavigate();

  const [registrations, setRegistrations] = useState();
  const [filterdRegistrations, setFilterdRegistrations] = useState();
  const [loading, setLoading] = useState(true);


  const [goToCourses, setGoToCourses] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [studentModalID, setStudentModalID] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rows = 10

  const indexOfLastItem = currentPage * rows;
  const indexOfFirstItem = indexOfLastItem - rows;
  const currentItems = filterdRegistrations?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(registrations?.length / rows);

  //// Serach students
  const [searchedStudentString, setSearchedStudentString] = useState("");
  const [students, setStudents] = useState();
  const [filteredStudents, setFilteredStudents] = useState();

  useEffect(() => {
    manageStudentService.get().then((resp) => {
      console.log(resp);

      setStudents(resp.sort((a, b) => a.id - b.id));
    });
  }, [])

  useEffect(() => { if (students?.length > 0) setFilteredStudents(students.filter(st => st.firstName.concat(st.lastName, st.id).toLowerCase().includes(searchedStudentString.toLowerCase()))) }, [students, searchedStudentString])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const headers = ["ID", "Full names", "Department", "Program", "Credits"];
  const currentSemester = JSON.parse(localStorage.getItem("semester"))

  // 
  useEffect(() => {
    if (goToCourses === true) {
      navigate(`/${userContext.user.role}/offeredcourse`)
    }
  }, [goToCourses])


  useEffect(() => {
    const fetchRegistrationsData = async () => {
      await manageStudentRegistrationService.get().then((resp) => {
        setFilterdRegistrations(resp?.sort((a, b) => a.id - b.id).filter(e => e.semester.id === currentSemester.id))
        setRegistrations(resp?.sort((a, b) => a.id - b.id).filter(e => e.semester.id === currentSemester.id));
        setLoading(false);
      });
    }
    fetchRegistrationsData()
  }, [showViewModal])


  if (loading) {
    return <div className=' flex h-full justify-center items-center '> <LoadingComponents type="spinner" /> </div>
  }

  return (
    <>
      <div className='flex flex-col' style={{ display: showAddModal || showViewModal || showEditModal ? "none" : "flex" }} >
        <ManagementComponentHeader title="Student Registration" name="Manage Course" setShowAddModal={setGoToCourses} />

        <div>
          <div className="relative">
            <input type="search" placeholder='search student...' className='p-1 ml-5 bg-bg-secondary-light dark:bg-bg-secondary-dark' value={searchedStudentString} onChange={(e) => setSearchedStudentString(e.target.value)} />
            {searchedStudentString && (
              <ul className="absolute z-10 mt-1 bg-accent-dark dark:bg-accent-light   rounded-md shadow-md max-h-60 overflow-y-auto">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((item, index) => (
                    <li key={index}
                      onClick={() => { navigate(`view/${item.id}`) }}
                       className="px-4 py-2 hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark cursor-pointer">
                      {`${item.id} ${item.firstName} ${item.lastName}`}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 font-bold text-orange-200 dark:text-orange-300">No results found</li>
                )}
              </ul>
            )}
          </div>
        </div>

        {currentItems.length ? (<div className='md:mt-5'>
          <div className='flex flex-col lg:items-center'>
            <div className='  overflow-x-auto'>
              <table >
                <thead>
                  <tr>
                    {headers.map((h, id) => <th key={id}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, id) => (
                    <tr key={id}
                      // onClickCapture={() => { setStudentModalID(item.student.id); setShowEditModal(false); setShowViewModal(true) }}
                      onClick={() => { navigate(`view/${item.student.id}`) }}
                      className='hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark'>

                      <td>{item.student.id}</td>
                      <td> {item.student.firstName + " " + item.student.lastName}</td>
                      <td> {item.student.department.name}</td>
                      <td className='text-sm'>{item.student.program}</td>
                      <td>{item.courses.reduce((p, c) => p + c.course.credit, 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className=' flex justify-center p-3'>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  style={{
                    padding: '5px 10px',
                    margin: '0 5px',
                    cursor: 'pointer',
                    backgroundColor: currentPage === index + 1 ? '#007bff' : '#ccc',
                    color: currentPage === index + 1 ? 'white' : 'black',
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>

          </div>
        </div>) : (<p className=' pt-5 text-2xl text-center'> Nothing to display</p>)}
      </div>
      {/* <StudentRegistration id={studentModalID} admin={true} isOpen={showViewModal} registrations={registrations} onClose={() => setShowViewModal(false)} /> */}
    </>
  )
}
