import React, { useState } from 'react'

export default function SelectAcademicParent({ label, type, value, academicUnits, onChange, disabled }) {

    const parent = type == "DEPARTMENT" ? "FACULTY" : type == "FACULTY" ? "PROGRAM" : "DEPARTMENT";

    const parents = academicUnits.filter((p => p.type == parent));

    if (parents.length < 1) {
        return <div>
            <label className="block text-sm font-medium mb-1">{label || "Academic unit parent"}</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" value="" disabled onChange={(e) => onChange(e)}>
                <option value="">None</option>
            </select>
        </div>
    }

    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label || "Academic unit parent"}</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" value={value || ""}  disabled={disabled} onChange={(e) => onChange(e)}>
                <option value="" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '></option>
                {parents.map((e, k) => (<option value={e.code} key={k} className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>{e.name}</option>))}

            </select>
        </div>
    )

}
