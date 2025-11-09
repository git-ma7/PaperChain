import React from 'react'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom';

function AMA() {
    return (
        <div className="relative flex min-h-screen border border-transparent" style={{ fontFamily: 'montserrat' }}>
            <Sidebar />

            <div className="mt-28 md:mt-26 w-full flex flex-col">
                <div className="w-full flex items-center justify-between" style={{ fontFamily: 'Syne' }}>
                    <h1 className="text-4xl tracking-wide text-black font-extrabold">For Mergers & Aquisitions:</h1>
                </div>

                <div className='w-full p-8 h-full'>
                    <div className='w-full h-full grid gap-4 grid-cols-1 md:grid-cols-2'>
                        <Link to={'/mergers'} className='w-full flex flex-col gap-2 rounded-md border border-black/20 group bg-white transition-all duration-250 hover:shadow-lg'>
                            <div className='p-4'>
                                <div className='flex gap-2 items-center'>
                                    <h1 className='font-bold text-2xl text-black'><span className='text-black'>1.</span> Mergers</h1>
                                </div>
                                <div>
                                    <p>The Approval of Mergers & Acquisitions ensures that all corporate consolidations align with regulatory, financial, and strategic interests. This process safeguards shareholder value and promotes sustainable business expansion.</p>
                                </div>
                            </div>

                        </Link>

                        <Link to={'/aquisitions'} className='w-full flex flex-col gap-2 rounded-md border border-black/20 group bg-white transition-all duration-250 hover:shadow-lg'>
                            <div className='p-4'>
                                <div className='flex gap-2 items-center'>
                                    <h1 className='font-bold text-2xl text-black'><span className='text-black'>2.</span> Aquisitions</h1>
                                </div>
                                <div>
                                    <p>The Approval of Mergers & Acquisitions ensures that all corporate consolidations align with regulatory, financial, and strategic interests. This process safeguards shareholder value and promotes sustainable business expansion.</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AMA;