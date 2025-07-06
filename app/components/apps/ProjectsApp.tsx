import React from 'react';

export default function ProjectsApp() {
    return (
        <div className="p-6 h-full bg-gray-900 text-white overflow-y-auto">
            <h1 className="text-2xl font-bold mb-6 text-white">My Projects</h1>
            <div className="grid gap-6">
                <div className="bg-gray-800 bg-opacity-80 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                    <h3 className="font-semibold mb-3 text-lg text-white">Portfolio OS</h3>
                    <p className="text-white mb-4 leading-relaxed">
                        A modern portfolio website built with React and TypeScript.
                        Features a ehzOS 12-inspired design with draggable windows, a taskbar, and various applications.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-xs text-white font-medium transition-colors">React</span>
                        <span className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-xs text-white font-medium transition-colors">TypeScript</span>
                        <span className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded-lg text-xs text-white font-medium transition-colors">Vite</span>
                        <span className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded-lg text-xs text-white font-medium transition-colors">CSS</span>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors font-medium">
                            View Project
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors font-medium">
                            Source Code
                        </button>
                    </div>
                </div>
                <div className="bg-gray-800 bg-opacity-80 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
                    <h3 className="font-semibold mb-3 text-lg text-white">E-Commerce Platform</h3>
                    <p className="text-white mb-4 leading-relaxed">
                        A full-stack e-commerce solution with modern UI/UX design, payment integration,
                        and comprehensive admin dashboard for inventory management.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-orange-600 hover:bg-orange-700 px-3 py-1 rounded-lg text-xs text-white font-medium transition-colors">Vue.js</span>
                        <span className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded-lg text-xs text-white font-medium transition-colors">JavaScript</span>
                        <span className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded-lg text-xs text-white font-medium transition-colors">Node.js</span>
                        <span className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-lg text-xs text-white font-medium transition-colors">MongoDB</span>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors font-medium">
                            View Project
                        </button>
                        <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors font-medium">
                            Source Code
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 