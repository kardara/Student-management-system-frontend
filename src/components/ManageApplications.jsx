import React, { useEffect, useState } from 'react'
import ManagementComponentHeader from './UI/ManagementComponentHeader'
import LoadingComponents from './UI/Loading';
import { manageApplicationService } from '../services/manageApplicationService';
import SelectAcademicUnit from './forms/SelectAcademicUnit';
import SelectAcademicParent from './forms/SelectAcademicParent';
import { toast } from 'react-toastify';

export default function ManageApplications() {
  const [applications, setApplications] = useState();
  const [filteredTeachers, setFilteredTeachers] = useState();
  const [statusFilter, setStatusFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [searchString, setSearchString] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [teacherModalID, setTeacherModalID] = useState(null);


  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const rows = 10

  const indexOfLastItem = currentPage * rows;
  const indexOfFirstItem = indexOfLastItem - rows;
  const currentItems = filteredTeachers?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(applications?.length / rows);



  const headers = ["S/N", "Full Name", "Email", "Date", "Department", "Status"];

  const handlePageChange = (v) => setCurrentPage(v);

  const applyFilter = (a) => {
    const searcByString = (searchedValue, item) => {
      const b = item.firstName.concat(item.lastName, item.email).toLowerCase();
      console.log("concat: ", b);
      if (b.includes(searchedValue.toLowerCase())) {
        return true;
      }
      return false;
    }

    if (searchString && statusFilter && departmentFilter) {
      return a.filter((e) => searcByString(searchString, e) && statusFilter.toLowerCase() == e.status.toLowerCase() && departmentFilter.toLowerCase() == e.department.code.toLowerCase())
    }

    if (searchString && statusFilter) {
      return a.filter((e) => searcByString(searchString, e) && statusFilter.toLowerCase() == e.status.toLowerCase())
    }

    if (searchString && departmentFilter) {
      return a.filter((e) => searcByString(searchString, e) && departmentFilter.toLowerCase() == e.department.code.toLowerCase())
    }

    if (statusFilter && departmentFilter) {
      return a.filter((e) => statusFilter.toLowerCase() == e.status.toLowerCase() && departmentFilter.toLowerCase() == e.department.code.toLowerCase())
    }

    if (departmentFilter) {
      return a.filter((e) => departmentFilter.toLowerCase() == e.department.code.toLowerCase())
    }

    if (statusFilter) {
      return a.filter((e) => statusFilter.toLowerCase() == e.status.toLowerCase())
    }
    if (searchString) {
      return a.filter((e) => searcByString(searchString, e))
    }
    return a;

  }

  const approve = (uuid) => {

    manageApplicationService.approve(uuid)
      .then((resp) => {
        toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
        setTimeout(() => window.location.reload(), 750);
        onClose()
      },
        (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
      .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));
  }

  const reject = (uuid) => {

    manageApplicationService.reject(uuid)
      .then((resp) => {
        toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
      },
        (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
      .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));
  }

  useEffect(() => {
    const fetchApplicationsData = () => {
      manageApplicationService.get().then((a) => {
        console.log(a);
        setApplications(a);
        setFilteredTeachers(a);
        setLoading(false);
      })
    }

    fetchApplicationsData()
  }, [])

  useEffect(() => {
    console.log("Effect...");

    if (applications) {
      setFilteredTeachers(applyFilter(applications))
    }
  }, [searchString, statusFilter, departmentFilter])

  if (loading) {
    return <div className=' flex h-full justify-center items-center '> <LoadingComponents type="dots" /> </div>
  }

  return (
    <>
      <div className='flex flex-col' style={{ display: showAddModal || showViewModal || showEditModal ? "none" : "flex" }} >
        <ManagementComponentHeader title="Teachers" setShowAddModal={setShowAddModal} />

        <div className='flex flex-col gap-2  lg:flex-row lg:gap-3 lg:items-center'  >
          <div>
            <input type="search" placeholder=' search...' className='p-1 bg-bg-secondary-light dark:bg-bg-secondary-dark' onChange={(e) => setSearchString(e.target.value)} />
          </div>
          <div>
            {/* ROles */}
            <select className='p-1 bg-bg-secondary-light dark:bg-bg-secondary-dark' onChange={(e) => setStatusFilter(e.target.value)} >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED"> Rejected</option>

            </select>
          </div>
          {/* Qualifs */}


          <div>
            <SelectAcademicUnit filter="DEPARTMENT" label=" " onChange={(e) => { setDepartmentFilter(e.target.value); console.log((e.target.value)); }} />
          </div>

        </div>

        <div className='md:mt-5'>
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
                    <tr key={id} className='hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark'>
                      <td className='text-center'>{id + 1}</td>
                      <td> {`${item.firstName} ${item.lastName}`}</td>
                      <td> {item.email}</td>
                      <td>{item.applicationDate}</td>
                      <td>{item.department.name}</td>
                      <td>{item.status}</td>
                      <td className='' onClick={() => { approve(item.id) }}> <span className='uppercase cursor-pointer text-sm p-2 font-black text-accent-light dark:text-accent-dark'>Aprove</span> </td>
                      <td className='' onClick={() => { reject(item.id) }}> <span className='uppercase cursor-pointer text-sm p-2 font-black text-accent-light dark:text-accent-dark'>Reject</span> </td>
                      {/* {objectKeys.map((k) => <td key={k}>{item[k]}</td>)} */}
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
        </div>
      </div>
    </>
  )
}
