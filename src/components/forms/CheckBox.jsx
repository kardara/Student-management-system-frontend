import React from 'react'

export default function CheckBox({ name, onChange }) {
    return (
        <div className='flex gap-2'>
        <input type="checkbox"  onChange={onChange} className="inputField"></input>
        <label htmlFor={name}>{name}</label>
        </div>
    )
}
