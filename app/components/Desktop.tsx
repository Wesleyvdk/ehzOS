import React, { useCallback } from 'react';
import { useOS } from '../context/OSContext';
import type { ContextMenuItem } from '../types/os';

export default function Desktop() {
    const { state, openWindow, openContextMenu, closeContextMenu, toggleTheme, changeWallpaper } = useOS();

    // Desktop icons (using Win12 style icons and layout)
    const desktopIcons = [
        {
            id: 'projects-icon',
            title: 'Projects',
            icon: '📁',
            iconPath: '/icon/explorer.svg',
            type: 'folder' as const,
            position: { x: 30, y: 30 },
            action: () => openWindow('projects')
        },
        {
            id: 'resume-icon',
            title: 'Resume.pdf',
            icon: '📄',
            iconPath: '/icon/notepad.svg',
            type: 'file' as const,
            position: { x: 30, y: 120 },
            action: () => openWindow('resume')
        },
        {
            id: 'certificates-icon',
            title: 'Certificates',
            icon: '🏆',
            iconPath: '/icon/about.svg',
            type: 'folder' as const,
            position: { x: 30, y: 210 },
            action: () => openWindow('certificates')
        },
        {
            id: 'blog-icon',
            title: 'Blog',
            icon: '📝',
            iconPath: '/icon/edge.svg',
            type: 'app' as const,
            position: { x: 30, y: 300 },
            action: () => openWindow('blog')
        },
        {
            id: 'about-icon',
            title: 'About Me',
            icon: '👤',
            iconPath: '/icon/about.svg',
            type: 'app' as const,
            position: { x: 30, y: 390 },
            action: () => openWindow('about')
        },
        {
            id: 'contact-icon',
            title: 'Contact',
            icon: '📧',
            iconPath: '/icon/feedback.svg',
            type: 'app' as const,
            position: { x: 30, y: 480 },
            action: () => openWindow('contact')
        }
    ];

    // Handle right-click context menu
    const handleContextMenu = useCallback((e: React.MouseEvent) => {
        e.preventDefault();

        const contextItems: ContextMenuItem[] = [
            {
                id: 'refresh',
                label: 'Refresh',
                icon: '🔄',
                action: () => {
                    closeContextMenu();
                    // Refresh logic
                }
            },
            {
                id: 'separator1',
                label: '',
                separator: true,
                action: () => { }
            },
            {
                id: 'wallpaper',
                label: 'Change Wallpaper',
                icon: '🖼️',
                action: () => {
                    closeContextMenu();
                    // Cycle through wallpapers
                    const wallpapers = [
                        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                    ];
                    const currentIndex = wallpapers.indexOf(state.wallpaper);
                    const nextIndex = (currentIndex + 1) % wallpapers.length;
                    changeWallpaper(wallpapers[nextIndex]);
                }
            },
            {
                id: 'theme',
                label: `Switch to ${state.theme === 'light' ? 'Dark' : 'Light'} Mode`,
                icon: state.theme === 'light' ? '🌙' : '☀️',
                action: () => {
                    closeContextMenu();
                    toggleTheme();
                }
            },
            {
                id: 'separator2',
                label: '',
                separator: true,
                action: () => { }
            },
            {
                id: 'terminal',
                label: 'Open Terminal',
                icon: '💻',
                action: () => {
                    closeContextMenu();
                    openWindow('terminal');
                }
            },
            {
                id: 'settings',
                label: 'Settings',
                icon: '⚙️',
                action: () => {
                    closeContextMenu();
                    openWindow('settings');
                }
            }
        ];

        openContextMenu({ x: e.clientX, y: e.clientY }, contextItems);
    }, [state.wallpaper, state.theme, openContextMenu, closeContextMenu, changeWallpaper, toggleTheme, openWindow]);

    // Handle clicking on desktop (close context menu)
    const handleDesktopClick = useCallback(() => {
        if (state.contextMenu.isOpen) {
            closeContextMenu();
        }
    }, [state.contextMenu.isOpen, closeContextMenu]);

    return (
        <div
            id="desktop"
            className="fixed inset-0 no-select"
            style={{
                background: state.theme === 'dark' ? 'var(--bgul) center' : 'var(--bgul) center',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                color: 'var(--text)',
                userSelect: 'none'
            }}
            onContextMenu={handleContextMenu}
            onClick={handleDesktopClick}
        >
            {/* Desktop Icons - Win12 Style */}
            {desktopIcons.map(icon => (
                <div
                    key={icon.id}
                    className="absolute cursor-pointer select-none"
                    style={{
                        left: icon.position.x,
                        top: icon.position.y,
                        width: '80px',
                        textAlign: 'center',
                        color: 'var(--text)',
                        fontSize: '12px',
                        fontWeight: '500'
                    }}
                    onDoubleClick={(e) => {
                        e.stopPropagation();
                        icon.action();
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--hover)';
                        e.currentTarget.style.borderRadius = '8px';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    {/* Icon Image */}
                    <div className="mb-1 flex items-center justify-center h-12">
                        {icon.iconPath ? (
                            <img
                                src={icon.iconPath}
                                alt={icon.title}
                                className="w-8 h-8"
                                style={{
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                                    transition: 'transform 80ms'
                                }}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.transform = 'scale(0.95)';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            />
                        ) : (
                            <span className="text-2xl">{icon.icon}</span>
                        )}
                    </div>

                    {/* Icon Label */}
                    <div
                        className="leading-tight break-words px-1"
                        style={{
                            textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                            lineHeight: '1.2'
                        }}
                    >
                        {icon.title}
                    </div>
                </div>
            ))}

            {/* Desktop selection area (hidden, for context menu) */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundColor: 'rgba(11,45,14,0)',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            />

            {/* Desktop widgets container */}
            <div id="desktop-widgets" className="absolute inset-0 pointer-events-none">
                {/* Widgets will be rendered here */}
            </div>

            {/* Welcome message for first-time users
            {state.windows.length === 0 && (
                <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div
                        className="p-8 text-center rounded-lg"
                        style={{
                            background: 'var(--bg70)',
                            backdropFilter: 'blur(60px) saturate(3) contrast(0.8)',
                            border: '1.5px solid var(--bd)',
                            boxShadow: '3px 3px 25px 1px var(--sd)'
                        }}
                    >
                        <div className="text-4xl mb-4 animate-bounce-subtle">👋</div>
                        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                            Welcome to Portfolio OS
                        </h1>
                        <p style={{ color: 'var(--text2)' }}>
                            Double-click an icon to get started!
                        </p>
                    </div>
                </div>
            )} */}
        </div>
    );
} 