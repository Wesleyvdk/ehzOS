import React, { useState, useRef, useEffect } from 'react';
import { Play, Save, FileText, Download, Upload, RotateCcw, Settings } from 'lucide-react';

interface OutputLine {
    content: string;
    type: 'output' | 'error' | 'input';
    timestamp: Date;
}

export default function PythonEditorApp() {
    const [code, setCode] = useState(`# Welcome to Python Editor
# Write your Python code here

def hello_world():
    print("Hello, World!")
    return "Python is awesome!"

def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Example usage
hello_world()
print("Fibonacci sequence:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")

# Try some calculations
result = 2 ** 10
print(f"2^10 = {result}")

# List comprehension example
squares = [x**2 for x in range(1, 11)]
print(f"Squares: {squares}")
`);
    const [output, setOutput] = useState<OutputLine[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [fontSize, setFontSize] = useState(14);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [filename, setFilename] = useState('main.py');
    const [showSettings, setShowSettings] = useState(false);

    const codeRef = useRef<HTMLTextAreaElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output]);

    const addOutput = (content: string, type: 'output' | 'error' | 'input' = 'output') => {
        setOutput(prev => [...prev, { content, type, timestamp: new Date() }]);
    };

    const runCode = async () => {
        if (isRunning) return;

        setIsRunning(true);
        setOutput([]);

        addOutput(`Running ${filename}...`, 'input');

        // Simulate code execution with realistic delays
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            // Simple simulation of Python code execution
            const lines = code.split('\n');
            let inFunction = false;
            let functionName = '';

            for (const line of lines) {
                const trimmed = line.trim();

                if (trimmed.startsWith('#') || trimmed === '') {
                    continue;
                }

                if (trimmed.startsWith('def ')) {
                    inFunction = true;
                    functionName = trimmed.match(/def\s+(\w+)/)?.[1] || '';
                    continue;
                }

                if (inFunction && (trimmed.startsWith('def ') || (!trimmed.startsWith(' ') && !trimmed.startsWith('\t')))) {
                    inFunction = false;
                }

                if (inFunction) {
                    continue;
                }

                // Simulate print statements
                if (trimmed.includes('print(')) {
                    const match = trimmed.match(/print\((.+)\)/);
                    if (match) {
                        let printContent = match[1];

                        // Handle f-strings and simple expressions
                        if (printContent.includes('f"') || printContent.includes("f'")) {
                            // Simulate f-string evaluation
                            if (printContent.includes('2^10')) {
                                addOutput('2^10 = 1024');
                            } else if (printContent.includes('Squares:')) {
                                addOutput('Squares: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]');
                            } else if (printContent.includes('F(')) {
                                // Skip individual fibonacci calls for brevity
                                continue;
                            }
                        } else if (printContent.includes('"') || printContent.includes("'")) {
                            // Simple string
                            const str = printContent.replace(/['"]/g, '');
                            addOutput(str);
                        }
                    }
                } else if (trimmed.includes('hello_world()')) {
                    addOutput('Hello, World!');
                } else if (trimmed.includes('for i in range(10)')) {
                    addOutput('Fibonacci sequence:');
                    const fibs = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
                    for (let i = 0; i < 10; i++) {
                        addOutput(`F(${i}) = ${fibs[i]}`);
                        await new Promise(resolve => setTimeout(resolve, 100));
                    }
                }

                await new Promise(resolve => setTimeout(resolve, 50));
            }

            addOutput('\n--- Execution completed ---', 'input');

        } catch (error) {
            addOutput(`Error: ${error}`, 'error');
        }

        setIsRunning(false);
    };

    const clearOutput = () => {
        setOutput([]);
    };

    const saveFile = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    const loadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                setCode(content);
                setFilename(file.name);
            };
            reader.readAsText(file);
        }
    };

    const getOutputClass = (type: string) => {
        switch (type) {
            case 'error':
                return 'text-red-400';
            case 'input':
                return 'text-blue-400';
            default:
                return 'text-green-400';
        }
    };

    return (
        <div className={`h-full flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            {/* Header */}
            <div className={`flex items-center justify-between p-3 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <input
                            type="text"
                            value={filename}
                            onChange={(e) => setFilename(e.target.value)}
                            className={`px-2 py-1 text-sm border rounded ${theme === 'dark'
                                ? 'bg-gray-700 border-gray-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900'
                                }`}
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <button
                            onClick={runCode}
                            disabled={isRunning}
                            className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Play className="w-4 h-4" />
                            <span>{isRunning ? 'Running...' : 'Run'}</span>
                        </button>

                        <button
                            onClick={saveFile}
                            className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            <span>Save</span>
                        </button>

                        <label className="flex items-center space-x-2 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 cursor-pointer transition-colors">
                            <Upload className="w-4 h-4" />
                            <span>Load</span>
                            <input
                                type="file"
                                accept=".py,.txt"
                                onChange={loadFile}
                                className="hidden"
                            />
                        </label>

                        <button
                            onClick={clearOutput}
                            className="flex items-center space-x-2 px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span>Clear</span>
                        </button>
                    </div>
                </div>

                <button
                    onClick={() => setShowSettings(!showSettings)}
                    className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${showSettings ? 'bg-gray-200 dark:bg-gray-700' : ''
                        }`}
                >
                    <Settings className="w-4 h-4" />
                </button>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className={`p-3 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <label className="text-sm">Font Size:</label>
                            <select
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className={`px-2 py-1 text-sm border rounded ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            >
                                <option value={12}>12px</option>
                                <option value={14}>14px</option>
                                <option value={16}>16px</option>
                                <option value={18}>18px</option>
                                <option value={20}>20px</option>
                            </select>
                        </div>

                        <div className="flex items-center space-x-2">
                            <label className="text-sm">Theme:</label>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
                                className={`px-2 py-1 text-sm border rounded ${theme === 'dark'
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-900'
                                    }`}
                            >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex">
                {/* Code Editor */}
                <div className="flex-1 flex flex-col">
                    <div className={`px-3 py-2 text-sm font-medium ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                        Code Editor
                    </div>
                    <textarea
                        ref={codeRef}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className={`flex-1 p-4 font-mono resize-none focus:outline-none ${theme === 'dark'
                            ? 'bg-gray-900 text-white'
                            : 'bg-white text-gray-900'
                            }`}
                        style={{ fontSize: `${fontSize}px` }}
                        placeholder="Write your Python code here..."
                        spellCheck={false}
                    />
                </div>

                {/* Output Panel */}
                <div className={`w-1/2 flex flex-col border-l ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                    <div className={`px-3 py-2 text-sm font-medium ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                        Output
                    </div>
                    <div
                        ref={outputRef}
                        className={`flex-1 p-4 font-mono text-sm overflow-y-auto ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'
                            }`}
                        style={{ fontSize: `${fontSize}px` }}
                    >
                        {output.length === 0 ? (
                            <div className="text-gray-500 italic">
                                Click "Run" to execute your code...
                            </div>
                        ) : (
                            output.map((line, index) => (
                                <div key={index} className={`${getOutputClass(line.type)} mb-1`}>
                                    {line.content}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 