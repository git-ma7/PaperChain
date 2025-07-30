import React from 'react'
import { GoFile, GoDownload } from 'react-icons/go'

function DB_List_Card(props) {
    return (
        <div className='flex flex-col md:flex-row border-black/10 cursor-pointer shadow-sm hover:shadow-md bg-white/50 hover:bg-white/70 transition-all duration-200 backdrop-blur-lg justify-between px-6 py-4 border rounded-md'>
            <div className='flex gap-4 items-center'>
                <GoFile size={40}  className='text-black/60'/>
                <div className='flex flex-col gap-1'>
                    <span className='font-bold'>{props.fileName}</span>
                    <div className='flex gap-1'>
                        <span className='text-sm'>{props.type}</span>|
                        <span className='text-sm'>{props.size}</span>|
                        <span className='text-sm'>{props.date}</span>
                    </div>
                </div>
            </div>
            <div className='w-full flex mt-2 md:mt-0 justify-between md:justify-end gap-2 items-center md:px-6'>
                <span className={`border-white/20 rounded-full w-[90px] text-center py-1 text-sm tracking-wide ${props.status == "Verified" ? 'verified' : props.status == "Pending" ? 'pending' : 'failed'}`}>{props.status}</span>
                <div className='p-2 hover:bg-black/5 transition-all duration-100 rounded-sm'>
                    <GoDownload size={20} />
                </div>
            </div>
        </div>
    )
}

export default DB_List_Card