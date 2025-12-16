import React from 'react'

export default function SelectDayOfWeek({ day, onChange ,label }) {
    return (
        <>
            <label className="block text-sm font-medium mb-1">{label || "Day"}</label>
            <select className="w-full px-3 py-2 border  bg-bg-light dark:bg-bg-dark border-border-light dark:border-border-dark rounded-md" value={day} onChange={(e) => onChange(e)}>
                {day ? <option value={day}>{`${day[0]} ${day.slice(1).toLowercase()}`}</option> : <option value="">Choose one</option>}
                <option value="SUNDAY" className='bg-bg-secondary-light dark:bg-bg-secondary-dark  cursor-pointer '>Sunday</option>
                <option value="MONDAY" className='bg-bg-secondary-light dark:bg-bg-secondary-dark  cursor-pointer'>Monday</option>
                <option value="TUESDAY" className='bg-bg-secondary-light dark:bg-bg-secondary-dark cursor-pointer '>Tuesday</option>
                <option value="WEDNESDAY" className='bg-bg-secondary-light dark:bg-bg-secondary-dark cursor-pointer '>Wednesday</option>
                <option value="THURSDAY" className='bg-bg-secondary-light dark:bg-bg-secondary-dark cursor-pointer '>Thursday</option>
                <option value="FRIDAY" className='bg-bg-secondary-light dark:bg-bg-secondary-dark cursor-pointer '>Friday</option>
                <option value="SATURDAY" className='bg-bg-secondary-light dark:bg-bg-secondary-dark cursor-pointer '>Saturday</option>
            </select>
        </>
    )
}
