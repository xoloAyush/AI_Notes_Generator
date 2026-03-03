import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useSelector, useDispatch } from "react-redux"
import logo from "../assets/logo.png"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { serverUrl } from "../App"
import { setUserData } from "../redux/userSlice"

function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const credits = userData?.user?.credits ?? 0

    const [showCredits, setShowCredits] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSignOut = async () => {

        try {
            await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
            dispatch(setUserData(null));
            navigate("/auth");

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
        relative z-20 mt-4 md:mt-6
        rounded-2xl
        bg-gradient-to-br from-black/90 via-black/80 to-black/90
        backdrop-blur-2xl
        border border-white/10
        shadow-[0_20px_45px_rgba(0,0,0,0.5)]
        flex items-center justify-between
        px-4 sm:px-6 md:px-8
        py-3 md:py-4
        mb-6
      "
        >
            {/* LEFT SIDE */}
            <div className="flex items-center gap-2 text-white font-semibold">
                <img src={logo} alt="Logo" className="w-8 h-8 md:w-9 md:h-9" />

                {/* Hide long text on very small screens */}
                <span className="text-sm sm:text-base md:text-lg hidden sm:block">
                    AI Exam Notes Generator
                </span>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4 md:gap-6 relative">
                <div className="relative">
                    <motion.div
                        onClick={() => {
                            setShowCredits(!showCredits);
                            setShowProfile(false);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="
              flex items-center gap-3
              px-3 md:px-4
              py-2
              rounded-full
              bg-white/10
              border border-white/20
              text-white text-xs md:text-sm
              shadow-md cursor-pointer
            "
                    >
                        <span className="text-lg md:text-xl">💎</span>
                        <span>{credits}</span>

                        <span className="h-5 px-1 flex items-center justify-center rounded-full bg-white/70 text-black text-xs font-semibold">
                            ➕
                        </span>
                    </motion.div>

                    {/* DROPDOWN */}
                    <AnimatePresence>
                        {showCredits && (
                            <motion.div
                                key="credits-dropdown"
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 8, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="
                  absolute right-0 mt-3
                  w-56 sm:w-64
                  rounded-2xl
                  bg-black/90 backdrop-blur-xl
                  border border-white/10
                  shadow-[0_25px_60px_rgba(0,0,0,0.7)]
                  p-4 text-white text-sm
                "
                            >
                                <h4 className="font-semibold mb-2">Buy Credits</h4>

                                <p className="text-sm text-gray-300 mb-4">
                                    Use credits to generate AI notes, diagrams & PDFs.
                                </p>

                                <button
                                    onClick={() => {
                                        setShowCredits(false);
                                        navigate('/pricing')
                                    }}
                                    className="w-full py-2 rounded-lg bg-gradient-to-br from-white to-gray-200 text-black font-semibold hover:opacity-90 transition"
                                >
                                    Buy More Credits
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative">
                    <motion.div
                        onClick={() => {
                            setShowProfile(!showProfile);
                            setShowCredits(false);
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="
              flex items-center gap-3
              px-3 md:px-4
              py-2
              rounded-full
              bg-white/10
              border border-white/20
              text-white text-xs md:text-sm
              shadow-md cursor-pointer
            "
                    >
                        <span className="text-lg md:text-xl">{userData?.user?.name.slice(0, 1).toUpperCase()}</span>

                        <AnimatePresence>
                            {showProfile && (
                                <motion.div
                                    key="credits-dropdown"
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 14, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="
                  absolute right-0 top-12 mt-1
                  w-56 sm:w-64
                  rounded-2xl
                  bg-black/90 backdrop-blur-xl
                  border border-white/10
                  shadow-[0_25px_60px_rgba(0,0,0,0.7)]
                  p-4 text-white text-sm
                "
                                >

                                    <MenuItem text='History' onClick={() => { setShowProfile(false); navigate('/history') }} />

                                    <div className='w-full h-[1px] bg-white/10'></div>

                                    <MenuItem text='Sign Out' onClick={handleSignOut} red />

                                </motion.div>
                            )}
                        </AnimatePresence>

                    </motion.div>

                    {/* DROPDOWN */}

                </div>
            </div>
        </motion.div >
    )
}

function MenuItem({ onClick, text, red }) {
    return (
        <div
            onClick={onClick}
            className={`
        w-full text-left px-5 py-3 text-sm
        rounded-2xl transition-colors cursor-pointer
        ${red
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-gray-200 hover:bg-white/10"
                }
      `}
        >
            {text}
        </div>
    )
}


export default Navbar