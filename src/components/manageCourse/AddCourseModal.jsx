import React, { useEffect, useState } from 'react'
import InputField from '../forms/InputField';
import { FaArrowLeftLong } from 'react-icons/fa6';
import SelectAcademicUnit from '../forms/SelectAcademicUnit';
import SelectCourse from '../forms/SelectCourse';
import { manageCoursesService } from '../../services/manageCoursesService';
import { toast } from 'react-toastify';
import Button from '../forms/Button';

export default function AddCourseModal({ isOpen, onClose }) {


    const [code, setCode] = useState();
    const [name, setName] = useState();
    const [credit, setCredit] = useState();
    const [academicUnit, setAcademicUnit] = useState();
    const [prerequisites, setPrerequisites] = useState([]);
    const [description, setDescription] = useState("");


    const updateCourse = () => {

        const course = { code, name, credit, description }

        console.log(course, academicUnit);


        manageCoursesService.add(course, academicUnit)
            .then((resp) => {
                toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
                setTimeout(() => window.location.reload(), 750);
                onClose()
            },
                (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
            .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));


    }

    if (!isOpen) return null;

    // if (! code) {
    //     return <LoadingComponents type="dots" />
    // }



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
                            <InputField value={code} onChange={(e) => setCode(e.target.value)} name="Course code" />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <InputField value={name} onChange={(e) => setName(e.target.value)} name="Course name" />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <InputField value={credit} type="number" onChange={(e) => setCredit(e.target.value)} name="Credit" />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <SelectAcademicUnit label="Select academic unit" onChange={(e) => setAcademicUnit(e.target.value)} value={academicUnit} />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <InputField value={description} type="text" onChange={(e) => setDescription(e.target.value)} name="Course description" />
                        </div>

                        {/* <div className='flex flex-col mt-4'> */}
                        {/* <div className='flex  gap-4'> */}
                        {/* <p>Prerequisites: </p> */}
                        {/* <p className='flex flex-wrap gap-3'> {prerequisites.length > 0 ? prerequisites.map((p) => <span className='text-sm'> - {courses.find((c) => c.code == p).name + " " + courses.find((c) => c.code == p).code}</span>) : "N/A"} </p></div> */}
                        {/* <div className='flex items-center gap-2 justify-end mt-3'> */}
                        {/* <label htmlFor="">Add</label> */}
                        {/* <SelectCourse label=" " onChange={(e) => { setPrerequisites(prerequisites => [...prerequisites, e.target.value]); }} value="" /> */}
                        {/* </div> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>

            <div className='flex gap-5 justify-center mt-5'>
                <Button name="Cancel" onClick={() => onClose()}>Cancel</Button>
                <Button name={"Add"} onClick={() => updateCourse()}>Add</Button>
            </div>
        </div>

    )
}