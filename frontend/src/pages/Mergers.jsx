import React from 'react'
import Sidebar from '../components/Sidebar'

function Mergers() {
    return (
        <div className="relative flex min-h-screen border border-transparent" style={{ fontFamily: 'montserrat' }}>
            <Sidebar />

            <div className="mt-28 md:mt-26 w-full flex flex-col">
                <div className="w-full flex items-center justify-between" style={{ fontFamily: 'Syne' }}>
                    <h1 className="text-4xl tracking-wide text-black font-extrabold">For Mergers:</h1>
                </div>

                <div className='w-full h-full p-8 flex items-center justify-center'>
                    <div className='border border-black/30 w-full md:w-2/4 p-4 bg-white/10 backdrop-blur-2xl rounded-md flex flex-col gap-4'>
                        <h2 className='text-center font-semibold text-2xl'>Are you in favor of this merger?</h2>
                        <div className='w-full flex items-center gap-2'>
                            <button className='p-2 w-full bg-green-500 rounded-sm cursor-pointer text-white'>Yes</button>
                            <button className='p-2 w-full bg-red-500 rounded-sm cursor-pointer text-white'>No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mergers
