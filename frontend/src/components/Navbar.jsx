import {React, useState} from 'react'
import AvatarGenerator from './AvatarGenerator'
import { GoPerson} from 'react-icons/go';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        console.log("Menu toggled:", isMenuOpen);
    }

    return (
        <div className={`fixed border border-black/10 rounded-lg bg-white/30 backdrop-blur-2xl z-50 max-w-[1300px] top-4 left-1/2 -translate-x-1/2 w-[91%] flex items-start md:items-center justify-between py-2 px-6 transition-all duration-200 ease-in-out ${isMenuOpen ? 'flex-col items-start h-[186px]' : 'h-[50px] md:h-fit'}`} style={{ fontFamily: "montserrat" }}>
            <div className='absolute z-40 right-6 top-3 md:hidden'>
                {isMenuOpen ? 
                    <AiOutlineClose size={24} className='cursor-pointer transition-all duration-300 ease-in-out' onClick={toggleMenu}/> :
                    <AiOutlineMenu size={24} className='cursor-pointer  transition-all duration-300 ease-in-out' onClick={toggleMenu}/>
                }
            </div>
            <div className='w-full'>
                <h1 className='text-2xl font-bold w-fit' style={{ fontFamily: "montserrat" }}>PaperChain</h1>
            </div>
            <div className={`w-full h-fit md:flex items-center justify-end gap-6 mt-4 md:mt-0 py-2 md:py-0 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <div className={`flex items-center justify-center gap-4 ${isMenuOpen ? 'flex-col items-start' : ''}`}>
                    <Link className='relative cursor-pointer font-medium after:hidden after:rounded-full md:after:block after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] after:bg-black after:transition-all after:duration-300 hover:after:w-full' to={'/'}>Home</Link>
                    <Link className='relative cursor-pointer font-medium after:hidden after:rounded-full md:after:block after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] after:bg-black after:transition-all after:duration-300 hover:after:w-full' to={'/dashboard'}>Dashboard</Link>
                    <Link className='relative block md:hidden cursor-pointer font-medium after:hidden after:rounded-full md:after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1.5px] after:bg-black after:transition-all after:duration-300 hover:after:w-full' to={'/profile'}>Profile</Link>
                </div>
                <div className='hidden md:block p-2 border rounded-full border-black/50 ' id='profile'>
                    <Link to={'/profile'}><GoPerson size={20}/></Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
