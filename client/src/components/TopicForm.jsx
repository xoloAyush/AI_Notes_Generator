import React from 'react'
import { motion } from 'motion/react'
import { useState } from 'react'
const TopicForm = () => {

    const [topic, setTopic] = useState("");
    const [classLevel, setClassLevel] = useState("");
    const [examType, setExamType] = useState("");
    const [revisionMode, setRevisionMode] = useState(false);
    const [includeDiagram, setIncludeDiagram] = useState(false);
    const [includeChart, setIncludeChart] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="
        relative z-20 mt-4 md:mt-6
        rounded-2xl
        bg-gradient-to-br from-black/90 via-black/80 to-black/90
        backdrop-blur-2xl
        border border-white/10
        shadow-[0_20px_45px_rgba(0,0,0,0.5)]
        flex md: flex-col items-center justify-between
        px-4 sm:px-6 md:px-8
        py-3 md:py-4
        mb-6 text-white gap-6
      "
        >

            <input
                type="text"
                className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter topic (e.g. Photosynthesis)"
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
            />

            <input
                type="text"
                className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter class level (e.g. 10th)"
                onChange={(e) => setClassLevel(e.target.value)}
                value={classLevel}
            />

            <input
                type="text"
                className="w-full p-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-white/30"

                placeholder="Enter exam type (e.g. CBSE, JEE ,NEET)"
                onChange={(e) => setExamType(e.target.value)}
                value={examType}
            />

        </motion.div>
    )

}

function Toggle({ label, checked, onChange }) {
    return (
        <div
            className="flex items-center gap-4 cursor-pointer select-none"
            onClick={onChange}
        >
            {/* Background */}
            <motion.div
                animate={{
                    backgroundColor: checked
                        ? "rgba(34,197,94,0.35)"   // green
                        : "rgba(255,255,255,0.15)" // gray
                }}
                transition={{ duration: 0.25 }}
                className="relative w-12 h-6 rounded-full border border-white/20 backdrop-blur-lg"
            >
                {/* Knob */}
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}

                    className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
                    style={{
                        left: checked ? '1.6rem' : '0.25rem'
                    }}
                />

            </motion.div>

            <span className="text-white text-sm">{label}</span>
        </div>
    );
}

export default TopicForm