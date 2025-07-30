import React from 'react';
import { Link } from 'react-router-dom';
import { GoHome, GoFileDirectory, GoVerified } from 'react-icons/go';
import AvatarGenerator from './AvatarGenerator';

function Sidebar({ isOpen, name, email }) {
    return (
        <aside
            className={`
                fixed top-17.5 left-0 z-30 h-screen lg:h-[91vh] w-[250px] max-w-[250px]
                bg-white/20 backdrop-blur-xl md:backdrop-blur-none md:bg-transparent border border-r md:border-none border-black/20 rounded-r-2xl
                flex flex-col justify-between
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}
            id="sidebar"
            style={{ fontFamily: "montserrat" }}
        >
            <div className='flex flex-col justify-between h-[90vh] md:h-[92vh]'>
                <nav className="w-full mt-10">
                    <ul className="flex flex-col px-4 gap-3">
                        <li className="flex gap-2 items-center sidebar-li p-2 rounded-lg transition-all duration-150 ease-in-out active">
                            <GoHome size={20} />
                            <Link className="w-full" to={'/dashboard'}>Dashboard</Link>
                        </li>
                        <li className="flex gap-2 items-center sidebar-li p-2 rounded-lg transition-all duration-150 ease-in-out">
                            <GoFileDirectory size={20} />
                            <Link className="w-full" to={'/mydocs'}>My Documents</Link>
                        </li>
                        <li className="flex gap-2 items-center sidebar-li p-2 rounded-lg transition-all duration-150 ease-in-out">
                            <GoVerified size={20} />
                            <Link className="w-full" to={'/verify'}>Verify</Link>
                        </li>
                    </ul>
                </nav>

                {/* User Footer */}
                <div className="flex flex-col w-full gap-4 py-4 px-4">
                    <div className="flex items-center gap-4">
                        <AvatarGenerator className="w-[42px] h-[42px]" name={name || 'Travis Scott'} />
                        <div className="flex flex-col">
                            <span>{name || 'Travis'}</span>
                            <span className="text-sm text-gray-500">{email || 'fein@gmail.com'}</span>
                        </div>
                    </div>
                    <button className="w-full bg-red-500 text-white px-6 py-2 rounded-lg mt-2">
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
