import React from 'react'

export default function SelectStudentProgram({ program, onChange }) {
    return (
        <>
            <label className="block text-sm font-medium mb-1">Program</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" defaultValue={program} onChange={(e) => onChange(e)}>

                {program ? <option value={program} className='bg-bg-secondary-light dark:bg-bg-secondary-dark' >{program}</option> : <option value="DAY" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Day</option>}
                <option value="DAY" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Day</option>
                <option value="EVENING" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Evening</option>
            </select>
        </>
    )
}
