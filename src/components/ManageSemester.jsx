import React, { useEffect, useState } from 'react'
import ManagementComponentHeader from './UI/ManagementComponentHeader'
import { manageSemestersService } from '../services/manageSemestersService';
import LoadingComponents from './UI/Loading';
import EditSemesterModal from './manageSemester/EditSemesterModal';
import AddSemesterModal from './manageSemester/AddSemesterModal';

export default function ManageSemester() {

  const [semesters, setSemesters] = useState();
  const [filterdSemesters, setfilterdSemeters] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [semesterModalId, setSemesterModalId] = useState(null);
  const [loading, setLoading] = useState(true);

  const headers = ["S/N", "Academic Year", "Name", "Date", "Status"]

  useEffect(() => {

    const fetchSemesterData = () => {
      manageSemestersService.get().then((resp) => {
        setSemesters(resp.sort((a, b) => {
          if (a.status === 'ACTIVE' && b.status !== 'ACTIVE') return -1;
          if (a.status !== 'ACTIVE' && b.status === 'ACTIVE') return 1;
          return new Date(a.endDate) - new Date(b.endDate);
        }));
        setfilterdSemeters(resp.sort((a, b) => {
          if (a.status === 'ACTIVE' && b.status !== 'ACTIVE') return -1;
          if (a.status !== 'ACTIVE' && b.status === 'ACTIVE') return 1;
          return new Date(b.endDate) - new Date(a.endDate);
        }));
        
        setLoading(false)
      })
    }

    fetchSemesterData();
  }, [])

  const SemesterStatus = ({semesterStatus}) => {
    if (semesterStatus === "ACTIVE") {
      return <span className=' text-sm font-bold px-2 py-1 rounded bg-green-300 dark:bg-green-900'> {semesterStatus} </span>
      
    } else {
      return <span className=''> {semesterStatus}</span>

    }

  } 


  if (loading) {
    return <div className=' flex h-full justify-center items-center '> <LoadingComponents type="spinner" /> </div>
  }

  return (
    <>

      <div className='flex flex-col' style={{ display: showAddModal || showViewModal || showEditModal ? "none" : "flex" }} >
        <ManagementComponentHeader title="Semesters" name="+Add Semester" setShowAddModal={setShowAddModal} />
        <div className='flex flex-col lg:items-center '>

          <div className='overflow-x-auto'>
            <table className=''>
              <thead>
                <tr>
                  {headers.map((e, i) => <th key={i}>{e}</th>)}
                </tr>
              </thead>
              <tbody>
                {filterdSemesters.map((el, ind) => <tr key={ind} className='hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark'
                  onClick={() => { setSemesterModalId(el.id);setShowEditModal(true)}}
                >
                  <td>{ind + 1}</td>
                  <td className='text-center'>{el.year} - {+el.year +1}</td>
                  <td>{el.name}</td>
                  <td>{`${el.startDate} - ${el.endDate}`}</td>
                  <td> <SemesterStatus semesterStatus={el.status} /> </td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div >

      <AddSemesterModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
      <EditSemesterModal isOpen={showEditModal} id={semesterModalId} onClose={() => { setShowEditModal(false); }} semesters={semesters} />

    </>
  )
}
