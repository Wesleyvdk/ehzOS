import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';
import {
    User, Settings, Monitor, Palette, Shield, Wifi, Volume2,
    Bluetooth, Battery, Gamepad2, Accessibility, Globe,
    Clock, MapPin, Search, Home, ChevronRight, Download,
    Smartphone, Printer, Mouse, Keyboard, Camera, Mic
} from 'lucide-react';

interface SettingsCategory {
    id: string;
    label: string;
    icon: React.ReactNode;
    enabled: boolean;
    available: boolean;
}

export default function SettingsApp() {
    const { state, toggleTheme } = useOS();
    const [activeCategory, setActiveCategory] = useState('system');
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            setShowSidebar(!mobile);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const categories: SettingsCategory[] = [
        { id: 'system', label: 'System', icon: <Monitor className="w-5 h-5" />, enabled: true, available: true },
        { id: 'bluetooth', label: 'Bluetooth & devices', icon: <Bluetooth className="w-5 h-5" />, enabled: true, available: true },
        { id: 'network', label: 'Network & internet', icon: <Wifi className="w-5 h-5" />, enabled: true, available: true },
        { id: 'personalization', label: 'Personalization', icon: <Palette className="w-5 h-5" />, enabled: true, available: true },
        { id: 'apps', label: 'Apps', icon: <Settings className="w-5 h-5" />, enabled: true, available: true },
        { id: 'accounts', label: 'Accounts', icon: <User className="w-5 h-5" />, enabled: true, available: true },
        { id: 'time', label: 'Time & language', icon: <Clock className="w-5 h-5" />, enabled: true, available: true },
        { id: 'gaming', label: 'Gaming', icon: <Gamepad2 className="w-5 h-5" />, enabled: true, available: true },
        { id: 'accessibility', label: 'Accessibility', icon: <Accessibility className="w-5 h-5" />, enabled: true, available: true },
        { id: 'privacy', label: 'Privacy & security', icon: <Shield className="w-5 h-5" />, enabled: true, available: true },
        { id: 'update', label: 'Windows Update', icon: <Download className="w-5 h-5" />, enabled: true, available: true }
    ];

    const filteredCategories = categories.filter(category =>
        category.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const SettingCard = ({
        icon,
        title,
        description,
        onClick,
        rightContent
    }: {
        icon: React.ReactNode;
        title: string;
        description?: string;
        onClick?: () => void;
        rightContent?: React.ReactNode;
    }) => (
        <div
            onClick={onClick}
            style={{
                width: '100%',
                color: 'var(--text)',
                background: 'var(--card)',
                marginBottom: isMobile ? '5px' : '7px',
                borderRadius: isMobile ? '6px' : '8px',
                boxShadow: '0 1px 2px 0px var(--shadow)',
                textDecoration: 'none',
                display: 'flex',
                padding: isMobile ? '8px 12px' : '10px 15px',
                justifyContent: 'space-between',
                transition: '100ms',
                border: '2px solid transparent',
                backgroundClip: 'padding-box',
                alignItems: 'center',
                cursor: onClick ? 'pointer' : 'default'
            }}
            onMouseEnter={(e) => {
                if (onClick) {
                    e.currentTarget.style.backgroundColor = 'var(--hover)';
                    e.currentTarget.style.borderColor = 'var(--hover)';
                }
            }}
            onMouseLeave={(e) => {
                if (onClick) {
                    e.currentTarget.style.backgroundColor = 'var(--card)';
                    e.currentTarget.style.borderColor = 'transparent';
                }
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{
                    width: isMobile ? '32px' : '40px',
                    height: isMobile ? '32px' : '40px',
                    borderRadius: isMobile ? '6px' : '8px',
                    background: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: isMobile ? '12px' : '15px',
                    color: 'var(--accent)'
                }}>
                    {icon}
                </div>
                <div>
                    <div style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: '500', marginBottom: '2px' }}>
                        {title}
                    </div>
                    {description && (
                        <div style={{ fontSize: isMobile ? '12px' : '13px', color: 'var(--text-secondary)', lineHeight: '1.3' }}>
                            {description}
                        </div>
                    )}
                </div>
            </div>
            {rightContent && (
                <div style={{ marginLeft: '10px' }}>
                    {rightContent}
                </div>
            )}
        </div>
    );

    const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
        <div
            onClick={() => onChange(!checked)}
            style={{
                width: '40px',
                height: '20px',
                borderRadius: '10px',
                background: checked ? 'var(--accent)' : 'var(--bg-secondary)',
                position: 'relative',
                cursor: 'pointer',
                transition: '200ms'
            }}
        >
            <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: 'white',
                position: 'absolute',
                top: '2px',
                left: checked ? '22px' : '2px',
                transition: '200ms',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }} />
        </div>
    );

    const renderSystemSettings = () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 5px 60px 5px',
            marginBottom: '0',
            borderRadius: '10px',
            width: '100%'
        }}>
            <SettingCard
                icon={<Monitor className="w-5 h-5" />}
                title="Display"
                description="Monitors, brightness, night light, display profile"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Volume2 className="w-5 h-5" />}
                title="Sound"
                description="Volume levels, output, input"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Battery className="w-5 h-5" />}
                title="Power & battery"
                description="Sleep, battery usage, battery saver"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Settings className="w-5 h-5" />}
                title="Storage"
                description="Storage space, drives, configuration rules"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Smartphone className="w-5 h-5" />}
                title="Nearby sharing"
                description="Share with nearby devices using Bluetooth or Wi-Fi"
                rightContent={<Toggle checked={true} onChange={() => { }} />}
            />
            <SettingCard
                icon={<Settings className="w-5 h-5" />}
                title="Multitasking"
                description="Snap windows, desktops, task switching"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Accessibility className="w-5 h-5" />}
                title="Activation"
                description="Activation status, product key, digital license"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Home className="w-5 h-5" />}
                title="About"
                description="Device specifications, ehzOS version, support info"
                onClick={() => {
                    // This would open the About dialog
                    console.log('Opening About dialog');
                }}
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
        </div>
    );

    const renderBluetoothSettings = () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 5px 60px 5px',
            marginBottom: '0',
            borderRadius: '10px',
            width: '100%'
        }}>
            <SettingCard
                icon={<Bluetooth className="w-5 h-5" />}
                title="Bluetooth"
                description="Manage Bluetooth devices"
                rightContent={<Toggle checked={true} onChange={() => { }} />}
            />
            <SettingCard
                icon={<Mouse className="w-5 h-5" />}
                title="Mouse"
                description="Primary button, scrolling, pointer speed"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Keyboard className="w-5 h-5" />}
                title="Keyboard"
                description="Layout, typing, touch keyboard"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Camera className="w-5 h-5" />}
                title="Camera"
                description="Default camera, privacy settings"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Printer className="w-5 h-5" />}
                title="Printers & scanners"
                description="Add printers, default settings"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Smartphone className="w-5 h-5" />}
                title="Phone"
                description="Link your Android or iPhone"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
        </div>
    );

    const renderPersonalizationSettings = () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 5px 60px 5px',
            marginBottom: '0',
            borderRadius: '10px',
            width: '100%'
        }}>
            <SettingCard
                icon={<Palette className="w-5 h-5" />}
                title="Colors"
                description="Accent color, transparency effects"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Monitor className="w-5 h-5" />}
                title="Background"
                description="Browse wallpapers, slideshow, solid colors"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Settings className="w-5 h-5" />}
                title="Themes"
                description="Browse themes, high contrast"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Settings className="w-5 h-5" />}
                title="Lock screen"
                description="Background, apps, timeout"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Settings className="w-5 h-5" />}
                title="Start"
                description="Layout, recently added apps, recommendations"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Settings className="w-5 h-5" />}
                title="Taskbar"
                description="Taskbar items, corner overflow, behaviors"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <div style={{
                background: 'var(--card)',
                borderRadius: isMobile ? '6px' : '8px',
                padding: isMobile ? '12px' : '15px',
                marginBottom: isMobile ? '5px' : '7px',
                boxShadow: '0 1px 2px 0px var(--shadow)'
            }}>
                <div style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: '500', marginBottom: isMobile ? '12px' : '15px' }}>
                    Choose your mode
                </div>
                <div style={{ display: 'flex', gap: isMobile ? '8px' : '10px', flexDirection: isMobile ? 'column' : 'row' }}>
                    <div
                        onClick={() => state.theme !== 'light' && toggleTheme()}
                        style={{
                            flex: 1,
                            padding: isMobile ? '15px' : '20px',
                            borderRadius: isMobile ? '6px' : '8px',
                            background: state.theme === 'light' ? 'var(--accent)' : 'var(--bg-secondary)',
                            color: state.theme === 'light' ? 'white' : 'var(--text)',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: '200ms',
                            border: '2px solid ' + (state.theme === 'light' ? 'var(--accent)' : 'transparent')
                        }}
                    >
                        <div style={{ fontSize: isMobile ? '20px' : '24px', marginBottom: isMobile ? '6px' : '8px' }}>☀️</div>
                        <div style={{ fontWeight: '500', fontSize: isMobile ? '14px' : '16px' }}>Light</div>
                        <div style={{ fontSize: isMobile ? '11px' : '12px', opacity: 0.8 }}>Clean and bright interface</div>
                    </div>
                    <div
                        onClick={() => state.theme !== 'dark' && toggleTheme()}
                        style={{
                            flex: 1,
                            padding: isMobile ? '15px' : '20px',
                            borderRadius: isMobile ? '6px' : '8px',
                            background: state.theme === 'dark' ? 'var(--accent)' : 'var(--bg-secondary)',
                            color: state.theme === 'dark' ? 'white' : 'var(--text)',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: '200ms',
                            border: '2px solid ' + (state.theme === 'dark' ? 'var(--accent)' : 'transparent')
                        }}
                    >
                        <div style={{ fontSize: isMobile ? '20px' : '24px', marginBottom: isMobile ? '6px' : '8px' }}>🌙</div>
                        <div style={{ fontWeight: '500', fontSize: isMobile ? '14px' : '16px' }}>Dark</div>
                        <div style={{ fontSize: isMobile ? '11px' : '12px', opacity: 0.8 }}>Easy on the eyes</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderDefaultSettings = () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 5px 60px 5px',
            marginBottom: '0',
            borderRadius: '10px',
            width: '100%'
        }}>
            <SettingCard
                icon={<Settings className="w-5 h-5" />}
                title="Default apps"
                description="Web browser, email, music player, photo viewer"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Download className="w-5 h-5" />}
                title="Optional features"
                description="Add more features to ehzOS"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Settings className="w-5 h-5" />}
                title="Offline maps"
                description="Download maps for offline use"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Settings className="w-5 h-5" />}
                title="Apps for websites"
                description="Manage website apps"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Settings className="w-5 h-5" />}
                title="Video playback"
                description="Hardware acceleration, video enhancements"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
            <SettingCard
                icon={<Settings className="w-5 h-5" />}
                title="Startup apps"
                description="Choose which apps run at startup"
                rightContent={<ChevronRight className="w-4 h-4" />}
            />
        </div>
    );

    const renderContent = () => {
        switch (activeCategory) {
            case 'system':
                return renderSystemSettings();
            case 'bluetooth':
                return renderBluetoothSettings();
            case 'personalization':
                return renderPersonalizationSettings();
            case 'apps':
                return renderDefaultSettings();
            default:
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '50%',
                        color: 'var(--text-secondary)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</div>
                        <h3>Coming Soon</h3>
                        <p>This settings category is under development.</p>
                    </div>
                );
        }
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            background: 'var(--bg)',
            color: 'var(--text)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative'
        }}>
            {/* Mobile Header */}
            {isMobile && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '50px',
                    background: 'var(--card)',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 15px',
                    zIndex: 1000
                }}>
                    <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text)',
                            fontSize: '18px',
                            cursor: 'pointer',
                            marginRight: '15px'
                        }}
                    >
                        ☰
                    </button>
                    <h1 style={{
                        fontSize: '18px',
                        margin: 0,
                        color: 'var(--text)'
                    }}>
                        {categories.find(cat => cat.id === activeCategory)?.label || 'Settings'}
                    </h1>
                </div>
            )}

            {/* Sidebar Menu */}
            <div style={{
                width: isMobile ? (showSidebar ? '100%' : '0') : '30%',
                minWidth: isMobile ? 'auto' : '280px',
                overflow: 'hidden',
                padding: isMobile ? (showSidebar ? '60px 15px 15px 15px' : '0') : '3px 5px 5px 15px',
                borderRight: isMobile ? 'none' : '1px solid var(--border)',
                position: isMobile ? 'absolute' : 'relative',
                height: isMobile ? '100%' : 'auto',
                background: isMobile ? 'var(--bg)' : 'transparent',
                zIndex: isMobile ? 999 : 'auto',
                transition: 'width 0.3s ease',
                display: isMobile && !showSidebar ? 'none' : 'block'
            }}>
                {/* User Profile */}
                <div style={{
                    display: 'flex',
                    padding: isMobile ? '8px' : '10px 10px',
                    borderRadius: '10px',
                    marginBottom: '10px',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: '200ms'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--hover)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}>
                    <div style={{
                        backgroundColor: 'var(--bg-secondary)',
                        width: isMobile ? '50px' : '60px',
                        minWidth: isMobile ? '50px' : '60px',
                        height: isMobile ? '50px' : '60px',
                        borderRadius: '50%',
                        padding: isMobile ? '9px' : '11px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <User className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                    </div>
                    <div style={{
                        padding: '0px 0 0 10px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        <p style={{
                            fontSize: isMobile ? '16px' : '19px',
                            marginBottom: '-7px',
                            margin: 0
                        }}>
                            ehzOS User
                        </p>
                        <p style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: isMobile ? '13px' : '15px',
                            margin: 0,
                            color: 'var(--text-secondary)'
                        }}>
                            Local Account
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div style={{
                    marginBottom: '20px',
                    position: 'relative'
                }}>
                    <Search className="w-4 h-4" style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-secondary)'
                    }} />
                    <input
                        type="text"
                        placeholder="Find a setting"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 10px 10px 40px',
                            borderRadius: '6px',
                            border: '1px solid var(--border)',
                            background: 'var(--card)',
                            color: 'var(--text)',
                            fontSize: '14px',
                            outline: 'none'
                        }}
                    />
                </div>

                {/* Categories List */}
                <div style={{
                    paddingBottom: '50px',
                    marginLeft: '5px',
                    marginTop: '20px',
                    height: 'calc(100% - 200px)',
                    overflowY: 'auto',
                    paddingRight: '10px',
                    borderRadius: '6px'
                }}>
                    {filteredCategories.map((category) => (
                        <div
                            key={category.id}
                            onClick={() => {
                                if (category.enabled) {
                                    setActiveCategory(category.id);
                                    if (isMobile) {
                                        setShowSidebar(false);
                                    }
                                }
                            }}
                            style={{
                                padding: '5px 10px 5px 20px',
                                fontSize: '15px',
                                display: 'flex',
                                marginBottom: '4px',
                                borderRadius: '6px',
                                cursor: category.enabled ? 'pointer' : 'not-allowed',
                                background: activeCategory === category.id ? 'var(--hover)' : 'transparent',
                                opacity: category.enabled ? (category.available ? 1 : 0.7) : 0.3,
                                filter: category.enabled ? 'none' : 'contrast(0.6) brightness(0.8)',
                                transition: '100ms',
                                alignItems: 'center'
                            }}
                            onMouseEnter={(e) => {
                                if (category.enabled && activeCategory !== category.id) {
                                    e.currentTarget.style.backgroundColor = 'var(--hover-light)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (category.enabled && activeCategory !== category.id) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            <div style={{
                                height: '20px',
                                width: '20px',
                                margin: '1px 10px 0 0',
                                color: 'var(--text-secondary)'
                            }}>
                                {category.icon}
                            </div>
                            <p style={{
                                margin: '5px 7px',
                                color: 'var(--text)'
                            }}>
                                {category.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                flexGrow: 1,
                overflow: 'hidden',
                paddingLeft: isMobile ? '10px' : '15px',
                paddingRight: '5px',
                margin: isMobile ? '50px 0 0 0' : '2px 0 0 0',
                display: isMobile && showSidebar ? 'none' : 'block'
            }}>
                <div style={{
                    overflowY: 'scroll',
                    height: '100%',
                    opacity: 1,
                    transform: 'none',
                    display: 'block'
                }}>
                    <h1 style={{
                        fontSize: isMobile ? '20px' : '29px',
                        padding: isMobile ? '10px 5px' : '10px 5px 10px 5px',
                        display: isMobile ? 'none' : 'block',
                        margin: 0,
                        color: 'var(--text)'
                    }}>
                        {categories.find(cat => cat.id === activeCategory)?.label || 'Settings'}
                    </h1>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}