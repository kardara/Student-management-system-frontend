import React, { useEffect, useState } from 'react'
import { manageAcademicUnitService } from '../../services/manageAcademicUnitService';
import LoadingComponents from '../UI/Loading';

export default function SelectAcademicUnit({ label, filter, value, onChange, disabled }) {

    const [academicUnits, setAcademicUnit] = useState([]);
    const [academicUnitsFilterd, setAcademicUnitFilterd] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAcademicUnitData = () => {
            manageAcademicUnitService.get().then((resp) => {
                setAcademicUnitFilterd(resp.sort((a, b) => {
                    if (a.type > b.type)
                        return -1;
                    if (a.type < b.type)
                        return 1;
                    return 0;
                }));
                setAcademicUnit(resp.sort((a, b) => {
                    if (a.type > b.type)
                        return -1;
                    if (a.type < b.type)
                        return 1;
                    return 0;
                }));

                setLoading(false)
            })
        }

        fetchAcademicUnitData();

    }, [])

    useEffect(() => {
        if (filter) setAcademicUnitFilterd(academicUnits.filter(e=> e.type === filter));
    }, [academicUnits])

    if (loading) return <LoadingComponents type="dots" />

    if (academicUnits.length === 0) {

        return (
            <div>
                <label className="block text-sm font-medium mb-1">{label || "Academic unit parent"}</label>
                <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" disabled={disabled} onChange={(e) => onChange(e)}>
                    <option value="" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>No academic unit found !</option>
                </select>
            </div>
        )
    }

    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label || "Academic unit parent"}</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" value={value} disabled={disabled} onChange={(e) => onChange(e)}>
                {filter ? <option value="" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>{filter}</option> : null}
                {academicUnitsFilterd.map((e, key) => (<option value={e.code} key={key} className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>{e.name}</option>))}
            </select>
        </div>
    )

}
