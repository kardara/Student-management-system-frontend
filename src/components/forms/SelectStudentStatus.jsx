import React from 'react'

export default function SelectStudentStatus({ status, onChange }) {
    return (
        <>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select className="w-full px-3 py-2 border  bg-bg-light dark:bg-bg-dark border-border-light dark:border-border-dark rounded-md" defaultValue={status} onChange={(e) => onChange(e)}>
                {status ? <option value={status}>{status}</option> : <option value="">Choose one</option>}
                <option value="ACTIVE" className='bg-bg-secondary-light dark:bg-bg-secondary-dark  cursor-pointer '>Active</option>
                <option value="SUSPENDED" className='bg-bg-secondary-light dark:bg-bg-secondary-dark  cursor-pointer'>Suspended</option>
                <option value="EXCLUDED" className='bg-bg-secondary-light dark:bg-bg-secondary-dark cursor-pointer '>Excluded</option>
                <option value="GRADUATED" className='bg-bg-secondary-light dark:bg-bg-secondary-dark cursor-pointer '>Graduated</option>
            </select>
        </>
    )
}
