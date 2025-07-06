import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { Minus, Square, X, Maximize2 } from 'lucide-react';
import { useOS } from '../context/OSContext';
import { isIconPath } from '../context/OSContext';
import type { WindowState } from '../types/os';

interface WindowProps {
    window: WindowState;
}

export default function Window({ window }: WindowProps) {
    const {
        state,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize
    } = useOS();

    const windowRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Handle window focus when clicked
    const handleWindowClick = () => {
        if (!window.isFocused) {
            focusWindow(window.id);
        }
    };

    // Handle drag start
    const handleDragStart = () => {
        setIsDragging(true);
    };

    // Handle drag stop
    const handleDragStop = (e: any, data: any) => {
        setIsDragging(false);
        updateWindowPosition(window.id, { x: data.x, y: data.y });
    };

    // Prevent dragging when window is maximized
    const isDraggable = !window.isMaximized;

    // Window style based on state
    const windowStyle = {
        width: window.isMaximized ? '100vw' : window.size.width,
        height: window.isMaximized ? 'calc(100vh - 64px)' : window.size.height,
        transform: window.isMaximized ? 'translate(0, 0) !important' : undefined,
        zIndex: window.zIndex,
    };

    // Get window CSS class based on state
    const getWindowClass = () => {
        let classes = 'window absolute overflow-hidden ';

        if (window.isMaximized) {
            classes += 'rounded-none ';
        } else {
            classes += 'rounded-2xl ';
        }

        if (window.isFocused) {
            classes += 'focused ';
        } else {
            classes += 'unfocused ';
        }

        if (isDragging) {
            classes += 'dragging ';
        }

        classes += 'window-enter-active transition-all duration-300 ';

        return classes;
    };

    const Component = window.component;

    if (window.isMinimized) {
        return null;
    }

    return (
        <Draggable
            nodeRef={dragRef}
            handle=".drag-handle"
            disabled={!isDraggable}
            position={window.isMaximized ? { x: 0, y: 0 } : window.position}
            onStart={handleDragStart}
            onStop={handleDragStop}
        >
            <div
                ref={dragRef}
                className={getWindowClass()}
                style={windowStyle}
                onClick={handleWindowClick}
            >
                {/* Window Title Bar */}
                <div className={`window-titlebar drag-handle flex items-center justify-between no-select ${window.isMaximized ? 'rounded-none' : 'rounded-t-2xl'
                    }`}>
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white bg-opacity-10 backdrop-blur-sm">
                            {isIconPath(window.icon) ? (
                                <img
                                    src={window.icon.startsWith('/') ? window.icon : `/${window.icon}`}
                                    alt={window.title}
                                    className="w-5 h-5 object-contain"
                                    style={{
                                        filter: window.icon.endsWith('.svg') ? 'brightness(0) invert(1)' : 'none',
                                        imageRendering: 'crisp-edges'
                                    }}
                                    onError={(e) => {
                                        console.error('Failed to load icon:', window.icon);
                                        // Fallback to emoji if image fails to load
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        const parent = target.parentElement;
                                        if (parent) {
                                            parent.innerHTML = '<span class="text-xl">📄</span>';
                                        }
                                    }}
                                    onLoad={() => {
                                        console.log('Successfully loaded icon:', window.icon);
                                    }}
                                />
                            ) : (
                                <span className="text-xl"></span>
                            )}
                        </div>
                        <span className="font-semibold text-white text-base tracking-wide">{window.title}</span>
                    </div>

                    {/* Window Controls */}
                    <div className="flex items-center space-x-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                minimizeWindow(window.id);
                            }}
                            className="window-control minimize"
                            title="Minimize"
                        >
                            <Minus size={16} className="text-white" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                maximizeWindow(window.id);
                            }}
                            className="window-control maximize"
                            title={window.isMaximized ? "Restore Down" : "Maximize"}
                        >
                            {window.isMaximized ? (
                                <Square size={16} className="text-white" />
                            ) : (
                                <Maximize2 size={16} className="text-white" />
                            )}
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                closeWindow(window.id);
                            }}
                            className="window-control close"
                            title="Close"
                        >
                            <X size={16} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Window Content Area */}
                <div
                    className={`h-full overflow-hidden text-white bg-black bg-opacity-5 backdrop-blur-sm ${window.isMaximized ? 'rounded-none' : 'rounded-b-2xl'
                        }`}
                    style={{
                        height: window.isMaximized
                            ? 'calc(100vh - 128px)'
                            : `${window.size.height - 64}px`
                    }}
                >
                    <div className="h-full p-1">
                        <div className={`h-full bg-black bg-opacity-10 backdrop-blur-sm ${window.isMaximized ? 'rounded-none' : 'rounded-xl'
                            } overflow-hidden`}>
                            {window.id === 'edge' && state.edgeInitialUrl ? (
                                <Component initialUrl={state.edgeInitialUrl} />
                            ) : (
                                <Component />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Draggable>
    );
} 