import React, { useEffect, useState } from 'react'
import InputField from '../forms/InputField';
import { FaArrowLeftLong } from 'react-icons/fa6';
import SelectCourse from '../forms/SelectCourse';
import { toast } from 'react-toastify';
import SelectTeacher from '../forms/SelectTeacher';
import SelectDayOfWeek from '../forms/SelectDayOfWeek';
import { manageOfferedCoursesService } from '../../services/manageOfferedCoursesService';
import Button from '../forms/Button';

export default function AddOfferedCourseModal({ isOpen, onClose }) {


    const [course, setCourse] = useState();
    const [teacher, setTeacher] = useState();
    const [group, setGroup] = useState();
    const [day, setDay] = useState();
    const [time, setTime] = useState("18:00");
    const [room, setRoom] = useState();
    const [size, setSize] = useState();

    const updateCourse = () => {

        const offeredCourse = { group, day, time, room, size }

        console.log(offeredCourse, course, teacher);


        manageOfferedCoursesService.add(offeredCourse, course, teacher)
            .then((resp) => {
                toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
                setTimeout(() => window.location.reload(), 750);
                onClose()
            },
                (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
            .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));

    }

    useEffect(() => {
        const [h, min] = time.split(":");
        if (+min == 0 || +min == 30) return;

        if (+min < 30) {
            setTime(`${h}:${"00"}`)
        } else {
            setTime(`${h}:${"30"}`)
        }

    }, [time])

    if (!isOpen) return null;

    const groups = [];
    for (let i = 65; i < 91; i++) groups.push(String.fromCharCode(i));

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
                            <SelectCourse value={course} onChange={(e) => setCourse(e.target.value)} label="Course" />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <SelectTeacher value={teacher} onChange={(e) => setTeacher(e.target.value)} label="Teacher" />
                        </div>


                        <div className='flex gap-3 items-center mt-4'>
                          
                            <div>
                                <SelectDayOfWeek value={day} onChange={(e) => setDay(e.target.value)} label="Day" />
                            </div>
                            <div>
                                <label htmlFor=""> Time </label><br />
                                <input className="w-full px-3 py-2 border  bg-bg-light dark:bg-bg-dark border-border-light dark:border-border-dark rounded-md"
                                    type="time" step="1800" min="8:00" max="18:30"
                                    value={time} onChange={(e) => setTime(e.target.value)} />
                            </div>

                            <div>
                                <label htmlFor="">Group</label>
                                <select className="w-full px-3 py-2 border  bg-bg-light dark:bg-bg-dark border-border-light dark:border-border-dark rounded-md" value={group} onChange={(e) => setGroup(e.target.value)}>
                                    <option value="">Choose</option>
                                    {groups.map((g, key) => <option value={g} className='bg-bg-secondary-light dark:bg-bg-secondary-dark  cursor-pointer '>{g}</option>)}
                                </select>

                            </div>
                        </div>

                        <div className='flex flex-col mt-4'>
                            <InputField value={room} type="text" onChange={(e) => setRoom(e.target.value)} name="Room" />

                        </div>



                        <div className='flex flex-col mt-4'>
                            <InputField value={size} type="number" onChange={(e) => setSize(e.target.value)} name="Size" />
                        </div>


                    </div>
                </div>
            </div>

            <div className='flex gap-5 justify-center mt-5'>
                <Button name="Cancel" onClick={() => onClose()}>Cancel</Button>
                <Button name="Add" onClick={() => updateCourse()}>Add</Button>
            </div>
        </div>

    )
}