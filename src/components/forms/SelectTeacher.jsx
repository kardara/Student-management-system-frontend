import React, { useEffect, useState } from 'react'
import LoadingComponents from '../UI/Loading';
import { manageTeachersService } from '../../services/manageTeachersService';

export default function SelectTeacher({ label, value, onChange, disabled }) {

    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchTeachers = () => {
            manageTeachersService.get().then((resp) => {
                setTeachers(resp.sort((a, b) => a.lastName - b.lastName));
                setLoading(false)
            })
        }
        fetchTeachers();
    }, [])

    if (loading) return <LoadingComponents type="dots" />

    if (teachers.length === 0) {
        return (
            <div>
                <label className="block text-sm font-medium mb-1">{label || "Teacher"}</label>
                <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" disabled={disabled} onChange={(e) => onChange(e)}>
                    <option value="" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>No teacher found !</option>
                </select>
            </div>
        )
    }

    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label || "Teacher"}</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" value={value || ""} disabled={disabled} onChange={(e) => onChange(e)}>
                <option value="" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Choose Teacher</option>
                {teachers.map((e,key ) => (<option value={e.id} key={key} className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>{e.firstName} {e.lastName}</option>))}
            </select>
        </div>
    )

}
