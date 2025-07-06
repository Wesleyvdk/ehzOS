import React, { useState, useRef, useEffect } from 'react';
import { Brush, Eraser, Palette, Download, RotateCcw, Square, Circle } from 'lucide-react';

type Tool = 'brush' | 'eraser' | 'rectangle' | 'circle';

export default function WhiteboardApp() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState<Tool>('brush');
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);
    const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 });

    const colors = [
        '#000000', '#FF0000', '#00FF00', '#0000FF',
        '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500',
        '#800080', '#FFC0CB', '#A52A2A', '#808080'
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }
    }, []);

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setIsDrawing(true);
        setLastPoint({ x, y });

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            if (tool === 'brush') {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = color;
                ctx.lineWidth = brushSize;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.lineTo(x, y);
                ctx.stroke();
            } else if (tool === 'eraser') {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.lineWidth = brushSize * 2;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    const downloadCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const link = document.createElement('a');
            link.download = 'whiteboard.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    };

    return (
        <div className="h-full bg-white dark:bg-gray-900 flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center space-x-4">
                    {/* Tools */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setTool('brush')}
                            className={`p-2 rounded-lg transition-colors ${tool === 'brush'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                        >
                            <Brush className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => setTool('eraser')}
                            className={`p-2 rounded-lg transition-colors ${tool === 'eraser'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                        >
                            <Eraser className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Brush Size */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300">Size:</span>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={brushSize}
                            onChange={(e) => setBrushSize(Number(e.target.value))}
                            className="w-20"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300 w-6">{brushSize}</span>
                    </div>

                    {/* Color Picker */}
                    <div className="flex items-center space-x-2">
                        <Palette className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
                        />
                    </div>

                    {/* Color Palette */}
                    <div className="flex space-x-1">
                        {colors.map((c) => (
                            <button
                                key={c}
                                onClick={() => setColor(c)}
                                className={`w-6 h-6 rounded border-2 ${color === c ? 'border-gray-800 dark:border-white' : 'border-gray-300 dark:border-gray-600'
                                    }`}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <button
                        onClick={clearCanvas}
                        className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span>Clear</span>
                    </button>

                    <button
                        onClick={downloadCanvas}
                        className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        <span>Save</span>
                    </button>
                </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="border border-gray-300 dark:border-gray-600 bg-white cursor-crosshair shadow-lg"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                />
            </div>
        </div>
    );
} 