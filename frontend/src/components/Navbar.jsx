import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Navbar() {
    const { user, login, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    // Toggle for mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div
            className={`fixed border border-black/20 rounded-lg bg-white/30 backdrop-blur-2xl z-50 max-w-[1300px] top-4 left-1/2 -translate-x-1/2 w-[91%] flex items-start md:items-center justify-between py-2 px-6 transition-all duration-200 ease-in-out ${isMenuOpen ? 'flex-col items-start h-[186px]' : 'h-[50px] md:h-fit'
                }`}
            style={{ fontFamily: 'montserrat' }}
        >
            {/* Mobile Menu Toggle Button */}
            <div className="absolute z-40 right-6 top-3 md:hidden">
                {isMenuOpen ? (
                    <AiOutlineClose
                        size={24}
                        className="cursor-pointer transition-all duration-300 ease-in-out"
                        onClick={toggleMenu}
                    />
                ) : (
                    <AiOutlineMenu
                        size={24}
                        className="cursor-pointer transition-all duration-300 ease-in-out"
                        onClick={toggleMenu}
                    />
                )}
            </div>

            {/* Brand Name */}
            <div className="w-full">
                <Link
                    to="/"
                    className="text-2xl font-[800] w-fit tracking-wider"
                    style={{ fontFamily: 'CaviarDreams' }}
                >
                    PaperChain
                </Link>
            </div>

            <div className='flex items-center gap-4 w-full justify-end'>
                {/* Navigation Links */}
                <div
                    className={`w-full h-fit md:flex items-center justify-end gap-6 mt-4 md:mt-0 py-2 md:py-0 ${isMenuOpen ? 'block' : 'hidden'
                        }`}
                >
                    <div
                        className={`flex items-center justify-center gap-4 ${isMenuOpen ? 'flex-col items-start' : ''
                            }`}
                        style={{ fontFamily: 'Syne' }}
                    >
                        <Link
                            className="w-full relative cursor-pointer font-medium after:hidden after:rounded-full md:after:block after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                            to="/"
                        >
                            Home
                        </Link>
                        <Link
                            className="w-full relative cursor-pointer font-medium after:hidden after:rounded-full md:after:block after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                            to="/about"
                        >
                            About
                        </Link>
                        <Link
                            className="w-full relative cursor-pointer font-medium after:hidden after:rounded-full md:after:block after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                            to="/dashboard"
                        >
                            Dashboard
                        </Link>

                        {/* Login/Logout Button */}
                        {!user ? (
                            <button
                                onClick={login}
                                className="px-4 py-1 border border-black rounded-md hover:bg-black hover:text-white cursor-pointer transition-all duration-300"
                            >
                                Login
                            </button>
                        ) : (
                            <button
                                onClick={logout}
                                className="px-4 py-1 border border-red-400 rounded-md bg-red-400 hover:bg-red-500 text-white cursor-pointer transition-all duration-300"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
