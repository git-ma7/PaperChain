import React from 'react'
import {GoRocket, GoUpload, GoEye, GoArrowRight} from 'react-icons/go'

function HeroSection() {
  return (
    <div className='w-full mt-17 max-w-[1300px] mx-auto flex flex-col h-[91vh] items-center justify-center gap-6 homesection'>
        <div className='border border-black/20 bg-white/40 backdrop-blur-xl rounded-2xl text-purple-700 w-fit px-4 mx-auto justify-center flex items-center gap-2'>
            <GoRocket />
            <span className='text-sm '>Powered by Blockchain</span>
        </div>
        <div className='flex flex-col justify-center items-center gap-3'>
            <h1 className='text-7xl' style={{fontFamily:''}} >Verify Trust.</h1>
            <h1 className='text-7xl'>Powered by Blockchain.</h1>
            <p className='text-center max-w-[650px] text-xl'>
              Revolutionize document verification with decentralized technology.
              Immutable, transaparent, and instantly verifiable credentials on the blockchain.
            </p>
        </div>
        <div className='flex items-center gap-8'>
          <button className='flex gap-2 items-center justify-center border border-black/20 rounded-md py-2 backdrop-blur-xl bg-white/70 w-[205px] hover:shadow-lg transition-all duration-500'>
            <GoUpload />
            Upload Document
          </button>
          <button className='flex gap-2 items-center justify-center border border-black/20 rounded-md py-2 backdrop-blur-xl bg-white/70 w-[205px] hover:shadow-lg transition-all duration-500'>
            <GoEye />
            Verify Now
          </button>
        </div>
    </div>
  )
}

export default HeroSection