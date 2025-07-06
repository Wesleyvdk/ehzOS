import React, { useState } from 'react';
import { Play, Clock, Terminal } from 'lucide-react';

export default function RunApp() {
    const [command, setCommand] = useState('');
    const [history, setHistory] = useState<string[]>([
        'calc',
        'notepad',
        'mspaint',
        'cmd',
        'powershell'
    ]);

    const handleRun = () => {
        if (command.trim()) {
            setHistory(prev => [command, ...prev.filter(h => h !== command)].slice(0, 10));
            // Simulate command execution
            alert(`Running: ${command}`);
            setCommand('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleRun();
        }
    };

    return (
        <div className="h-full bg-white dark:bg-gray-900 p-6">
            <div className="max-w-md mx-auto">
                <div className="flex items-center space-x-3 mb-6">
                    <Terminal className="w-8 h-8 text-blue-600" />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Run</h1>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
                </p>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Open:
                    </label>
                    <input
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                        placeholder="Enter command..."
                        autoFocus
                    />
                </div>

                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={handleRun}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Play className="w-4 h-4" />
                        <span>OK</span>
                    </button>

                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        Cancel
                    </button>
                </div>

                <div>
                    <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recent Commands</span>
                    </div>
                    <div className="space-y-1">
                        {history.map((cmd, index) => (
                            <button
                                key={index}
                                onClick={() => setCommand(cmd)}
                                className="w-full text-left px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            >
                                {cmd}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 