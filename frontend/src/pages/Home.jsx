import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/Home/HeroSection'
import FeaturesSection from '../components/Home/FeaturesSection'
import HowItWorks from './../components/HowItWorks';

function Home() {
  return (
    <div className='flex flex-col'>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks/>
    </div>
  )
}

export default Home