import React from 'react'

export default function SelectTeacherRole({ label, onChange, disabled, role }) {

    
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label || "Teacher role"}</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" value={role} disabled={disabled} onChange={(e) => onChange(e)}>
            {role ? <option value={role} className='bg-bg-secondary-light dark:bg-bg-secondary-dark' >{role}</option> : <option value="" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Choose one</option>}
            <option value="LECTURER" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Lecturer</option>
                <option value="ASSISTANT" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Assistant</option>
            </select>
        </div>
    )
}
