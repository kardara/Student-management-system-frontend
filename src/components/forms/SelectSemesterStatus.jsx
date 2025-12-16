import React, { useEffect } from 'react'

export default function SelectSemesterStatus({ label, onChange, disabled, status }) {

    
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label || "Semester status"}</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" value={status || ""} disabled={disabled} onChange={(e) => onChange(e)}>

                <option value="INACTIVE" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Inactive</option>
                <option value="ACTIVE" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Active</option>
            </select>
        </div>
    )
}
