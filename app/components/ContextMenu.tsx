import React, { useEffect, useRef } from 'react';
import { useOS } from '../context/OSContext';

export default function ContextMenu() {
    const { state, closeContextMenu, toggleTheme, changeWallpaper } = useOS();
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeContextMenu();
            }
        };

        if (state.contextMenu.isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [state.contextMenu.isOpen, closeContextMenu]);

    // Handle Escape key to close menu
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeContextMenu();
            }
        };

        if (state.contextMenu.isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => {
                document.removeEventListener('keydown', handleEscape);
            };
        }
    }, [state.contextMenu.isOpen, closeContextMenu]);

    if (!state.contextMenu.isOpen) {
        return null;
    }

    const menuItems = [
        {
            id: 'view',
            label: 'View',
            icon: '👁️',
            disabled: false,
            submenu: [
                { id: 'refresh', label: 'Refresh', icon: '🔄', action: () => window.location.reload() },
                { id: 'separator1', separator: true },
                { id: 'large-icons', label: 'Large icons', icon: '🔳', action: () => alert('Icon size changed!') },
                { id: 'medium-icons', label: 'Medium icons', icon: '◼️', action: () => alert('Icon size changed!') },
                { id: 'small-icons', label: 'Small icons', icon: '▪️', action: () => alert('Icon size changed!') },
            ]
        },
        {
            id: 'sort',
            label: 'Sort by',
            icon: '🔀',
            disabled: false,
            submenu: [
                { id: 'name', label: 'Name', action: () => alert('Sorted by name!') },
                { id: 'size', label: 'Size', action: () => alert('Sorted by size!') },
                { id: 'date', label: 'Date modified', action: () => alert('Sorted by date!') },
            ]
        },
        { id: 'separator1', separator: true },
        {
            id: 'personalize',
            label: 'Personalize',
            icon: '🎨',
            action: () => {
                closeContextMenu();
                // Could open personalization window
                alert('Personalization settings coming soon! 🎨');
            },
            disabled: false
        },
        {
            id: 'theme',
            label: `Switch to ${state.theme === 'light' ? 'Dark' : 'Light'} mode`,
            icon: state.theme === 'light' ? '🌙' : '☀️',
            action: () => {
                toggleTheme();
                closeContextMenu();
            },
            disabled: false
        },
        { id: 'separator2', separator: true },
        {
            id: 'wallpaper',
            label: 'Change wallpaper',
            icon: '🖼️',
            action: () => {
                const wallpapers = [
                    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                ];
                const randomWallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
                changeWallpaper(randomWallpaper);
                closeContextMenu();
            },
            disabled: false
        },
        { id: 'separator3', separator: true },
        {
            id: 'display-settings',
            label: 'Display settings',
            icon: '📺',
            action: () => {
                closeContextMenu();
                alert('Display settings coming soon! 📺');
            },
            disabled: false
        },
        {
            id: 'about',
            label: 'About Portfolio OS',
            icon: 'ℹ️',
            action: () => {
                closeContextMenu();
                alert('Portfolio OS v2.0 - Built with React & TypeScript 🚀');
            },
            disabled: false
        }
    ];

    // Adjust position to keep menu within viewport
    const adjustPosition = () => {
        if (!menuRef.current) return state.contextMenu.position;

        const rect = menuRef.current.getBoundingClientRect();
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        let { x, y } = state.contextMenu.position;

        // Adjust horizontal position
        if (x + rect.width > viewport.width) {
            x = viewport.width - rect.width - 10;
        }

        // Adjust vertical position
        if (y + rect.height > viewport.height) {
            y = viewport.height - rect.height - 10;
        }

        return { x: Math.max(10, x), y: Math.max(10, y) };
    };

    const position = adjustPosition();

    return (
        <div
            ref={menuRef}
            className="context-menu fixed z-50"
            style={{
                left: position.x,
                top: position.y,
            }}
        >
            {menuItems.map((item) => {
                if (item.separator) {
                    return (
                        <div
                            key={item.id}
                            className="my-2 border-t border-white border-opacity-10"
                        />
                    );
                }

                return (
                    <button
                        key={item.id}
                        onClick={() => {
                            if (!item.disabled && item.action) {
                                item.action();
                            }
                        }}
                        disabled={item.disabled}
                        className="context-menu-item w-full flex items-center space-x-3 text-left group"
                    >
                        <span className="text-base group-hover:scale-110 transition-transform duration-200">
                            {item.icon}
                        </span>
                        <span className="flex-1 font-medium text-sm">
                            {item.label}
                        </span>
                        {item.submenu && (
                            <span className="text-xs opacity-60">▶</span>
                        )}
                    </button>
                );
            })}
        </div>
    );
} 