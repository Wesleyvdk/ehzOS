import React, { useState, useRef, useCallback } from 'react';
import { useOS, isIconPath } from '../context/OSContext';
import { Minus, Square, X, Maximize2, Minimize2 } from 'lucide-react';

export default function Windows() {
    const { state, closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize } = useOS();
    const [dragState, setDragState] = useState<{
        isDragging: boolean;
        windowId: string | null;
        startX: number;
        startY: number;
        startWindowX: number;
        startWindowY: number;
    }>({
        isDragging: false,
        windowId: null,
        startX: 0,
        startY: 0,
        startWindowX: 0,
        startWindowY: 0
    });

    const handleMouseDown = useCallback((e: React.MouseEvent, windowId: string) => {
        if (e.target !== e.currentTarget) return; // Only drag from title bar

        const window = state.windows.find(w => w.id === windowId);
        if (!window) return;

        focusWindow(windowId);

        setDragState({
            isDragging: true,
            windowId,
            startX: e.clientX,
            startY: e.clientY,
            startWindowX: window.position.x,
            startWindowY: window.position.y
        });
    }, [state.windows, focusWindow]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!dragState.isDragging || !dragState.windowId) return;

        const deltaX = e.clientX - dragState.startX;
        const deltaY = e.clientY - dragState.startY;

        updateWindowPosition(dragState.windowId, {
            x: Math.max(0, dragState.startWindowX + deltaX),
            y: Math.max(0, dragState.startWindowY + deltaY)
        });
    }, [dragState, updateWindowPosition]);

    const handleMouseUp = useCallback(() => {
        setDragState({
            isDragging: false,
            windowId: null,
            startX: 0,
            startY: 0,
            startWindowX: 0,
            startWindowY: 0
        });
    }, []);

    // Add global mouse event listeners
    React.useEffect(() => {
        if (dragState.isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

    return (
        <>
            {state.windows.map((window) => {
                const AppComponent = window.component;

                return (
                    <div
                        key={window.id}
                        className={`fixed bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden ${window.isFocused ? 'ring-2 ring-blue-500' : ''
                            } ${window.isMinimized ? 'hidden' : ''}`}
                        style={{
                            left: window.isMaximized ? 0 : window.position.x,
                            top: window.isMaximized ? 0 : window.position.y,
                            width: window.isMaximized ? '100vw' : window.size.width,
                            height: window.isMaximized ? '100vh' : window.size.height,
                            zIndex: window.zIndex,
                            transform: window.isMaximized ? 'none' : undefined,
                            transition: window.isMaximized ? 'all 0.2s ease-in-out' : 'none'
                        }}
                        onClick={() => focusWindow(window.id)}
                    >
                        {/* Window Title Bar */}
                        <div
                            className="h-8 bg-gray-100 dark:bg-gray-700 flex items-center justify-between px-3 cursor-move select-none border-b border-gray-200 dark:border-gray-600"
                            onMouseDown={(e) => handleMouseDown(e, window.id)}
                        >
                            <div className="flex items-center space-x-2">
                                {isIconPath(window.icon) ? (
                                    <img
                                        src={window.icon.startsWith('/') ? window.icon : `/${window.icon}`}
                                        alt={window.title}
                                        className="w-4 h-4 object-contain"
                                        style={{
                                            filter: window.icon.endsWith('.svg')
                                                ? state.theme === 'dark'
                                                    ? 'brightness(0) invert(1)'
                                                    : 'none'
                                                : 'none',
                                            imageRendering: 'crisp-edges'
                                        }}
                                        onError={(e) => {
                                            console.error('Failed to load icon:', window.icon);
                                            // Fallback to emoji if image fails to load
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const parent = target.parentElement;
                                            if (parent) {
                                                parent.innerHTML = '<span class="text-lg">📄</span>';
                                            }
                                        }}
                                    />
                                ) : (
                                    <span className="text-lg">{window.icon}</span>
                                )}
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                    {window.title}
                                </span>
                            </div>

                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        minimizeWindow(window.id);
                                    }}
                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                    title="Minimize"
                                >
                                    <Minus size={12} />
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        maximizeWindow(window.id);
                                    }}
                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                    title={window.isMaximized ? "Restore" : "Maximize"}
                                >
                                    {window.isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeWindow(window.id);
                                    }}
                                    className="p-1 hover:bg-red-500 hover:text-white rounded text-gray-600 dark:text-gray-400"
                                    title="Close"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        </div>

                        {/* Window Content */}
                        <div
                            className="h-full bg-white dark:bg-gray-800"
                            style={{
                                height: window.isMaximized ? 'calc(100vh - 32px)' : `${window.size.height - 32}px`
                            }}
                        >
                            <AppComponent />
                        </div>
                    </div>
                );
            })}
        </>
    );
} 