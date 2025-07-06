import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../context/OSContext';
import {
    Search,
    Wifi,
    Bluetooth,
    Sun,
    Moon,
    Settings,
    Menu,
    LayoutGrid,
    Bot
} from 'lucide-react';

export default function Taskbar() {
    const { state, toggleStartMenu, toggleTheme, toggleWidgets, toggleCopilot } = useOS();

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getCurrentDate = () => {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${month}/${day}`;
    };

    // Animation variants for dock sections
    const dockVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0
        }
    };

    // Icon animation variants
    const iconVariants = {
        idle: { scale: 1 },
        hover: { scale: 1.1 },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div
            className="fixed bottom-2.5 left-0 right-0 flex justify-center items-center z-[92] px-1.5"
            initial="hidden"
            animate="visible"
            variants={dockVariants}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
            {/* Start Section */}
            <motion.div
                className="flex items-center h-10 bg-white/5 backdrop-blur-md backdrop-saturate-150 rounded-lg border border-white/10 shadow-lg shadow-black/20 px-1.5 mx-0.5"
                whileHover={{ backdropFilter: "blur(20px) saturate(150%) brightness(120%)" }}
                transition={{ duration: 0.2 }}
            >
                {/* Start Button */}
                <motion.button
                    className="relative w-8 h-8 flex items-center justify-center rounded-lg overflow-hidden"
                    onClick={toggleStartMenu}
                    variants={iconVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                >
                    <AnimatePresence mode="wait">
                        {state.startMenuOpen ? (
                            <motion.div
                                key="menu"
                                initial={{ opacity: 0, y: 27 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 27 }}
                                transition={{ duration: 0.2, delay: 0.2 }}
                            >
                                <Menu className="w-5 h-5 text-white" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="windows"
                                initial={{ opacity: 0, y: -32, scale: 0.5 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -32, scale: 0.5 }}
                                transition={{ duration: 0.2, delay: 0.1 }}
                            >
                                <img
                                    src="/icon/logo.svg"
                                    alt="ehzOS 12"
                                    className="w-5 h-5"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Search Button */}
                <motion.button
                    className="relative w-8 h-8 flex items-center justify-center rounded-lg ml-1"
                    variants={iconVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                >
                    <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Search className="w-4 h-4 text-white" />
                    </motion.div>
                </motion.button>
            </motion.div>

            {/* Taskbar Section (for running apps and widgets/copilot) */}
            <motion.div
                className="flex items-center h-10 bg-white/5 backdrop-blur-md backdrop-saturate-150 rounded-lg border border-white/10 shadow-lg shadow-black/20 px-1.5 mx-0.5 min-w-0 max-w-[600px] gap-1"
                id="toolbar"
            >
                {/* Widgets Button */}
                <button
                    className={`taskbar-btn ${state.widgetsOpen ? 'active' : ''}`}
                    onClick={toggleWidgets}
                    title="Widgets"
                >
                    <LayoutGrid size={20} />
                </button>

                {/* Copilot Button */}
                <motion.button
                    className={`w-8 h-8 flex items-center justify-center rounded-lg ${state.copilotOpen ? 'bg-white/20' : ''}`}
                    variants={iconVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={toggleCopilot}
                >
                    <img
                        src="/icon/copilot.svg"
                        alt="Copilot"
                        className="w-4 h-4"
                    />
                </motion.button>

                {/* Running applications taskbar */}
                <div id="taskbar" className="flex items-center overflow-hidden transition-all duration-75 ml-2">
                    {/* Running applications will be dynamically added here */}
                </div>
            </motion.div>

            {/* System Controls */}
            <motion.div
                className="flex items-center h-10 bg-white/5 backdrop-blur-md backdrop-saturate-150 rounded-lg border border-white/10 shadow-lg shadow-black/20 px-1.5 mx-0.5 gap-1"
                whileHover={{ backdropFilter: "blur(20px) saturate(150%) brightness(120%)" }}
                transition={{ duration: 0.2 }}
            >
                {/* WiFi */}
                <motion.button
                    className="w-5 h-5 flex items-center justify-center"
                    variants={iconVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Wifi className="w-4 h-4 text-white/80" />
                </motion.button>

                {/* Bluetooth */}
                <motion.button
                    className="w-5 h-5 flex items-center justify-center"
                    variants={iconVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Bluetooth className="w-4 h-4 text-white/80" />
                </motion.button>

                {/* Control Center */}
                <motion.button
                    className="w-5 h-5 flex items-center justify-center"
                    variants={iconVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Settings className="w-4 h-4 text-white/80" />
                </motion.button>
            </motion.div>

            {/* Theme Toggle */}
            <motion.div
                className={`relative w-10 h-10 bg-white/5 backdrop-blur-md backdrop-saturate-150 rounded-lg border border-white/10 shadow-lg shadow-black/20 mx-0.5 overflow-hidden ${state.theme === 'dark' ? 'dk' : ''}`}
                whileHover={{ backdropFilter: "blur(20px) saturate(150%) brightness(120%)" }}
                transition={{ duration: 0.2 }}
            >
                <motion.button
                    className="w-full h-full flex items-center justify-center"
                    onClick={toggleTheme}
                    variants={iconVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                >
                    {/* Light Theme Icon */}
                    <motion.div
                        className="absolute"
                        animate={{
                            x: state.theme === 'dark' ? -30 : 0,
                            opacity: state.theme === 'dark' ? 0 : 1
                        }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <Sun className="w-5 h-5 text-yellow-400" />
                    </motion.div>

                    {/* Dark Theme Icon */}
                    <motion.div
                        className="absolute"
                        animate={{
                            x: state.theme === 'dark' ? 0 : 40,
                            opacity: state.theme === 'dark' ? 1 : 0
                        }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <Moon className="w-5 h-5 text-blue-400" />
                    </motion.div>
                </motion.button>
            </motion.div>

            {/* Date/Time Section */}
            <motion.div
                className="flex flex-col items-center justify-center h-10 bg-white/5 backdrop-blur-md backdrop-saturate-150 rounded-lg border border-white/10 shadow-lg shadow-black/20 px-3 mx-0.5 min-w-[100px] text-center cursor-pointer"
                whileHover={{
                    backdropFilter: "blur(20px) saturate(150%) brightness(120%)",
                    scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
            >
                <div className="text-xs font-medium text-white leading-tight">
                    {getCurrentTime()}
                </div>
                <div className="text-xs text-white/70 leading-tight">
                    {getCurrentDate()}
                </div>
            </motion.div>
        </motion.div>
    );
} 