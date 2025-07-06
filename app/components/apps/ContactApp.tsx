import React from 'react';

export default function ContactApp() {
    return (
        <div className="p-6 h-full bg-gray-900 text-white overflow-y-auto">
            <h1 className="text-2xl font-bold mb-6 text-white">Contact Me</h1>
            <div className="bg-gray-800 bg-opacity-80 rounded-xl p-6 border border-gray-700">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-white">Name</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-white">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                            placeholder="your.email@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-white">Subject</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                            placeholder="What's this about?"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-white">Message</label>
                        <textarea
                            rows={6}
                            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors resize-none"
                            placeholder="Tell me about your project or just say hello!"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                    >
                        Send Message
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-600">
                    <h3 className="font-semibold mb-4 text-lg text-white">Other Ways to Reach Me</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-300">
                            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm">📧</span>
                            <span>ehz@treffortly.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <span className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-sm">🐙</span>
                            <span>GitHub: /Wesleyvdk</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 