import React from 'react'
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import axios from 'axios'
import { serverUrl } from '../App';

const Auth = () => {

    const handleGoogleLogin = async () => {
        try {
            const response = await signInWithPopup(auth, googleProvider);

            const User = response.user;

            const name = User.displayName;
            const email = User.email;

            const result = await axios.post(serverUrl + "/api/auth/google", { name, email }, {
                withCredentials: true
            });

            console.log(result.data);

        } catch (error) {
            console.error("Login Error:", error.message);
        }
    };

    return (
        <div className="min-h-screen overflow-hidden bg-[#f7f4f2] text-black px-8">
            <motion.header
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="
      max-w-7xl mx-auto mt-6
      rounded-2xl
      bg-black/80 backdrop-blur-xl
      border border-white/10
      px-8 py-6
      shadow-[0_20px_45px_rgba(0,0,0,0.5)]
    "
            >

                <h1 className='text-2xl font-bold bg-linear-to-r from-[#f7f4f2] via-[#f7f4f2] to-[#f7f4f2] bg-clip-text text-transparent'>
                    AI Exam Notes Generator
                </h1>
                <p className='text-sm text-gray-300 mt-1'>
                    AI powered notes generator for students and professionals.
                </p>
            </motion.header>

            <main className='max-w-7xl mx-auto px-8 py-7 
            grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-20'>

                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5 }}
                >

                    <motion.h1

                        className='text-6xl md:text-5xl lg:text-9xl font-extrabold leading-right bg-gradient-to-br from-black/90 via-black/70 to-black/90 
                    text-transparent bg-clip-text '>
                        Unlock Smart <br /> AI Notes
                    </motion.h1>

                    <p className='mt-3 
      rounded-2xl bg-gradient-to-br from-black/90 via-black/70 to-black/90  py-3
                    text-transparent text-transparent bg-clip-text'>
                        You get <span className='font-semibold'>
                            50 FREE credits
                        </span> to create exam notes, project notes, charts, graphs
                        and download clean PDFs - instantly using AI.
                    </p>

                    <motion.button
                        onClick={handleGoogleLogin}
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
      rounded-2xl
      bg-black/80 backdrop-blur-xl
      border border-white/10
      px-10 py-3 text-white
      shadow-[0_20px_45px_rgba(0,0,0,0.5)] text-sm cursor-pointer">
                        <FcGoogle size={25} />Continue with Google

                    </motion.button>


                </motion.div>

                {/* RIGHT CONTENT */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6">
                    <Feature
                        icon="🎁"
                        title="50 Free Credits"
                        desc="Start with 50 credits to generate notes without paying."
                    />

                    <Feature
                        icon="📝"
                        title="Exam Notes"
                        desc="High-yield, revision-ready exam-oriented notes."
                    />

                    <Feature
                        icon="📁"
                        title="Project Notes"
                        desc="Well-structured documentation for assignments & projects."
                    />

                    <Feature
                        icon="📊"
                        title="Charts & Graphs"
                        desc="Auto-generated diagrams, charts and flow graphs."
                    />

                    <Feature
                        icon="⬇️"
                        title="Free PDF Download"
                        desc="Download clean, printable PDFs instantly."
                    />
                </div>
            </main>
        </div>
    )
}


function Feature({ icon, title, desc }) {
    return (
        <motion.div
            whileHover={{ y: -12, rotateX: 8, rotateY: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
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



export default Auth