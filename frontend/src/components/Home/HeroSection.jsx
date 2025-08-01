import React from 'react'
import {GoRocket, GoUpload, GoEye, GoArrowRight} from 'react-icons/go'

function HeroSection() {
  return (
    <div className='w-full mt-38 md:mt-17 max-w-[1300px] mx-auto flex flex-col md:h-[91vh] items-center md:justify-center gap-4 md:gap-6 homesection'>
        <div className='bg-black/10 backdrop-blur-xl rounded-2xl w-fit px-4 py-1 mx-auto justify-center flex items-center gap-2 powered-by'>
            <GoRocket size={16}/>
            <span className='text-xs md:text-sm'>Powered by Blockchain</span>
        </div>
        <div className='flex flex-col justify-center items-center px-3 gap-3'>
            <h1 className='text-center text-5xl lg:text-7xl font-semibold' style={{fontFamily:'dastin'}} >Verify Trust.</h1>
            <h1 className='text-center text-3xl md:text-5xl lg:text-7xl'>Powered by Blockchain.</h1>
            <p className='text-center max-w-[650px] md:text-xl'>
              Revolutionize document verification with decentralized technology.
              Immutable, transaparent, and instantly verifiable credentials on the blockchain.
            </p>
        </div>
        <div className='w-full flex flex-col md:flex-row items-center justify-center gap-2 px-4 md:gap-8'>
          <button className='w-full flex gap-2 items-center justify-center border border-black/20 rounded-md py-2 backdrop-blur-xl bg-white/70 md:w-[205px] hover:shadow-lg transition-all duration-500'>
            <GoUpload />
            Upload Document
          </button>
          <button className='w-full flex gap-2 items-center justify-center border border-black/20 rounded-md py-2 backdrop-blur-xl bg-white/70 md:w-[205px] hover:shadow-lg transition-all duration-500'>
            <GoEye />
            Verify Now
          </button>
        </div>
    </div>
  )
}

export default HeroSection