import React from 'react'
import Sidebar from '../components/Sidebar';
import profile from '../assets/profile.jpg';

function Profile() {
    return (
        <div className="relative flex min-h-screen border border-transparent" style={{ fontFamily: 'montserrat' }}>
            {/* Sidebar */}
            <Sidebar name="Travis Scott" email="fein@gmail.com" />

            <div className="mt-28 md:mt-26 w-full flex flex-col">
                <div className='w-full md:px-9 px-4' style={{ fontFamily: 'Syne' }}>
                    <h1 className='text-4xl tracking-wide text-black font-extrabold'>Account</h1>
                </div>
                <div className='w-full max-h-[90vh] h-full px-8 py-4 flex flex-col md:flex-row gap-4 justify-between'>
                    <div className='relative border border-black/15 shadow-md bg-white/30 backdrop-blur-lg w-full rounded-md p-4'>
                        <div className='absolute top-8 left-8 flex items-center justify-center overflow-hidden w-[200px] h-[200px] rounded-full'>
                            <img className='object-cover' src={profile} alt="Profile Pic" />
                        </div>
                        <div className='ml-[250px] mt-24 flex flex-col gap-2'>
                            <h2 className='text-2xl font-bold'>Current Job Title</h2>
                        </div>
                        <div className='mt-28 ml-5 flex w-27/28 gap-4'>
                            <h3 className='border p-2 w-full rounded-md bg-white/40 border-black/20'>Name</h3>
                            <h3 className='border p-2 w-full rounded-md bg-white/40 border-black/20'>Email</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
