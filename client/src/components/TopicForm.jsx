import React from 'react'
import { easeIn, motion } from 'motion/react'
import { useState } from 'react'
import { generateNotes } from '../../services/api'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateCredits } from '../redux/userSlice'

const TopicForm = ({ setResult, setLoading, setError, loading }) => {

    const [topic, setTopic] = useState("");
    const [classLevel, setClassLevel] = useState("");
    const [examType, setExamType] = useState("");
    const [revisionMode, setRevisionMode] = useState(false);
    const [includeDiagram, setIncludeDiagram] = useState(false);
    const [includeChart, setIncludeChart] = useState(false);

    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState("");

    const dispatch = useDispatch()

    const handleSubmit = async () => {
        if (!topic.trim()) {
            setError("Please enter the topic")
            return
        }

        setError("")
        setLoading(true)
        setResult(null)

        try {
            const result = await generateNotes({
                topic,
                classLevel,
                examType,
                revisionMode,
                includeDiagram,
                includeChart
            })

            setResult(result.data)
            setLoading(false)
            setClassLevel("")
            setTopic("")
            setExamType("")
            setRevisionMode(false)
            setIncludeDiagram(false)
            setIncludeChart(false)

            if (typeof result.creditsLeft === "number") {
                dispatch(updateCredits(result.creditsLeft))
            }

        } catch (error) {
            console.log(error)
            setError("failed to fetch from server")
            setLoading(false)
        }
    }

    useEffect(() => {

        if (!loading) {
            setProgress(0);
            setProgressText("");
            return;
        }

        let value = 0;

        const interval = setInterval(() => {
            value += Math.random() * 8;

            if (value >= 95) {
                value = 95;
                setProgressText("Almost done...");
                clearInterval(interval);
            } else if (value > 70) {
                setProgressText("Finalizing notes...");
            } else if (value > 40) {
                setProgressText("Processing content...");
            } else {
                setProgressText("Generating notes...");
            }

            setProgress(Math.floor(value));
        }, 700);

        return () => clearInterval(interval);
    }, [loading]);

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
        py-6 md:py-8
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

            <div className='flex w-full items-start flex-col md:flex-row gap-8 mt-2'>
                <Toggle
                    label="Revision Mode"
                    checked={revisionMode}
                    onChange={() => setRevisionMode(!revisionMode)}
                />
                <Toggle
                    label="Include Diagram"
                    checked={includeDiagram}
                    onChange={() => setIncludeDiagram(!includeDiagram)}
                />
                <Toggle
                    label="Include Chart"
                    checked={includeChart}
                    onChange={() => setIncludeChart(!includeChart)}
                />

                {/* <motion.button
                    whileHover={{
                        scale: 1,
                        rotateX: 8,
                        rotateY: -8,
                        boxShadow: "0 15px 30px rgba(0,0,0,0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    // onClick={handleSubmit}
                    disabled={loading}
                    className="
        px-8 py-3 rounded-xl
        bg-gradient-to-r from-green-500 to-emerald-600
        text-white font-semibold
        shadow-[0_10px_25px_rgba(0,0,0,0.3)]
        hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-all duration-200
        flex items-center gap-2
      "
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <span>✨</span>
                            <span>Generate Notes</span>
                        </>
                    )}
                </motion.button> */}

            </div>

            <motion.button
                onClick={handleSubmit}
                className={`w-full mt-4 px-6 py-3 rounded-xl font-semibold flex items-start

                    justify-start gap-3`}
            >
                <motion.h3
                    whileHover={!loading ? { scale: 1.1 } : {}}
                    whileTap={!loading ? { scale: 0.95 } : {}}
                    transition={{ duration: easeIn }}
                    disabled={loading}
                    className={`px-6 py-3 rounded-xl font-semibold flex items-start

                    justify-start gap-3 transition ${loading
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
                        }`}>
                    {loading ? "  Generating Notes... 💫" : " 💫 Generate Notes"}
                </motion.h3>

            </motion.button>

            {loading && (

                <div className="w-full mt-4 space-y-2">

                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeOut", duration: 0.6 }}
                            className="h-full bg-gradient-to-r from-green-400 via-emerald-400 to-green-500"
                        ></motion.div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-300">
                        <span>{progressText}</span>
                        <span>{progress}%</span>
                    </div>

                    <p className="text-xs text-gray-400 text-center">This may take upto 2-5 minutes. Please don't refresh the page or close the tab</p>

                </div>
            )}
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

            <span className={`text-white text-sm ${checked ? "text-green-400" : "text-gray-400"}`}>{label}</span>
        </div>
    );
}

export default TopicForm