import React from 'react'

export default function Announcements({ data }) {
    if (!data) {
        return <p> No announcement available at the time </p>
    }
    return (
        <div className=''>
                {data.map((an,id) => (
                    <div className='p-5 mx-auto my-5 bg-bg-secondary-light rounded-2xl dark:bg-bg-secondary-dark' key={id}>
                        <div className='flex justify-between items-center'>
                            <h3 className='font-bold text-lg'>{an.title}</h3> <p className='text-[0.7rem] font-bold bg-bg-light dark:bg-bg-dark p-2 rounded-lg'><span>{an.date}</span></p>
                        </div>
                        <br />
                        <p className='text-justify md:pr-20'>{an.msg}</p>
                    </div>
                ))}
        </div>
    )
}
