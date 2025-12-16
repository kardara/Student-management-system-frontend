import React, { useEffect, useState } from 'react'
import InputField from '../forms/InputField';
import { FaArrowLeftLong } from 'react-icons/fa6';

import { toast } from 'react-toastify';
import { manageSemestersService } from '../../services/manageSemestersService';
import SelectSemesterName from '../forms/SelectSemesterName';

export default function AddSemesterModal({ isOpen, onClose }) {

    // const [idState, setIdState] = useState();
    const [year, setYear] = useState();
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState("");
    const [status, useStatus] = useState("INACTIVE");


    const addSemester = () => {

        const semester = { year, name, startDate, endDate, status }

        console.log(semester);


        manageSemestersService.add(semester)
            .then((resp) => {
                toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
                setTimeout(() => window.location.reload(), 500);
                onClose()
            },
                (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
            .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));
    }

    if (!isOpen) return null;

    return (
        <div>
            <div className='flex justify-between md:mb-10'>
                <div className='flex gap-3 items-center'>
                    <FaArrowLeftLong onClick={onClose} className='hover:cursor-pointer text-xl' />
                    <h1 className='text-2xl font-bold uppercase'>Add Course</h1>
                </div>
            </div>

            <div className=' bg-bg-secondary-light dark:bg-bg-secondary-dark mt-5 px-5 py-10 rounded-2xl max-w-md mx-auto  '>
                <div>
                    <div>
                        {/* <div className='flex flex-col mt-4'>
                            <SelectAcademicUnitType type={type} onChange={(e) => setType(e.target.value)} />
                        </div> */}


                        <div className='flex flex-col mt-4'>
                            <SelectSemesterName name={name?.toUpperCase()} onChange={e => setName(e.target.value)} />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <InputField value={year} type="number" onChange={(e) => setYear(e.target.value)} name="Year" />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <InputField value={startDate} type="date" onChange={(e) => setStartDate(e.target.value)} name="Begins" />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <InputField value={endDate} type="date" onChange={(e) => setEndDate(e.target.value)} name="Ends" />
                        </div>


                    </div>
                </div>
            </div>

            <div className='flex gap-5 justify-center mt-5'>
                <Button name="Cancel" onClick={() => onClose()}>Cancel</Button>
                <Button name="Add" onClick={() => addSemester()}>Add</Button>
            </div>
        </div>

    )
}