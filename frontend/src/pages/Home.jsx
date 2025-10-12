import React from 'react';
import HeroSection from '../components/Home/HeroSection'
import FeaturesSection from '../components/Home/FeaturesSection'

function Home() {
  return (
    <div className='flex flex-col'>
      <HeroSection />
      <FeaturesSection />
    </div>
  )
}

export default Home