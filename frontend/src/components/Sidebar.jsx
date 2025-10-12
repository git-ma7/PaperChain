import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoHome, GoX, GoNote } from 'react-icons/go';
import { MdHowToVote } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';
import { useAuth } from './AuthContext';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Simulated user role (remove this once you have actual user role logic)
    const {user} = useAuth(); // 'Admin' or 'User' or 'Unknown'
    
    // Automatically open sidebar on large screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };

        handleResize();
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
                    md:translate-x-0 md:sticky md:h-screen w-full
                    overflow-y-auto custom-scrollbar
                `}
                style={{ fontFamily: "montserrat" }}
            >
                <div className='flex flex-col justify-between h-[90vh] md:h-[92vh]'>
                    <nav className="w-full mt-10">
                        <ul className="flex flex-col px-4 gap-3">

                            {/* Dashboard */}
                            <li
                                className={`flex gap-2 items-center sidebar-li p-2 rounded-lg transition-all duration-150 ease-in-out ${location.pathname === '/dashboard'
                                        ? 'bg-black text-white font-medium'
                                        : 'hover:bg-black hover:text-white'
                                    }`}
                            >
                                <GoHome size={20} />
                                <Link className="w-full" to="/dashboard">Dashboard</Link>
                            </li>

                            {/* Voting */}
                            <li
                                className={`flex gap-2 items-center sidebar-li p-2 rounded-lg transition-all duration-150 ease-in-out ${location.pathname === '/vote'
                                        ? 'bg-black text-white font-medium'
                                        : 'hover:bg-black hover:text-white'
                                    }`}
                            >
                                <MdHowToVote size={22} />
                                <Link className="w-full" to="/vote">Voting</Link>
                            </li>

                            {/* Notice */}
                            <li
                                className={`flex gap-2 items-center sidebar-li p-2 rounded-lg transition-all duration-150 ease-in-out ${location.pathname === '/notice' || location.pathname === '/notice-admin'
                                        ? 'bg-black text-white font-medium'
                                        : 'hover:bg-black hover:text-white'
                                    }`}
                            >
                                <GoNote size={22} />
                                <Link className="w-full" to={user?.role === 'Unknown' ? '/notice-admin' : '/notice'}>
                                    Notice
                                </Link>
                            </li>

                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
