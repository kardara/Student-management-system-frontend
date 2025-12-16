import React, { useEffect, useState } from 'react'
import { manageAcademicUnitService } from '../../services/manageAcademicUnitService';
import LoadingComponents from '../UI/Loading';

export default function SelectStudentDepartment({ department, onChange }) {
    const [departments, setDepartments] = useState(null);
    const [loading, setLoading] = useState(true);    

    useEffect(() => {

        manageAcademicUnitService.get()
            .then(
                (resp) => {
                    setDepartments(resp.filter((a) => a.type == "DEPARTMENT"));
                    setLoading(false)
                },
                () => { })
            .catch()
    }, []);
    if (loading) return <LoadingComponents type="dots" />
    return (
        <>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" onChange={(e) => onChange(e)}>
                {department? (<option value={department?.code}> {department.name}</option>) : null}
                {departments.map(a => <option key={a.code} className='bg-bg-secondary-light dark:bg-bg-secondary-dark ' value={a.code}> {a.name} </option>)}
            </select>
        </>
    )
}
