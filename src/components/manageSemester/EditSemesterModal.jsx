import React, { useEffect, useState } from 'react'
import InputField from '../forms/InputField';
import { FaArrowLeftLong } from 'react-icons/fa6';

import { toast } from 'react-toastify';
import { manageSemestersService } from '../../services/manageSemestersService';
import SelectSemesterName from '../forms/SelectSemesterName';
import SelectSemesterStatus from '../forms/SelectSemesterStatus';
import Button from '../forms/Button';

export default function EditSemesterModal({ isOpen, onClose, semesters, id }) {

    const currentSemester = semesters.find(e => e.id == id);

    if (!id) {
        return null;
    }

    // const [idState, setIdState] = useState();
    const [year, setYear] = useState();
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState("");
    const [status, setStatus] = useState();


    useEffect(() => {
        if (currentSemester) {
            setYear(currentSemester.year);
            setName(currentSemester.name);
            setStartDate(currentSemester.startDate);
            setEndDate(currentSemester.endDate);
            setStatus(currentSemester.status);
        }

    }, [id])

    const updateSemester = () => {

        const semester = { id, year, name, startDate, endDate, status }

        console.log(semester);


        manageSemestersService.update(semester)
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
                    <h1 className='text-2xl font-bold uppercase'>Edit Course</h1>
                </div>
            </div>

            <div className=' bg-bg-secondary-light dark:bg-bg-secondary-dark mt-5 px-5 py-10 rounded-2xl max-w-md mx-auto  '>
                <div>
                    <div>
                       
                        <div className='flex flex-col mt-4'>
                            <SelectSemesterName name={name.toUpperCase()} onChange={e => setName(e.target.value)} />
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

                        <div className='flex flex-col mt-4'>
                            <SelectSemesterStatus status={status} onChange={(e) => setStatus(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex gap-5 justify-center mt-5'>
                <Button name="Cancel" onClick={() => onClose()}>Cancel</Button>
                <Button name="Update" onClick={() => updateSemester()}>Update</Button>
            </div>
        </div>

    )
}