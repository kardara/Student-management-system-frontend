import React, { useEffect, useState } from 'react'
import { manageAcademicUnitService } from '../../services/manageAcademicUnitService';
import { toast } from 'react-toastify';
import { FaArrowLeftLong } from 'react-icons/fa6';
import SelectAcademicUnitType from '../forms/SelectAcademicUnitType';
import InputField from '../forms/InputField';
import SelectAcademicParent from '../forms/SelectAcademicParent';
import LoadingComponents from '../UI/Loading';
import Button from '../forms/Button';

export default function EditAcademicUnitModal({ isOpen, onClose, academicUnits, id }) {

    const currentAcademicUnit = academicUnits.find(e => e.id == id);

    if (!id) {
        return null;
    }

    // const [idState, setIdState] = useState();
    const [code, setCode] = useState();
    const [name, setName] = useState();
    const [type, setType] = useState();
    const [parent, setParent] = useState("");


    useEffect(() => {
        if(currentAcademicUnit){
            // setIdState(currentAcademicUnit.id)
            setCode(currentAcademicUnit.code);
            setName(currentAcademicUnit.name);
            setType(currentAcademicUnit.type);

            setParent(currentAcademicUnit.parent ? currentAcademicUnit.parent.code : "");
            }

    }, [id])

    const updateAcademicUnit = () => {

        const academicUnit = {id,  code, name, type }

        console.log(academicUnit, parent);


        manageAcademicUnitService.update(academicUnit, parent)
            .then((resp) => {
                toast.success(resp, { theme: localStorage.getItem('theme'), position: "top-center" });
                setTimeout(() => window.location.reload(), 750);
                onClose()
            },
                (err) => toast.error(err, { theme: localStorage.getItem('theme'), position: "top-center" }))
            .catch(() => toast.error("An error occured", { theme: localStorage.getItem('theme'), position: "top-center" }));


    }

    if (!isOpen) return null;

    if (! code) {
        return <LoadingComponents type="dots" />
        
    }



    return (
        <div>
            <div className='flex justify-between md:mb-10'>
                <div className='flex gap-3 items-center'>
                    <FaArrowLeftLong onClick={onClose} className='hover:cursor-pointer text-xl' />
                    <h1 className='text-2xl font-bold uppercase'>Edit Academic Unit</h1>
                </div>
            </div>

            <div className=' bg-bg-secondary-light dark:bg-bg-secondary-dark mt-5 px-5 py-10 rounded-2xl max-w-md mx-auto  '>
                <div>
                    <div>
                        <div className='flex flex-col mt-4'>
                            <SelectAcademicUnitType type={type} onChange={(e) => setType(e.target.value)} />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <InputField value={name} onChange={(e) => setName(e.target.value)} name="Name" />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <InputField value={code} onChange={(e) => setCode(e.target.value)} name="Code" />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <SelectAcademicParent type={type} value={parent} onChange={e => setParent(e.target.value)} academicUnits={academicUnits} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex gap-5 justify-center mt-5'>
                <Button name={"Cancel"} onClick={() => onClose()}></Button>
                <Button name={"Update"} onClick={() => updateAcademicUnit()}></Button>
            </div>
        </div>

    )
}