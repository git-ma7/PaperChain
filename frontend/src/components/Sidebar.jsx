import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoHome, GoFileDirectory, GoVerified, GoX } from 'react-icons/go';
import { AiOutlineMenu } from 'react-icons/ai';
import AvatarGenerator from './AvatarGenerator';

function Sidebar({ name, email }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Automatically open sidebar on large screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        handleResize(); // initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Hamburger + Close Toggle Button */}
            <div className="md:hidden fixed top-20 left-5 z-40">
                {!isOpen ? (
                    <AiOutlineMenu
                        size={26}
                        className="cursor-pointer border border-black/30 rounded-md p-1 bg-white"
                        onClick={() => setIsOpen(true)}
                    />
                ) : (
                    <GoX
                        size={26}
                        className="cursor-pointer border border-black/30 rounded-md p-1 bg-white"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </div>

            {/* Sidebar Component */}
            <aside
                className={`
                    fixed top-17.5 left-0 z-30 h-screen lg:h-[91vh] w-[250px] max-w-[250px]
                    bg-white/20 backdrop-blur-xl md:backdrop-blur-none md:bg-transparent
                    border border-r md:border-none border-black/20 rounded-r-2xl
                    flex flex-col justify-between
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0
                `}
                style={{ fontFamily: "montserrat" }}
            >
                <div className='flex flex-col justify-between h-[90vh] md:h-[92vh]'>
                    <nav className="w-full mt-10">
                        <ul className="flex flex-col px-4 gap-3">
                            {/* Dashboard */}
                            <li
                                className={`flex gap-2 items-center sidebar-li p-2 rounded-lg transition-all duration-150 ease-in-out ${location.pathname === '/dashboard' ? 'bg-black text-white font-medium' : 'hover:bg-black hover:text-white'
                                    }`}>
                                <GoHome size={20} />
                                <Link className="w-full" to="/dashboard">Dashboard</Link>
                            </li>
                            {/* My Documents */}
                            <li
                                className={`flex gap-2 items-center sidebar-li p-2 rounded-lg transition-all duration-150 ease-in-out ${location.pathname === '/mydocs' ? 'bg-black text-white font-medium' : 'hover:bg-black hover:text-white'
                                    }`}>
                                <GoFileDirectory size={20} />
                                <Link className="w-full" to="/mydocs">My Documents</Link>
                            </li>
                            {/* Verify */}
                            <li
                                className={`flex gap-2 items-center sidebar-li p-2 rounded-lg transition-all duration-150 ease-in-out ${location.pathname === '/verify' ? 'bg-black text-white font-medium' : 'hover:bg-black hover:text-white'
                                    }`}>
                                <GoVerified size={20} />
                                <Link className="w-full" to="/verify">Verify</Link>
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
        </>
    );
}

export default Sidebar;
