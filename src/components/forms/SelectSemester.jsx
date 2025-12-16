import React, { useEffect, useState } from 'react'
import LoadingComponents from '../UI/Loading';
import { manageSemestersService } from '../../services/manageSemestersService';

export default function SelectSemester({ label, value, onChange, disabled }) {

    const [semesters, setSemesters] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchSemesterData = () => {
            manageSemestersService.get().then((resp) => {
                setSemesters(resp.sort((a, b) => {
                    if (a.status === 'ACTIVE' && b.status !== 'ACTIVE') return -1;
                    if (a.status !== 'ACTIVE' && b.status === 'ACTIVE') return 1;
                    return new Date(b.endDate) - new Date(a.endDate);
                }));
                setLoading(false)
            })
        }
        fetchSemesterData();
    }, [])

    if (loading) return <LoadingComponents type="dots" />

    if (semesters.length === 0) {
        return (
            <div>
                <label className="block text-sm font-medium mb-1">{label || "Semester"}</label>
                <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" disabled={disabled} onChange={(e) => onChange(e)}>
                    <option value="" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>No teacher found !</option>
                </select>
            </div>
        )
    }
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label || "Semester"}</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" value={semesters[0].id} disabled={disabled} onChange={(e) => onChange(e)}>
                {semesters.map((e, key) => (<option value={e.id} key={key} className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>{e.name} {e.year}</option>))}
            </select>
        </div>
    )

}
