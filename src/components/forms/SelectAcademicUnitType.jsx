import React, { useEffect } from 'react'

export default function SelectAcademicUnitType({ label, onChange, disabled, type }) {

    
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label || "Academic unit Type"}</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" value={type} disabled={disabled} onChange={(e) => onChange(e)}>
                {/* {program ? <option value={program} className='bg-bg-secondary-light dark:bg-bg-secondary-dark' >{program}</option> : <option value="DAY" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Day</option>} */}
                <option value="DEPARTMENT" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Department</option>
                <option value="FACULTY" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Faculty</option>
                <option value="PROGRAM" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Program</option>
            </select>
        </div>
    )
}
