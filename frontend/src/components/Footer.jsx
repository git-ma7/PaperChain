import React from 'react'
import { Link } from 'react-router-dom'
import { GoArrowRight } from 'react-icons/go';

function Footer() {
    return (
        <div className='relative w-full py-8 px-8 rounded-t-[70px] bg-violet-950 text-white'>
            <div className="hidden absolute inset-0 z-10 lg:flex items-center justify-center">
                <div className='absolute bg-white h-[500px] w-[400px] blur-[130px] opacity-80 -z-10 rounded-full'></div>
                <div className='absolute left-1/3 top-1/4 bg-white/60 h-[200px] w-[200px] blur-3xl -z-10 opacity-80 rounded'></div>
                <div className='absolute left-1/4 top-1/2 bg-white/60 h-[300px] w-[300px] blur-3xl -z-10 opacity-80 rounded'></div>
                <div className='absolute right-1/4 top-1/3 bg-white/60 h-[200px] w-[200px] blur-3xl -z-10 opacity-80 rounded'></div>
                <div className='absolute right-1/3 top-1/4 bg-white/60 h-[200px] w-[200px] blur-3xl -z-10 opacity-80 rounded'></div>
                <div className='absolute right-1/3 top-1/2 bg-white/60 h-[200px] w-[200px] blur-3xl -z-10 opacity-80 rounded'></div>
            </div>

            <div className='relative z-20 w-full flex flex-col justify-center items-center gap-10 mt-10 lg:mt-26'>
                <div className='w-full'>
                    <h1 className='text-center font-extrabold text-4xl md:text-5xl lg:text-8xl' style={{ fontFamily: 'CaviarDreams' }}>PaperChain</h1>
                    <p className='text-center text-lg md:text-xl text-white/95 font-medium mt-4' style={{ fontFamily: "QuickSand" }}>PaperChain is a decentralized platform for managing and verifying paper documents.</p>
                </div>

                <div className='w-full h-[60px] flex items-center justify-center relative mt-14'>
                    <Link className='py-3 max-w-[250px] text-lg w-full flex items-center justify-center hover:mb-3 hover:ml-2 hover:rounded-xl transition-all gap-2 group bg-violet-950 rounded-md ' to={'/dashboard'}>Dashboard <GoArrowRight className='text-white group-hover:ml-2 transition-all' /></Link>
                    <div className='absolute left-1/2 -translate-x-1/2 py-6 rounded-xl bg-white/80 -z-10 max-w-[250px] w-full'></div>
                </div>

                <div className='flex flex-col text-center md:text-left gap-10 md:gap-0 md:flex-row items-center md:items-start md:justify-evenly px-4 py-8 mx-auto w-11/12 mt-8'>
                    <div className='text-white flex flex-col items-center mt-4 md:mt-0 justify-center md:items-start' style={{ fontFamily: 'Quicksand' }}>
                        <h3 className='text-2xl md:text-xl font-black tracking-wider' style={{ fontFamily: 'dastin' }}>Product</h3>
                        <ul className='flex flex-col gap-4 mt-6 md:mt-8'>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-200 ease capitalize'><Link to='/'>Features</Link></li>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-200 ease capitalize'><Link to='/'>Pricing</Link></li>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-200 ease capitalize'><Link to='/'>Integrations</Link></li>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-200 ease capitalize'><Link to='/'>API</Link></li>
                        </ul>
                    </div>
                    <div className='text-white flex flex-col items-center mt-4 md:mt-0 justify-center md:items-start' style={{ fontFamily: 'Quicksand' }}>
                        <h3 className='text-2xl md:text-xl font-black tracking-wider' style={{ fontFamily: 'dastin' }}>Company</h3>
                        <ul className='flex flex-col gap-4 mt-6 md:mt-8'>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-200 ease capitalize'><Link to='/'>About</Link></li>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-200 ease capitalize'><Link to='/'>Careers</Link></li>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-200 ease capitalize'><Link to='/'>Blog</Link></li>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-200 ease capitalize'><Link to='/'>Press</Link></li>
                        </ul>
                    </div>
                    <div className='text-white flex flex-col items-center mt-4 md:mt-0 justify-center md:items-start' style={{ fontFamily: 'Quicksand' }}>
                        <h3 className='text-2xl md:text-xl font-black tracking-wider' style={{ fontFamily: 'dastin' }}>Docs</h3>
                        <ul className='flex flex-col gap-4 mt-6 md:mt-8'>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-200 ease capitalize'><Link to='/'>Getting started</Link></li>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-200 ease capitalize'><Link to='/'>api references</Link></li>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-200 ease capitalize'><Link to='/'>tutorials</Link></li>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-200 ease capitalize'><Link to='/'>examples</Link></li>
                        </ul>
                    </div>
                    <div className='text-white flex flex-col items-center mt-4 md:mt-0 justify-center md:items-start' style={{ fontFamily: 'Quicksand' }}>
                        <h3 className='text-2xl md:text-lg font-black tracking-wider' style={{ fontFamily: 'dastin' }}>Resources</h3>
                        <ul className='flex flex-col gap-4 mt-6 md:mt-8'>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>help centers</Link></li>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>community</Link></li>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>webinars</Link></li>
                            <li className='text-xl md:text-base font-medium cursor-pointer opacity-70 hover:opacity-100 transition-all duration-100 ease capitalize'><Link to='/'>downloads</Link></li>
                        </ul>
                    </div>
                </div>

                <div className='w-full lg:w-[95%] flex items-center justify-between mt-4'>
                    <a className='text-3xl relative text-white/90 transition-all outline-0 hover:text-white after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full' href="#">Instagram</a>
                    <a className='text-3xl relative text-white/90 transition-all outline-0 hover:text-white  after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full' href="#">Facebook</a>
                    <a className='text-3xl relative text-white/90 transition-all outline-0 hover:text-white  after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full' href="#">Twitter</a>
                    <a className='text-3xl relative text-white/90 transition-all outline-0 hover:text-white after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full' href="#">LinkedIn</a>
                </div>

                <div className='w-full lg:w-[95%] mx-auto flex items-center justify-between mt-8'>
                    <div>
                        <p className='text-sm text-white/70'>© 2025 PaperChain. All rights reserved.</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <button className='text-white opacity-50 hover:opacity-100 transition-all duration-400 cursor-pointer'>Privacy Policy</button>
                        <button className='text-white opacity-50 hover:opacity-100 transition-all duration-400 cursor-pointer'>Terms & Condition</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
