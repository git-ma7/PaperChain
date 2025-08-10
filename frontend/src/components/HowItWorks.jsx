import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaUpload, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const steps = [
    {
        id: "01",
        icon: <FaUpload size={22} className="text-white"/>,
        title: "Upload Document",
        description:
            "Securely upload your document to our platform. We support various formats including PDF, DOC, and images."
    },
    {
        id: "02",
        icon: <FaShieldAlt size={22} className="text-white" />,
        title: "Blockchain Storage",
        description:
            "Your document is hashed and stored on IPFS with metadata recorded on the blockchain for immutable proof."
    },
    {
        id: "03",
        icon: <FaCheckCircle size={22} className="text-white" />,
        title: "Instant Verification",
        description:
            "Anyone can verify the authenticity of your document using our verification system in real-time."
    }
];

export default function HowItWorks() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    return (
        <section className="relative py-16 px-4 my-6">
            <div className="text-center mb-10">
                <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold" style={{fontFamily:"Dastin"}}>How It Works</h2>
                <p className="text-center text-base lg:text-xl">
                    Simple 3-step process to secure your documents on the blockchain
                </p>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto">
                {/* Vertical timeline line */}
                <motion.div
                    initial={{ height: 0 }}
                    animate={inView ? { height: "100%" } : {}}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="hidden lg:block absolute left-1/2 h-[100vh] transform -translate-x-1/2 w-[3px] bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500"
                />

                <div className="flex flex-col gap-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: index * 0.3, duration: 0.6 }}
                            className={`relative flex flex-col lg:flex-row items-center ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                                }`}
                        >
                            <div
                                className={`bg-white/50 backdrop-blur-lg border border-black/10 rounded-lg p-6 max-w-[590px] w-full text-black ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                                    }`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-gradient-to-r from-cyan-400 to-purple-500 p-2 rounded-md">
                                        {step.icon}
                                    </div>
                                    <span className="text-3xl text-black/85 font-bold">{step.id}</span>
                                </div>
                                <h3 className="text-xl font-semibold">{step.title}</h3>
                                <p className="text-black/70 mt-1 text-sm">{step.description}</p>
                            </div>

                            {/* Timeline dot */}
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        "0 0 0px rgba(0,255,255,0.6)",
                                        "0 0 20px rgba(0,255,255,0.9)",
                                        "0 0 0px rgba(0,255,255,0.6)"
                                    ]
                                }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute hidden lg:block left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-white"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}