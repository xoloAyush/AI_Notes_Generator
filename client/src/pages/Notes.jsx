import React from 'react'
import { motion } from 'motion/react'
import Navbar from '../components/Navbar'
import TopicForm from '../components/TopicForm'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import FinalResult from '../components/FinalResult'

const Notes = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    return (
        <div className='min-h-screen overflow-hidden bg-[#f7f4f2] text-black px-8'>

            {/* <motion.header
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="
      mt-6
      rounded-2xl
      bg-black/80 backdrop-blur-xl
      border border-white/10
      px-8 py-6
      shadow-[0_20px_45px_rgba(0,0,0,0.5)] flex
      flex-col md:flex-row md:items-center md:justify-between
    "
            >

                <div>
                    <h1 className='text-2xl font-bold bg-linear-to-r from-[#f7f4f2] via-[#f7f4f2] to-[#f7f4f2] bg-clip-text text-transparent'>
                        AI Exam Notes Generator
                    </h1>
                    <p className='text-sm text-gray-300 mt-1'>
                        AI powered notes generator for students and professionals.
                    </p>
                </div>
            </motion.header> */}

            <Navbar />

            <motion.div>
                <TopicForm loading={loading} error={error} setError={setError} setResult={setResult} setLoading={setLoading} />

            </motion.div>

            {!result && (
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="h-64 rounded-2xl flex flex-col items-center justify-center bg-white/60 backdrop-blur-lg border border-dashed border-gray-300 text-gray-500 shadow-inner"
                >
                    <span className="text-4xl mb-3">📘</span>
                    <p className="text-sm">
                        Generated notes will appear here
                    </p>
                </motion.div>
            )}

            {loading && (
                <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="text-center text-black font-medium mb-6"
                >
                    Generating exam focused notes...
                </motion.div>
            )}

            {error && (
                <div
                    className="text-center text-red-600 font-medium mb-6"
                >
                    {error}
                </div>
            )}

            {result && <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex flex-col lg:grid lg:grid-cols-4 gap-6 mb-6"
            >
                <div className='lg:col-span-1'>

                    <Sidebar result={result} />
                </div>
                <div className='lg:col-span-3 rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] p-6'>

                    <FinalResult result={result} />
                </div>
            </motion.div>}
        </div>
    )
}

export default Notes