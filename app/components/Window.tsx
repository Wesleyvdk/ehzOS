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
    const [isMobile, setIsMobile] = useState(false);

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = globalThis.innerWidth <= 768;
            console.log('Mobile detection:', { width: globalThis.innerWidth, isMobile: isMobileDevice });
            setIsMobile(isMobileDevice);
        };
        
        checkMobile();
        globalThis.addEventListener('resize', checkMobile);
        return () => globalThis.removeEventListener('resize', checkMobile);
    }, []);

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

    // Prevent dragging when window is maximized or on mobile
    const isDraggable = !window.isMaximized && !isMobile;

    // Get mobile-friendly dimensions
    const getMobileDimensions = () => {
        if (!isMobile) {
            return {
                width: window.size.width,
                height: window.size.height
            };
        }
        
        // Mobile-specific sizing
        const viewportWidth = globalThis.innerWidth;
        const viewportHeight = globalThis.innerHeight;
        
        return {
            width: Math.min(viewportWidth - 40, 320), // Max 320px width with 20px margin on each side
            height: Math.min(viewportHeight - 140, 500) // Max 500px height with space for taskbar
        };
    };

    const mobileDimensions = getMobileDimensions();
    
    // Debug logging
    console.log('Window render:', { 
        windowId: window.id, 
        isMobile, 
        mobileDimensions, 
        isMaximized: window.isMaximized,
        originalSize: window.size 
    });

    // Window style based on state
    const windowStyle = {
        width: window.isMaximized ? '100vw' : (isMobile ? `${mobileDimensions.width}px` : window.size.width),
        height: window.isMaximized ? 'calc(100vh - 64px)' : (isMobile ? `${mobileDimensions.height}px` : window.size.height),
        zIndex: window.zIndex,
        ...(window.isMaximized ? {
            transform: 'translate(0, 0) !important'
        } : isMobile ? {
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        } : {})
    };

    // Get window CSS class based on state
    const getWindowClass = () => {
        let classes = 'window overflow-hidden ';
        
        // Use fixed positioning for mobile, absolute for desktop
        if (isMobile && !window.isMaximized) {
            classes += 'fixed ';
        } else {
            classes += 'absolute ';
        }

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
                    }`}
                    style={{
                        padding: isMobile ? '8px 12px' : '12px 16px',
                        minHeight: isMobile ? '40px' : '48px'
                    }}>
                    <div className="flex items-center space-x-3">
                        <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} flex items-center justify-center rounded-lg bg-white bg-opacity-10 backdrop-blur-sm`}>
                            {isIconPath(window.icon) ? (
                                <img
                                    src={window.icon.startsWith('/') ? window.icon : `/${window.icon}`}
                                    alt={window.title}
                                    className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} object-contain`}
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
                        <span className={`font-semibold text-white tracking-wide ${isMobile ? 'text-sm' : 'text-base'}`}>{window.title}</span>
                    </div>

                    {/* Window Controls */}
                    <div className={`flex items-center ${isMobile ? 'space-x-0.5' : 'space-x-1'}`}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                minimizeWindow(window.id);
                            }}
                            className="window-control minimize"
                            title="Minimize"
                            style={{
                                width: isMobile ? '28px' : '32px',
                                height: isMobile ? '28px' : '32px'
                            }}
                        >
                            <Minus size={isMobile ? 14 : 16} className="text-white" />
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                maximizeWindow(window.id);
                            }}
                            className="window-control maximize"
                            title={window.isMaximized ? "Restore Down" : "Maximize"}
                            style={{
                                width: isMobile ? '28px' : '32px',
                                height: isMobile ? '28px' : '32px'
                            }}
                        >
                            {window.isMaximized ? (
                                <Square size={isMobile ? 14 : 16} className="text-white" />
                            ) : (
                                <Maximize2 size={isMobile ? 14 : 16} className="text-white" />
                            )}
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                closeWindow(window.id);
                            }}
                            className="window-control close"
                            title="Close"
                            style={{
                                width: isMobile ? '28px' : '32px',
                                height: isMobile ? '28px' : '32px'
                            }}
                        >
                            <X size={isMobile ? 14 : 16} className="text-white" />
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
                            : isMobile 
                                ? `${mobileDimensions.height - (isMobile ? 40 : 64)}px`
                                : `${window.size.height - 64}px`
                    }}
                >
                    <div className={`h-full ${isMobile ? 'p-0.5' : 'p-1'}`}>
                        <div className={`h-full bg-black bg-opacity-10 backdrop-blur-sm ${window.isMaximized ? 'rounded-none' : (isMobile ? 'rounded-lg' : 'rounded-xl')}
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