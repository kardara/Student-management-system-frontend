import React, { useEffect, useState } from 'react'
import ManagementComponentHeader from './UI/ManagementComponentHeader'
import { manageAcademicUnitService } from '../services/manageAcademicUnitService';
import LoadingComponents from './UI/Loading';
import AddAcademicUnitModal from './manageAcademicUnit/AddAcademicUnitModal';
import EditAcademicUnitModal from './manageAcademicUnit/EditAcademicUnitModal';

export default function ManageAcademicUnit() {
    const [academicUnit, setAcademicUnit] = useState();
    const [filterdAcademicUnit, setfilterdAcademicUnit] = useState(null);
    const [typeFilter, setTypeFilter] = useState(null);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [academicUnitModalID, setAcademicUnitModalID] = useState(null);
    const [loading, setLoading] = useState(true);

    const headers = ["SN", "Code", "Name", "Type", "Parent"]

    const applyFilter = (st) => {

        if (typeFilter)
            return st?.filter((e) => e.type.toLowerCase() == typeFilter.toLowerCase())
        return st;
    }

    useEffect(() => {

        const fetchAcademicUnitData = () => {
            manageAcademicUnitService.get().then((resp) => {
                setAcademicUnit(resp.sort((a, b) => {
                    if (a.type > b.type)
                        return 1;
                    if (a.type < b.type)
                        return -1;
                    return 0;
                }));
                setfilterdAcademicUnit(resp.sort((a, b) => {
                    if (a.type > b.type)
                        return 1;
                    if (a.type < b.type)
                        return -1;
                    return 0;
                }));
                setLoading(false)
            })
        }

        fetchAcademicUnitData();
    }, [])

    useEffect(() => {
        if (academicUnit)
            setfilterdAcademicUnit(applyFilter(academicUnit));

    }, [typeFilter])

    if (loading) {
        return <div className=' flex h-full justify-center items-center '> <LoadingComponents type="spinner" /> </div>
    }

    return (
        <>
            <div className='flex flex-col' style={{ display: showAddModal || showViewModal || showEditModal ? "none" : "flex" }} >
                <ManagementComponentHeader title="Academic unit" name="+ Add Academic unit" setShowAddModal={setShowAddModal} />

                <div className='mb-5'>
                    <select className='p-1 bg-bg-secondary-light dark:bg-bg-secondary-dark' onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="">All types</option>
                        <option value="Program">Program</option>
                        <option value="Faculty">Faculty</option>
                        <option value="Department">Departments</option>
                    </select>
                </div>
                <div className='flex flex-col lg:items-center '>

                    <div className='overflow-x-auto'>
                        <table className=''>
                            <thead>
                                <tr>
                                    {headers.map((e, i) => <th key={i}>{e}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {filterdAcademicUnit.map((el, ind) => <tr key={ind} className='hover:bg-bg-secondary-light dark:hover:bg-bg-secondary-dark'
                                    onClick={() => { setAcademicUnitModalID(el.id); setShowEditModal(true) }}
                                >
                                    <td>{ind + 1}</td>
                                    <td>{el.code}</td>
                                    <td>{el.name}</td>
                                    <td>{el.type}</td>
                                    <td>{el.parent ? el.parent.name : "N/A"}</td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <AddAcademicUnitModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} academicUnits={academicUnit} />
            <EditAcademicUnitModal isOpen={showEditModal} id={academicUnitModalID} onClose={() => {setShowEditModal(false); /*window.location.reload()*/}} academicUnits={academicUnit} />
        </>

    )
}
