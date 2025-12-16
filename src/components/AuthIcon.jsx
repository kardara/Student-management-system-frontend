import React from 'react'

export default function AuthIcon(props) {
    return (
        <div className='flex gap-2 items-center border p-2 rounded-2xl justify-center' onClick={props.onClick}>
            <props.image />
            <p className='font-bold'>{props.label}</p>
        </div>
    )
}
