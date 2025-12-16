import React from 'react'

export default function ManagementComponentHeader({ title, name, setShowAddModal }) {
    return (
        <div className='border-t-border-light dark:border-t-border-dark border-t-2 my-5 flex justify-between items-center'>
            <h1 className='text-2xl p-2  font-bold' >{title} Management</h1>
            {name ? <p className='m-1 p-2  text-center rounded-lg bg-button-bg-primary-light text-button-text-primary-dark font-bold dark:bg-primary-dark' onClick={() => setShowAddModal(true)}>{name ? name : "+ Add " + title}</p>
                : null}
        </div>
    )
}
