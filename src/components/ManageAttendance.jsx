import React, { useEffect, useState } from 'react'
import ManagementComponentHeader from './UI/ManagementComponentHeader';
import { manageOfferedCoursesService } from '../services/manageOfferedCoursesService';
import LoadingComponents from './UI/Loading';
import { useNavigate } from 'react-router-dom';

export default function ManageAttendance() {
    const navigate = useNavigate();

  const [courses, setCourses] = useState();
  const [filterdCourses, setFilterCourses] = useState();
  const [loading, setLoading] = useState(true);

  const [departmentFilter, setDepartmentFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [searchedString, setSearchedString] = useState(null)

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [courseModalId, setCourseModalId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rows = 10

  const indexOfLastItem = currentPage * rows;
  const indexOfFirstItem = indexOfLastItem - rows;
  const currentItems = filterdCourses?.slice(indexOfFirstItem, indexOfLastItem);

  const currentSemester = JSON.parse(localStorage.getItem("semester"))

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(courses?.length / rows);

  useEffect(() => {
    console.log("Fetching courses...");

    const fetchCoursesData = () => {
      manageOfferedCoursesService.get().then((resp) => {
        setCourses(resp.sort((a, b) => {
          if (a.course.name > b.course.name)
            return 1;
          if (a.course.name < b.course.name)
            return -1;
          return 0;
        }).filter(e => e.semester.id === currentSemester.id));
        setFilterCourses(resp.sort((a, b) => {
          if (a.course.name > b.course.name)
            return 1;
          if (a.course.name < b.course.name)
            return -1;
          return 0;
        }).filter(e => e.semester.id === currentSemester.id));
        setLoading(false)
      })
    }

    fetchCoursesData();
  }, [])

  if (loading) {
    return <div className=' flex h-full justify-center items-center '> <LoadingComponents type="spinner" /> </div>
  }

  const headers = ["S/N", "Code", "Course name", "Group", "Lecturer", "Actions"]

  return (
    <>
      <div className='flex flex-col' style={{ display: showAddModal || showViewModal || showEditModal ? "none" : "flex" }} >
        <ManagementComponentHeader title="Attendance Management" />
        <div>
        </div>
        <div>
          Semester : {`${currentSemester.name[0] + currentSemester.name.toLowerCase().slice(1)} ${currentSemester.year}`}
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
                      className='hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark'>
                      <td>{id + 1}</td>
                      <td> {item.course.code}</td>
                      <td> {item.course.name}</td>
                      <td className='text-center'> {item.group}</td>
                      <td> {item.teacher.firstName} {item.teacher.lastName}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/LECTURER/attendance/${item.id}`)}
                          className="px-3 py-1 bg-primary-light dark:bg-primary-dark text-primary-dark dark:text-primary-light rounded hover:bg-primary-dark dark:hover:bg-primary-light"
                        >
                          Take Attendance
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && <div className=' flex justify-center p-3'>
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
            </div>}

          </div>
        </div>) : (<p className=' pt-5 text-2xl text-center'> Nothing to display</p>)}


      </div>
    </>
  )
}
