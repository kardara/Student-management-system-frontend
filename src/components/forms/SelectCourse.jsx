import React, { useEffect, useState } from 'react'
import LoadingComponents from '../UI/Loading';
import { manageCoursesService } from '../../services/manageCoursesService';

export default function SelectCourse({ label, value, onChange, disabled }) {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCourses = () => {
            manageCoursesService.get().then((resp) => {
                setCourses(resp.sort((a, b) => a.name -b.name));
                setLoading(false)
            })
        }
        fetchCourses();
    }, [])

    if (loading) return <LoadingComponents type="dots" />

    if (courses.length === 0) {

        return (
            <div>
                <label className="block text-sm font-medium mb-1">{label || "Course"}</label>
                <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" disabled={disabled} onChange={(e) => onChange(e)}>
                    <option value="" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>No academic unit found !</option>
                </select>
            </div>
        )
    }

    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label || "Course"}</label>
            <select className="w-full px-3 py-2 border  border-border-light dark:border-border-dark dark:bg-bg-dark rounded-md" value={value || ""} disabled={disabled} onChange={(e) => onChange(e)}>
                <option value="" className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>Choose one</option>
                {courses.map((e, key) => (<option value={e.code} key={key} className='bg-bg-secondary-light dark:bg-bg-secondary-dark '>{e.name}</option>))}
            </select>
        </div>
    )

}
