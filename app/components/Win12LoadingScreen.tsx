import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
    onComplete: () => void;
}

const Win12LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [loadingText, setLoadingText] = useState('Starting ehzOS 12...');
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    const loadingSteps = [
        'Starting ehzOS 12...',
        'Initializing system components...',
        'Loading desktop environment...',
        'Configuring user interface...',
        'Preparing applications...',
        'Finalizing setup...',
        'Welcome to ehzOS 12!'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + 2;

                // Update loading text based on progress
                const stepIndex = Math.min(Math.floor(newProgress / 15), loadingSteps.length - 1);
                if (stepIndex !== currentStep) {
                    setCurrentStep(stepIndex);
                    setLoadingText(loadingSteps[stepIndex]);
                }

                if (newProgress >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        onComplete();
                    }, 1000);
                    return 100;
                }
                return newProgress;
            });
        }, 100);

        return () => clearInterval(timer);
    }, [onComplete, currentStep, loadingSteps]);

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-[#0078d4] to-[#106ebe] flex items-center justify-center z-50">
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    {/* ehzOS 12 Logo */}
                    <div className="relative w-32 h-32 mx-auto mb-8">
                        <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm"></div>
                        <div className="absolute inset-2 bg-white/30 rounded-xl flex items-center justify-center">
                            <div className="text-white text-4xl font-bold">ehz</div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white/40 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                        </div>
                    </div>

                    {/* System Name */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-light mb-2 tracking-wide">ehzOS 12</h1>
                        <p className="text-lg text-white/80 mb-8">Portfolio Edition</p>
                    </motion.div>

                    {/* Loading Progress */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="w-80 mx-auto"
                    >
                        <div className="mb-4">
                            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    className="h-full bg-white rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.1 }}
                                />
                            </div>
                        </div>
                        <p className="text-sm text-white/70 mb-2">{loadingText}</p>
                        <p className="text-xs text-white/50">{progress}% complete</p>
                    </motion.div>

                    {/* System Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="absolute bottom-8 left-8 text-left"
                    >
                        <div className="text-xs text-white/60 font-mono">
                            <div className="mb-1">ehzOS 12 [Version 12.0.22000.1]</div>
                            <div className="mb-1">(c) ehzOS Team. All rights reserved.</div>
                        </div>
                    </motion.div>

                    {/* Loading Animation */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="absolute bottom-8 right-8"
                    >
                        <div className="flex space-x-1">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-white/60 rounded-full"
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.6, 1, 0.6]
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Win12LoadingScreen; 