import React from 'react';
import FeaturesCard from './FeaturesCard';
import { GoShieldLock, GoGlobe, GoLock, GoDatabase } from 'react-icons/go';
import {BsLightning} from 'react-icons/bs';
import { FaNetworkWired } from 'react-icons/fa';

function FeaturesSection() {
    const cardsData = [
        {
            title: "Secure and Immutable",
            description: "Utilizing blockchain technology to ensure that all documents are tamper-proof and securely stored.",
            logo: <GoShieldLock size={40}/>},
        {
            title: "Instant Verification",
            description: "Quickly verify the authenticity of documents with a few clicks, reducing the time and effort required for manual checks.",
            logo: <BsLightning size={40}/>},
        { 
            title: "Global Accessibility",
            description: "Access your documents from anywhere in the world, ensuring that you can always verify your credentials when needed.",
            logo: <GoGlobe size={40}/>},
        {
            title: "Privacy Protected",
            description: "Your personal information is protected with advanced encryption, ensuring that only authorized parties can access your documents.",
            logo: <GoLock size={40}/>},
        {
            title: "IPFS Storage",
            description: "Store your documents on the InterPlanetary File System (IPFS) for decentralized and reliable storage.",
            logo: <GoDatabase size={40}/>},
        {
            title: "Smart Contracts",
            description: "Automate the verification process with smart contracts, ensuring that all conditions are met before a document is verified.", 
            logo: <FaNetworkWired size={40}/>
        }
    ]
  return (
    <div className='w-full mt-17 max-w-[1600px] mx-auto flex flex-col h-[91vh] items-center justify-center gap-20 homesection'>
        <div className='flex flex-col items-center justify-center gap-4'>
            <h1 className='text-6xl'>Revolutionary Features</h1>
            <h1 className='text-2xl'>Experience the future of document verification with cutting-edge blockchain technology</h1>
        </div>
        <div className='w-full px-4 md:px-8 lg:px-16'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
                {cardsData.map((card, index) => (
                    <FeaturesCard 
                        key={index}
                        title={card.title}
                        description={card.description}
                        logo={card.logo}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default FeaturesSection