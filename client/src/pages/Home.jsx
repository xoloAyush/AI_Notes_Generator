import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from 'motion/react'
import img from '../assets/img1.png'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()
    return (
        <div className='min-h-screen overflow-hidden bg-[#f7f4f2] text-black px-8 md:mx-6'>

            <Navbar />
            <section className="max-w-7xl mx-auto px-8 pt-5 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        whileHover={{ rotateX: 6, rotateY: -6 }}
                        className="transform-gpu"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        <motion.h1
                            className="
    text-6xl lg:text-8xl font-extrabold 
    bg-gradient-to-br from-black/90 via-black/60 to-black/90
     text-transparent bg-clip-text
  "
                            whileHover={{ y: -4 }}
                            style={{
                                transform: "translateZ(40px)",
                                textShadow: "0 18px 40px rgba(0,0,0,0.25)"
                            }}
                        >
                            Create Smart <br /> AI Notes <br />in Seconds
                        </motion.h1>

                        <motion.p
                            whileHover={{ y: -4 }}
                            style={{
                                transform: "translateZ(40px)",
                                textShadow: "0 18px 40px rgba(0,0,0,0.25)"
                            }}
                            className="mt-6 text-lg text-gray-600 max-w-lg "
                        >
                            Generate high-quality notes, diagrams and PDFs instantly using AI.
                        </motion.p>

                        <motion.button
                            onClick={() => navigate('/notes')}

                            whileHover={{
                                y: -10,
                                rotateX: 8,
                                rotateY: -8,
                                scale: 1.07
                            }}
                            whileTap={{
                                scale: 0.99
                            }}

                            className="
                               mt-4 flex items-center gap-3
                              rounded-2xl font-semibold
                              bg-black/80 backdrop-blur-xl
                              border border-white/10
                              px-10 py-3 text-white
                              shadow-[0_20px_45px_rgba(0,0,0,0.5)] text-lg cursor-pointer">
                            Get Started

                        </motion.button>

                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    whileHover={{
                        y: -12,
                        rotateX: 8,
                        rotateY: -8,
                        scale: 1.05,
                    }}
                    className="transform-gpu"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    <div className="overflow-hidden rounded-2xl">
                        <img src={img} alt=""
                            style={{ transform: "translateZ(35px)" }} />
                    </div>
                </motion.div>
            </section>

            {/* bottom section */}
            <section className="max-w-7xl mx-auto  py-18 grid grid-cols-1 md:grid-cols-4 gap-10">

                <Feature
                    icon="📝"
                    title="Exam Notes"
                    desc="High-yield exam-oriented notes with revision points."
                />

                <Feature
                    icon="📂"
                    title="Project Notes"
                    desc="Well-structured content for assignments and projects."
                />

                <Feature
                    icon="📊"
                    title="Diagrams"
                    desc="Auto-generated visual diagrams for clarity."
                />

                <Feature
                    icon="⬇️"
                    title="PDF Download"
                    desc="Download clean, printable PDFs instantly."
                />

            </section>
            <Footer />
        </div>
    )
}


function Feature({ icon, title, desc }) {
    return (
        <motion.div

            initial={{ opacity: 0, rotateX: 18, rotateY: -18 }}
            animate={{ opacity: 1, rotateX: 0, rotateY: 0 }}
            whileHover={{ y: -12, rotateX: 8, rotateY: -8, scale: 1.05 }}

            transition={{
                // Entrance animation (slow)
                default: { duration: 1.2, ease: "easeOut" },

                // Hover animation (spring + faster)
                y: { type: "spring", stiffness: 250, damping: 15 },
                rotateX: { type: "spring", stiffness: 50, damping: 95 },
                rotateY: { type: "spring", stiffness: 50, damping: 95 },
                scale: { type: "spring", stiffness: 250, damping: 15 }
            }}
            className="relative rounded-2xl p-6
                 bg-gradient-to-br from-black/90 via-black/80 to-black/90
                 backdrop-blur-2xl
                 border border-white/10
                 shadow-[0_5px_40px_rgba(0,0,0,0.7)]
                 text-white"
            style={{ transformStyle: "preserve-3d" }}
        >

            {/* Hover Light Gradient Overlay */}
            {/* <div
                className="absolute inset-0 rounded-2xl
                   bg-gradient-to-br from-white/10 to-transparent
                   opacity-0 hover:opacity-100 transition-opacity
                   pointer-events-none"
            /> */}

            {/* Content */}
            <div
                className="relative z-10"
                style={{ transform: "translateZ(30px)" }}
            >
                <div className="text-4xl mb-3">{icon}</div>

                <h3 className="text-lg font-semibold mb-2">
                    {title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
}

export default Home