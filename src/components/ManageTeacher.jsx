import React, { useEffect, useState } from 'react'
import ManagementComponentHeader from './UI/ManagementComponentHeader'
import InputField from './forms/InputField';
import { manageTeachersService } from '../services/manageTeachersService';
import LoadingComponents from './UI/Loading';
import AddTeacherModal from './manageTeacher/AddTeacherModal';
import EditTeacherModal from './manageTeacher/EditTeacherModal';
import { useNavigate } from 'react-router-dom';

export default function ManageTeacher() {
    const [teachers, setTeachers] = useState();
    const [filteredTeachers, setFilteredTeachers] = useState();
    const [rolesFilter, setRolesFilter] = useState("");
    const [qualificationFilter, setQualificationFilter] = useState("");
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
    const totalPages = Math.ceil(teachers?.length / rows);

    const navigate = useNavigate();

    const headers = ["S/N", "Full Name", "Email", "Qualification", "Role"];

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

        if (searchString && rolesFilter && qualificationFilter) {
            return a.filter((e) => searcByString(searchString, e) && rolesFilter.toLowerCase() == e.role.toLowerCase() && qualificationFilter.toLowerCase() == e.qualification.toLowerCase())
        }

        if (searchString && rolesFilter) {
            return a.filter((e) => searcByString(searchString, e) && rolesFilter.toLowerCase() == e.role.toLowerCase())
        }

        if (searchString && qualificationFilter) {
            return a.filter((e) => searcByString(searchString, e) && qualificationFilter.toLowerCase() == e.qualification.toLowerCase())
        }

        if (rolesFilter && qualificationFilter) {
            return a.filter((e) => rolesFilter.toLowerCase() == e.role.toLowerCase() && qualificationFilter.toLowerCase() == e.qualification.toLowerCase())
        }

        if (qualificationFilter) {
            return a.filter((e) => qualificationFilter.toLowerCase() == e.qualification.toLowerCase())
        }

        if (rolesFilter) {
            return a.filter((e) => rolesFilter.toLowerCase() == e.role.toLowerCase())
        }
        if (searchString) {
            return a.filter((e) => searcByString(searchString, e))
        }
        return a;

    }

    useEffect(() => {
        const fetchTeacherData = () => {
            manageTeachersService.get().then((a) => {
                console.log(a);
                setTeachers(a);
                setFilteredTeachers(a);
                setLoading(false);
            })
        }

        fetchTeacherData()
    }, [])

    useEffect(() => {
        if (teachers) {
            setFilteredTeachers(applyFilter(teachers))

        }
    }, [searchString, rolesFilter, qualificationFilter])

    if (loading) {
        return <div className=' flex h-full justify-center items-center '> <LoadingComponents type="dots" /> </div>
    }

    return (
        <>
            <div className='flex flex-col' style={{ display: showAddModal || showViewModal || showEditModal ? "none" : "flex" }} >
                <ManagementComponentHeader title="Teachers" name="+ Add Teacher" setShowAddModal={setShowAddModal} />

                <div className='flex flex-col gap-2  lg:flex-row lg:gap-3'  >
                    <div>
                        <input type="search" placeholder=' search...' className='p-1 bg-bg-secondary-light dark:bg-bg-secondary-dark' onChange={(e) => setSearchString(e.target.value)} />
                    </div>
                    <div>
                        {/* ROles */}
                        <select className='p-1 bg-bg-secondary-light dark:bg-bg-secondary-dark' onChange={(e) => setRolesFilter(e.target.value)} >
                            <option value="">All Roles</option>
                            <option value="LECTURER">Lecturer</option>
                            <option value="ASSISTANT"> Assistant</option>

                        </select>
                    </div>
                    {/* Qualifs */}
                    <div>
                        <select className='p-1 bg-bg-secondary-light dark:bg-bg-secondary-dark' onChange={(e) => setQualificationFilter(e.target.value)}>
                            <option value="" >All qualifications</option>
                            <option value="MASTER">MASTER</option>
                            <option value="PhD">PhD</option>
                            <option value="PROFESSOR">PROFESSOR</option>
                        </select>
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
                                        <tr key={id} onClick={() => navigate(`view/${item.id}`)} className='hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark'>
                                            <td className='text-center'>{id + 1}</td>
                                            <td> {`${item.firstName} ${item.lastName}`}</td>
                                            <td> {item.email}</td>
                                            <td>{item.qualification}</td>
                                            <td>{item.role}</td>
                                            <td className=''
                                                // onClick={(e) => { e.stopPropagation(); navigate(`edit/${item.id}`); setTeacherModalID(item.id); setShowViewModal(false); setShowEditModal(true) }}
                                                onClick={(e) => { e.stopPropagation(); navigate(`edit/${item.id}`); }}

                                            > <span className='uppercase cursor-pointer text-sm p-2 font-black text-accent-light dark:text-accent-dark'>Edit</span> </td>
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
            {/* <AddTeacherModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} /> */}
            {/* <EditTeacherModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} id={teacherModalID} teachers={teachers} /> */}
        </>
    )
}
