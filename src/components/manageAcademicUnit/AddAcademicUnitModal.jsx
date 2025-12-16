import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import InputField from '../forms/InputField'
import SelectAcademicUnitType from '../forms/SelectAcademicUnitType';
import SelectAcademicParent from '../forms/SelectAcademicParent';
import { manageAcademicUnitService } from '../../services/manageAcademicUnitService';
import { toast } from 'react-toastify';
import Button from '../forms/Button';

export default function AddAcademicUnitModal({ isOpen, onClose, academicUnits }) {

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("DEPARTMENT");
    const [parent, setParent] = useState("");

    const addAcademicUnit = ()=> {

        const academicUnit = {code, name, type}

        console.log(academicUnit, parent);
        

        manageAcademicUnitService.add(academicUnit, parent)
              .then((resp) => {
                toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
                setTimeout(() => window.location.reload(), 750);
                onClose()
              },
                (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
              .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));

    }

    if (!isOpen) return null

    return (
        <div>
            <div className='flex justify-between md:mb-10'>
                <div className='flex gap-3 items-center'>
                    <FaArrowLeftLong onClick={onClose} className='hover:cursor-pointer text-xl' />
                    <h1 className='text-2xl font-bold uppercase'>Add Academic Unit</h1>
                </div>
            </div>

            <div className=' bg-bg-secondary-light dark:bg-bg-secondary-dark mt-5 px-5 py-10 rounded-2xl max-w-md mx-auto  '>
                <div>
                    <div>
                        <div className='flex flex-col mt-4'>
                            <SelectAcademicUnitType onChange={(e) => setType(e.target.value)} />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <InputField value={name} onChange={(e) => setName(e.target.value)} name="Name" />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <InputField value={code} onChange={(e) => setCode(e.target.value)} name="Code" />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <SelectAcademicParent type={type} onChange={e => setParent(e.target.value)} academicUnits={academicUnits} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex gap-5 justify-center mt-5'>
                <Button name="Cancel" onClick={() => onClose()}></Button>
                <Button name="Add" onClick={() => addAcademicUnit()}></Button>
                
            </div>
        </div>

    )
}
