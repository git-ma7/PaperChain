import React from 'react'
import Sidebar from '../components/Sidebar';
import { PiOfficeChair } from "react-icons/pi";
import { IoDocumentsOutline } from "react-icons/io5";
import { MdOutlinePolicy } from "react-icons/md";
// import contract from '../assets/contract.png';
import BOD from '../assets/BOD.jpg';
import MAndA from '../assets/MA.jpg';
import { Link } from 'react-router-dom';

function Vote() {
    return (
        <div className="relative flex min-h-screen border border-transparent" style={{ fontFamily: 'montserrat' }}>
            {/* Sidebar */}
            <Sidebar name="Travis Scott" email="fein@gmail.com" />

            <div className="mt-28 md:mt-26 w-full flex flex-col">

                <div className='w-full md:px-9 px-4' style={{ fontFamily: 'Syne' }}>
                    <h1 className='text-4xl tracking-wide text-black font-extrabold'>Voting</h1>
                </div>

                <div className='w-full p-8 h-full'>
                    <div className='w-full h-full grid gap-4 grid-cols-1 md:grid-cols-2'>

                        <Link to={'/bod'} className='w-full flex flex-col gap-2 rounded-md border border-black/20 group bg-white transition-all duration-250 hover:shadow-lg'>
                            <div className='p-4'>
                                <div className='flex gap-2 items-center'>
                                    <h1 className='font-bold text-2xl text-black/70 group-hover:text-black'><span className='text-gray-700 group-hover:text-black'>1.</span> Board Of Directors</h1>
                                    <PiOfficeChair size={26} />
                                </div>
                                <div>
                                    <p>The Board of Directors oversees the company's strategic direction, ensuring transparency, accountability, and long-term growth. They play a crucial role in major decision-making and corporate governance.</p>
                                </div>
                            </div>
                            <div className='h-full rounded-b-md overflow-hidden'>
                                <img src={BOD} alt="Board of Directors" className='w-full h-full object-cover transition-all duration-300' />
                            </div>
                        </Link>

                        <Link to={'/ama'} className='w-full flex flex-col gap-2 rounded-md border border-black/20 group bg-white transition-all duration-250 hover:shadow-lg'>
                            <div className='p-4'>
                                <div className='flex gap-2 items-center'>
                                    <h1 className='font-bold text-2xl text-black/70 group-hover:text-black'><span className='text-gray-700 group-hover:text-black'>2.</span> Approval Of Mergers & Acquisition</h1>
                                    <IoDocumentsOutline size={26} />
                                </div>
                                <div>
                                    <p>The Approval of Mergers & Acquisitions ensures that all corporate consolidations align with regulatory, financial, and strategic interests. This process safeguards shareholder value and promotes sustainable business expansion.</p>
                                </div>
                            </div>
                            <div className='h-full rounded-b-md overflow-hidden relative'>
                                <div className='absolute w-full h-10 bg-gradient-to-b from-white to-white/20'></div>
                                <img src={MAndA} alt="Mergers & Acquisition" className='w-full h-full object-cover transition-all duration-300' />
                            </div>
                        </Link>

                        {/* <Link to={'/dp'} className='w-full flex flex-col gap-2 rounded-md p-4 border border-black/20 group bg-white/20 backdrop-blur-2xl transition-all duration-250 hover:bg-white/40 hover:shadow-lg'>
                            <div className='flex gap-2 items-center'>
                                <h1 className='font-bold text-xl text-black/70 group-hover:text-black'><span className='text-gray-700 group-hover:text-black'>3.</span> Dividend Policies</h1>
                                <MdOutlinePolicy size={26} />
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, consequatur aperiam nisi impedit fuga voluptatum libero fugit officiis earum provident neque consectetur a cum vitae quibusdam et nulla cumque corrupti!</p>
                            </div>
                        </Link>
                        <Link to={'/ica'} className='w-full flex flex-col gap-2 rounded-md p-4 border border-black/20 group bg-white/20 backdrop-blur-2xl transition-all duration-250 hover:bg-white/40 hover:shadow-lg'>
                            <div className='flex gap-2 items-center'>
                                <h1 className='font-bold text-xl text-black/70 group-hover:text-black'><span className='text-gray-700 group-hover:text-black'>4.</span> Inter-Company Agreements</h1>
                                <img src={contract} alt="Contract Image" className='w-1/20' />
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, consequatur aperiam nisi impedit fuga voluptatum libero fugit officiis earum provident neque consectetur a cum vitae quibusdam et nulla cumque corrupti!</p>
                            </div>
                        </Link> */}

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Vote
