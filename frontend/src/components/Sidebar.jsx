import React from 'react'
import { Link } from 'react-router-dom'
import { GoHome,GoFileDirectory,GoVerified } from 'react-icons/go'
import AvatarGenerator from './AvatarGenerator'

function Sidebar(props) {
    return (
        <header className='fixed h-[91vh] top-19 flex flex-col gap-4 max-w-[250px] w-full rounded-br-2xl' style={{ fontFamily: "montserrat" }}>
            <div className='flex flex-col items-center justify-between h-screen' id='sidebar'>
                <nav className='w-full mt-6'>
                    <ul className='flex flex-col px-4 gap-3'>
                        <li className='flex gap-2 items-center sidebar-li p-2 rounded-lg transition-all duration-150 ease active'><GoHome size={20}/><Link className='w-full' to={'/dashboard'}>Dashboard</Link></li>
                        <li className='flex gap-2 items-center sidebar-li p-2 rounded-lg transition-all duration-150 ease'><GoFileDirectory size={20}/><Link className='w-full' to={'/mydocs'}>My Documents</Link></li>
                        <li className='flex gap-2 items-center sidebar-li p-2 rounded-lg transition-all duration-150 ease'>< GoVerified size={20}/><Link className='w-full' to={'/verify'}>Verify</Link></li>
                    </ul>
                </nav>
                <div className='flex flex-col w-full border-t-2 border-white/10 gap-4 py-4'>
                    <div className='w-full flex items-center px-4 justify-start gap-4'>
                        <AvatarGenerator className='w-[42px] h-[42px]' name={props.name || 'Travis Scott'} />
                        <div className='flex flex-col'>
                            <span>{props.name || 'Travis'}</span>
                            <span>{props.email || 'fein@gmail.com'}</span>
                        </div>
                    </div>
                    <div className='w-full px-4'>
                        <button className='w-full bg-red-500 text-white px-6 py-2 rounded-lg'>Logout</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Sidebar