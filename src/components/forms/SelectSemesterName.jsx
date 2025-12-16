import React, { useEffect } from 'react'

export default function SelectSemesterName({ label, onChange, disabled, name }) {

    
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label || "Semester name"}</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" value={name || ""} disabled={disabled} onChange={(e) => onChange(e)}>

                <option value="" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '></option>
                <option value="FALL" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Fall</option>
                <option value="WINTER" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Winter</option>
                <option value="SUMMER" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Summer</option>
            </select>
        </div>
    )
}
