import React from 'react'
import Sidebar from '../components/Sidebar';
import { GoTasklist, GoVerified } from 'react-icons/go';

function Verify() {
    return (
        <div className="relative flex min-h-screen border border-transparent" style={{ fontFamily: 'montserrat' }}>
            {/* Sidebar */}
            <Sidebar name="Travis Scott" email="fein@gmail.com" />

            <div className="md:ml-[250px] mt-28 md:mt-26 w-full flex flex-col">
                <div className='w-full md:px-9 px-4' style={{ fontFamily: 'Syne' }}>
                    <h1 className='text-4xl tracking-wide text-black font-extrabold'>Verify</h1>
                </div>
                <div className="w-full flex flex-col gap-4 px-4 py-4 md:py-8">
                    <h2 className='text-2xl mt-10 font-semibold w-4/5 mx-auto px-1'>Verify Your Document</h2>
                    <div className='w-4/5 mx-auto flex gap-2 items-center bg-transparent justify-between rounded-lg'>
                        <input className='w-full p-3 border-2 rounded-md outline-none border-black/20 bg-white/50 backdrop-blur-sm' type="text" placeholder='Enter Hash ID of document to verify it.' />
                        <button className='border-2 border-transparent max-w-[200px] w-full rounded-md bg-black/85 hover:bg-black hover:shadow-xl transition text-white p-3 cursor-pointer'>Verify</button>
                    </div>
                </div>
                <div className='w-4/5 mx-auto px-3 py-4 md:py-8'>
                    <div className='flex items-center gap-3'>
                        <h2 className='text-2xl font-semibold'>Verification Results</h2>
                        <GoTasklist size={24} />
                    </div>

                    {/* Test Data */}

                    <div className='mt-4 border border-black/30 rounded-md bg-white/50 backdrop-blur-sm p-4'>
                        <h3 className='text-lg font-bold'>Doument Verified Successfully</h3>
                        <div className='flex flex-col items-start justify-between gap-3 mt-6'>
                            <p className='text-sm w-1/2'>Document Name: <span className='font-semibold'>Passport</span></p>
                            <p className='text-sm w-1/2'>Status: <span className='font-semibold py-1 px-3 rounded-full verified'>Verified</span></p>
                            <p className='text-sm w-1/2'>Hash ID: <span className='font-semibold'>1234567890abcdef</span></p>
                            <p className='text-sm w-1/2'>Issued By: <span className='font-semibold'>Government of Exampleland</span></p>
                        </div>
                    </div>

                    <div className='mt-4 border border-black/30 rounded-md bg-white/50 backdrop-blur-sm p-4'>
                        <h3 className='text-lg font-bold'>Doument Verified Successfully</h3>
                        <div className='flex flex-col items-start justify-between gap-3 mt-6'>
                            <p className='text-sm w-1/2'>Document Name: <span className='font-semibold'>Passport</span></p>
                            <p className='text-sm w-1/2'>Status: <span className='font-semibold py-1 px-3 rounded-full verified'>Verified</span></p>
                            <p className='text-sm w-1/2'>Hash ID: <span className='font-semibold'>1234567890abcdef</span></p>
                            <p className='text-sm w-1/2'>Issued By: <span className='font-semibold'>Government of Exampleland</span></p>
                        </div>
                    </div>

                    <div className='mt-4 border border-black/30 rounded-md bg-white/50 backdrop-blur-sm p-4'>
                        <h3 className='text-lg font-bold'>Doument Verified Successfully</h3>
                        <div className='flex flex-col items-start justify-between gap-3 mt-6'>
                            <p className='text-sm w-1/2'>Document Name: <span className='font-semibold'>Passport</span></p>
                            <p className='text-sm w-1/2'>Status: <span className='font-semibold py-1 px-3 rounded-full verified'>Verified</span></p>
                            <p className='text-sm w-1/2'>Hash ID: <span className='font-semibold'>1234567890abcdef</span></p>
                            <p className='text-sm w-1/2'>Issued By: <span className='font-semibold'>Government of Exampleland</span></p>
                        </div>
                    </div>

                    <div className='mt-4 border border-black/30 rounded-md bg-white/50 backdrop-blur-sm p-4'>
                        <h3 className='text-lg font-bold'>Doument Verified Successfully</h3>
                        <div className='flex flex-col items-start justify-between gap-3 mt-6'>
                            <p className='text-sm w-1/2'>Document Name: <span className='font-semibold'>Passport</span></p>
                            <p className='text-sm w-1/2'>Status: <span className='font-semibold py-1 px-3 rounded-full verified'>Verified</span></p>
                            <p className='text-sm w-1/2'>Hash ID: <span className='font-semibold'>1234567890abcdef</span></p>
                            <p className='text-sm w-1/2'>Issued By: <span className='font-semibold'>Government of Exampleland</span></p>
                        </div>
                    </div>

                    {/* Test Data Till Here */}

                </div>
            </div>
        </div>
    )
}

export default Verify;