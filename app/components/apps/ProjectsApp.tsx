import React, { useState, useEffect } from 'react';

export default function ProjectsApp() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <div className={`${isMobile ? 'p-4' : 'p-6'} h-full bg-gray-900 text-white overflow-y-auto`}>
            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold ${isMobile ? 'mb-4' : 'mb-6'} text-white`}>My Projects</h1>
            <div className={`grid ${isMobile ? 'gap-4' : 'gap-6'}`}>
                <div className={`bg-gray-800 bg-opacity-80 ${isMobile ? 'rounded-lg p-4' : 'rounded-xl p-6'} border border-gray-700 hover:border-gray-600 transition-colors`}>
                    <h3 className={`font-semibold ${isMobile ? 'mb-2 text-base' : 'mb-3 text-lg'} text-white`}>Portfolio OS</h3>
                    <p className={`text-white ${isMobile ? 'mb-3 text-sm' : 'mb-4'} leading-relaxed`}>
                        A modern portfolio website built with React and TypeScript.
                        Features a ehzOS 12-inspired design with draggable windows, a taskbar, and various applications.
                    </p>
                    <div className={`flex flex-wrap gap-2 ${isMobile ? 'mb-3' : 'mb-4'}`}>
                        <span className={`bg-blue-600 hover:bg-blue-700 ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs'} rounded-lg text-white font-medium transition-colors`}>React</span>
                        <span className={`bg-green-600 hover:bg-green-700 ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs'} rounded-lg text-white font-medium transition-colors`}>TypeScript</span>
                        <span className={`bg-purple-600 hover:bg-purple-700 ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs'} rounded-lg text-white font-medium transition-colors`}>Vite</span>
                        <span className={`bg-cyan-600 hover:bg-cyan-700 ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs'} rounded-lg text-white font-medium transition-colors`}>CSS</span>
                    </div>
                    <div className={`flex ${isMobile ? 'gap-2' : 'gap-3'}`}>
                        <button className={`bg-blue-600 hover:bg-blue-700 text-white ${isMobile ? 'px-3 py-2 text-xs' : 'px-4 py-2 text-sm'} rounded-lg transition-colors font-medium`}>
                            View Project
                        </button>
                        <button className={`bg-gray-700 hover:bg-gray-600 text-white ${isMobile ? 'px-3 py-2 text-xs' : 'px-4 py-2 text-sm'} rounded-lg transition-colors font-medium`}>
                            Source Code
                        </button>
                    </div>
                </div>
                <div className={`bg-gray-800 bg-opacity-80 ${isMobile ? 'rounded-lg p-4' : 'rounded-xl p-6'} border border-gray-700 hover:border-gray-600 transition-colors`}>
                    <h3 className={`font-semibold ${isMobile ? 'mb-2 text-base' : 'mb-3 text-lg'} text-white`}>E-Commerce Platform</h3>
                    <p className={`text-white ${isMobile ? 'mb-3 text-sm' : 'mb-4'} leading-relaxed`}>
                        A full-stack e-commerce solution with modern UI/UX design, payment integration,
                        and comprehensive admin dashboard for inventory management.
                    </p>
                    <div className={`flex flex-wrap gap-2 ${isMobile ? 'mb-3' : 'mb-4'}`}>
                        <span className={`bg-orange-600 hover:bg-orange-700 ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs'} rounded-lg text-white font-medium transition-colors`}>Vue.js</span>
                        <span className={`bg-yellow-600 hover:bg-yellow-700 ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs'} rounded-lg text-white font-medium transition-colors`}>JavaScript</span>
                        <span className={`bg-green-600 hover:bg-green-700 ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs'} rounded-lg text-white font-medium transition-colors`}>Node.js</span>
                        <span className={`bg-blue-600 hover:bg-blue-700 ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-xs'} rounded-lg text-white font-medium transition-colors`}>MongoDB</span>
                    </div>
                    <div className={`flex ${isMobile ? 'gap-2' : 'gap-3'}`}>
                        <button className={`bg-blue-600 hover:bg-blue-700 text-white ${isMobile ? 'px-3 py-2 text-xs' : 'px-4 py-2 text-sm'} rounded-lg transition-colors font-medium`}>
                            View Project
                        </button>
                        <button className={`bg-gray-700 hover:bg-gray-600 text-white ${isMobile ? 'px-3 py-2 text-xs' : 'px-4 py-2 text-sm'} rounded-lg transition-colors font-medium`}>
                            Source Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}