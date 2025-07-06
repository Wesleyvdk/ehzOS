import React from 'react';

export default function TerminalApp() {
    return (
        <div className="p-4 h-full bg-black bg-opacity-80 text-green-400 font-mono">
            <div className="mb-2">Welcome to Portfolio Terminal v1.0</div>
            <div className="mb-2">Type 'help' for available commands</div>
            <div className="mb-4">==========================================</div>

            <div className="mb-2">$ neofetch</div>
            <div className="mb-1">
                <span className="text-blue-400">OS:</span> Portfolio OS 1.0
            </div>
            <div className="mb-1">
                <span className="text-blue-400">Developer:</span> Your Name
            </div>
            <div className="mb-1">
                <span className="text-blue-400">Skills:</span> React, TypeScript, Node.js
            </div>
            <div className="mb-1">
                <span className="text-blue-400">Experience:</span> X years
            </div>
            <div className="mb-4">
                <span className="text-blue-400">GitHub:</span> github.com/yourname
            </div>

            <div className="flex">
                <span className="text-green-400">$</span>
                <span className="ml-2 animate-pulse">_</span>
            </div>
        </div>
    );
} 