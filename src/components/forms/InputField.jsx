import { useState } from "react"
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export default function InputField({ name, value, onChange, secured, disabled ,type}) {

    const [hidden, setHidden] = useState(true);
    const [inputType, setInpuType] = useState("password");

    const handleHidden = () => {
        setHidden(!hidden);

        setInpuType(hidden ? "text" : "password");
    }


    return (
        <>
            {secured ?
                (
                    <div className="flex justify-between">
                        <label htmlFor={name} className=''>{name}: </label>
                        <div onClick={handleHidden} className="flex items-center gap-2 translate-y-[150%] -translate-x-[50%]">
                            {hidden ? (<FaEye />) : (<FaEyeSlash />)}
                        </div>

                    </div>
                ) :
                (<label htmlFor={name} className=''>{name}: </label>)}

            {secured ?
                (<input type={inputType} name={name} value={value} onChange={onChange} className='inputField' placeholder={name.toLowerCase()}></input>) :
                (<input type={type || 'text'} name={name} value={value} onChange={onChange} className='inputField' placeholder={name.toLowerCase()} disabled={disabled} ></input>)}
        </>
    )
}
