import React from 'react'
import {GoVerified } from 'react-icons/go'

function DB_List_Card(props) {
    return (
        <div className='flex flex-col md:flex-row border-black/10 cursor-pointer shadow-sm hover:shadow-md bg-white/50 hover:bg-white/70 transition-all duration-200 backdrop-blur-lg justify-between px-6 py-4 border rounded-md'>
            <div className='flex w-full gap-4 items-center'>
                <GoVerified size={40}  className='text-green-500'/>
                <div className='w-full flex flex-col gap-1'>
                    <span className='font-bold'>{props.fileName}</span>
                    <div className='flex gap-1'>
                        <span className='text-sm'>{props.date}</span>
                    </div>
                </div>
            </div>
            <div className='w-full flex mt-2 md:mt-0 justify-between md:justify-end gap-2 items-center md:px-6'>
                <span className={`border-white/20 rounded-full w-[90px] text-center py-1 text-sm tracking-wide ${props.status == "Voted" ? 'verified' : props.status == "NOTA" ? 'failed' : 'failed'}`}>{props.status}</span>
            </div>
        </div>
    )
}

export default DB_List_Card