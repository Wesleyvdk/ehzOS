import React, { useState, useEffect } from 'react';

export default function ContactApp() {
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
            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold ${isMobile ? 'mb-4' : 'mb-6'} text-white`}>Contact Me</h1>
            <div className={`bg-gray-800 bg-opacity-80 ${isMobile ? 'rounded-lg p-4' : 'rounded-xl p-6'} border border-gray-700`}>
                <form className={`${isMobile ? 'space-y-4' : 'space-y-6'}`}>
                    <div>
                        <label className={`block ${isMobile ? 'text-xs' : 'text-sm'} font-medium mb-2 text-white`}>Name</label>
                        <input
                            type="text"
                            className={`w-full ${isMobile ? 'p-2' : 'p-3'} rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${isMobile ? 'text-sm' : ''}`}
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label className={`block ${isMobile ? 'text-xs' : 'text-sm'} font-medium mb-2 text-white`}>Email</label>
                        <input
                            type="email"
                            className={`w-full ${isMobile ? 'p-2' : 'p-3'} rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${isMobile ? 'text-sm' : ''}`}
                            placeholder="your.email@example.com"
                        />
                    </div>
                    <div>
                        <label className={`block ${isMobile ? 'text-xs' : 'text-sm'} font-medium mb-2 text-white`}>Subject</label>
                        <input
                            type="text"
                            className={`w-full ${isMobile ? 'p-2' : 'p-3'} rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${isMobile ? 'text-sm' : ''}`}
                            placeholder="What's this about?"
                        />
                    </div>
                    <div>
                        <label className={`block ${isMobile ? 'text-xs' : 'text-sm'} font-medium mb-2 text-white`}>Message</label>
                        <textarea
                            rows={isMobile ? 4 : 6}
                            className={`w-full ${isMobile ? 'p-2' : 'p-3'} rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors resize-none ${isMobile ? 'text-sm' : ''}`}
                            placeholder="Tell me about your project or just say hello!"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white ${isMobile ? 'px-4 py-2 text-sm' : 'px-6 py-3'} rounded-lg transition-colors font-medium`}
                    >
                        Send Message
                    </button>
                </form>

                <div className={`${isMobile ? 'mt-6 pt-4' : 'mt-8 pt-6'} border-t border-gray-600`}>
                    <h3 className={`font-semibold ${isMobile ? 'mb-3 text-base' : 'mb-4 text-lg'} text-white`}>Other Ways to Reach Me</h3>
                    <div className={`${isMobile ? 'space-y-2' : 'space-y-3'}`}>
                        <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'} text-gray-300`}>
                            <span className={`${isMobile ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'} bg-blue-600 rounded-lg flex items-center justify-center`}>📧</span>
                            <span className={`${isMobile ? 'text-sm' : ''}`}>ehz@treffortly.com</span>
                        </div>
                        <div className={`flex items-center ${isMobile ? 'gap-2' : 'gap-3'} text-gray-300`}>
                            <span className={`${isMobile ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'} bg-gray-700 rounded-lg flex items-center justify-center`}>🐙</span>
                            <span className={`${isMobile ? 'text-sm' : ''}`}>GitHub: /Wesleyvdk</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}