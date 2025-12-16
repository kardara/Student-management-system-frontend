import React from 'react'

export default function SelectTeacherQualification({ label, onChange, disabled, qualification }) {

    
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label || "Teacher Qualification"}</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" value={qualification} disabled={disabled} onChange={(e) => onChange(e)}>
                {qualification ? <option value={qualification} className='bg-bg-secondary-light dark:bg-bg-secondary-dark' >{qualification}</option> : <option value="" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Choose one</option>}
                <option value="MASTER" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Master</option>
                <option value="PHD" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Doctor (PhD)</option>
                <option value="PROFESSOR" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Professor</option>
            </select>
        </div>
    )
}