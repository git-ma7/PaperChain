import React from 'react'
import { GoFile} from 'react-icons/go'

function Overview(props) {
    return (
        <div className='border border-black/10 bg-white/50 backdrop-blur-lg w-full max-h-[250px] h-full rounded-md flex flex-wrap items-center justify-evenly'>
            <div className='w-full flex justify-evenly items-center lg:p-6  py-4'>
                <div className='w-2/3 flex flex-col gap-1'>
                    <h3 className='text-black/60 font-bold'>{props.title||"Total Documents"}</h3>
                    <h1 className='text-3xl'>{props.num || "6"}</h1>
                </div>
                <div className={`w-[50px] h-[50px] flex items-center justify-center rounded-sm ${props.title == "Total Documents" ? 'normal' : props.title == "Verified" ? 'verified' : props.title == "Pending" ? 'pending' : 'failed'}`}>
                    {props.logo || <GoFile size={50} className='text-white/70' />}
                </div>
            </div>
        </div>
    )
}

export default Overview
