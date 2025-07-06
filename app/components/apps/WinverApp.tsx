import React, { useState, useEffect } from 'react';
import { Info, History, Monitor, Cpu, HardDrive, Zap, Globe, Code, Star, Users, Award } from 'lucide-react';

interface UpdateLogEntry {
    version: string;
    title: string;
    date: string;
    changes: string[];
}

export default function WinverApp() {
    const [activeSection, setActiveSection] = useState('introduction');
    const [updateLog, setUpdateLog] = useState<UpdateLogEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUpdateLog = async () => {
            try {
                const response = await fetch('/updatelog.json');
                if (response.ok) {
                    const data = await response.json();
                    setUpdateLog(data);
                } else {
                    // Fallback to hardcoded data if JSON file is not found
                    console.warn('Could not load updatelog.json, using fallback data');
                    setUpdateLog([
                        {
                            version: 'v2.2.0',
                            title: 'Real Web Browsing & Edge Enhancement',
                            date: '2025-01-17',
                            changes: [
                                'Implemented real web browsing functionality in Edge app with actual iframe loading',
                                'Added Bing search integration - non-URL inputs automatically search on Bing',
                                'Enhanced URL detection with win12-style regex for proper URL vs search query handling',
                                'Added real navigation history with back/forward functionality per tab',
                                'Implemented proper tab management with loading states and favicon detection',
                                'Added quick links bar with common websites (GitHub, LinkedIn, YouTube, AP Gaming, Treffortly)',
                                'Enhanced link integration - other apps can now open URLs in Edge instead of new browser tabs',
                                'Added proper iframe security with sandbox attributes',
                                'Implemented automatic protocol detection (adds https:// to URLs without protocols)',
                                'Created openEdgeWithUrl() function for seamless app integration'
                            ]
                        }
                    ]);
                }
            } catch (error) {
                console.error('Error loading update log:', error);
                setUpdateLog([]);
            } finally {
                setLoading(false);
            }
        };

        loadUpdateLog();
    }, []);

    const menuItems = [
        { id: 'introduction', label: 'Introduction', icon: <Info className="w-4 h-4" /> },
        { id: 'update-log', label: 'Update Log', icon: <History className="w-4 h-4" /> }
    ];

    const renderIntroduction = () => (
        <div style={{
            padding: '20px',
            color: 'var(--text)'
        }}>
            <h1 style={{
                fontSize: '29px',
                padding: '10px 5px',
                margin: '0 0 20px 0',
                color: 'var(--text)'
            }}>
                <span style={{ color: 'var(--accent)' }}>●</span> About ehzOS Desktop
            </h1>

            <div style={{ marginLeft: '20px' }}>
                <h2 style={{
                    fontSize: '20px',
                    marginBottom: '15px',
                    color: 'var(--text)'
                }}>
                    <span style={{ color: 'var(--accent)' }}>●</span> Introduction
                </h2>
                <p style={{
                    marginBottom: '15px',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)'
                }}>
                    &emsp;&emsp;ehzOS Desktop is a Windows 12-inspired desktop environment built with modern web technologies.
                    This project demonstrates advanced React development and provides a fully functional desktop experience in the browser.
                </p>
                <p style={{
                    marginBottom: '15px',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)'
                }}>
                    &emsp;&emsp;The system features a complete window management system, taskbar, start menu, and various built-in applications
                    that replicate the Windows 12 experience with modern web standards.
                </p>

                <h2 style={{
                    fontSize: '20px',
                    marginBottom: '15px',
                    marginTop: '30px',
                    color: 'var(--text)'
                }}>
                    <span style={{ color: 'var(--accent)' }}>●</span> System Information
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '15px',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        background: 'var(--card)',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <Monitor className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                        <div>
                            <div style={{ color: 'var(--text)', fontWeight: '500' }}>Edition</div>
                            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>ehzOS Desktop</div>
                        </div>
                    </div>
                    <div style={{
                        background: 'var(--card)',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <Cpu className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                        <div>
                            <div style={{ color: 'var(--text)', fontWeight: '500' }}>Version</div>
                            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>2.2.0 (Build 2025.01.17)</div>
                        </div>
                    </div>
                    <div style={{
                        background: 'var(--card)',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <HardDrive className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                        <div>
                            <div style={{ color: 'var(--text)', fontWeight: '500' }}>Engine</div>
                            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>React v18.2.0</div>
                        </div>
                    </div>
                    <div style={{
                        background: 'var(--card)',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <Zap className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                        <div>
                            <div style={{ color: 'var(--text)', fontWeight: '500' }}>Architecture</div>
                            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>x64-based Browser</div>
                        </div>
                    </div>
                </div>

                <h2 style={{
                    fontSize: '20px',
                    marginBottom: '15px',
                    marginTop: '30px',
                    color: 'var(--text)'
                }}>
                    <span style={{ color: 'var(--accent)' }}>●</span> Features
                </h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '10px',
                    marginBottom: '20px'
                }}>
                    {[
                        'Modern UI Design',
                        'Dark/Light Theme',
                        'Responsive Layout',
                        'Multiple Apps',
                        'Window Management',
                        'Task Manager',
                        'File Explorer',
                        'Settings Panel',
                        'Start Menu',
                        'Taskbar',
                        'System Tray',
                        'Desktop Widgets',
                        'Real Web Browsing',
                        'Edge Integration'
                    ].map((feature, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 12px',
                            background: 'var(--card)',
                            borderRadius: '6px',
                            border: '1px solid var(--border)'
                        }}>
                            <div style={{
                                width: '6px',
                                height: '6px',
                                background: 'var(--accent)',
                                borderRadius: '50%'
                            }}></div>
                            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>

                <h2 style={{
                    fontSize: '20px',
                    marginBottom: '15px',
                    marginTop: '30px',
                    color: 'var(--text)'
                }}>
                    <span style={{ color: 'var(--accent)' }}>●</span> Copyright & License
                </h2>
                <p style={{
                    marginBottom: '15px',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)'
                }}>
                    &emsp;&emsp;© 2025 ehz. All rights reserved.
                </p>
                <p style={{
                    marginBottom: '15px',
                    lineHeight: '1.6',
                    color: 'var(--text-secondary)'
                }}>
                    &emsp;&emsp;Built with React, TypeScript, and modern web technologies.
                    This project is open source and available for educational purposes.
                </p>
            </div>
        </div>
    );

    const renderUpdateLog = () => (
        <div style={{
            padding: '20px',
            color: 'var(--text)'
        }}>
            <h1 style={{
                fontSize: '29px',
                padding: '10px 5px',
                margin: '0 0 20px 0',
                color: 'var(--text)'
            }}>
                <span style={{ color: 'var(--accent)' }}>●</span> Update Log
            </h1>

            <div style={{ marginLeft: '20px' }}>
                {loading ? (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '40px',
                        color: 'var(--text-secondary)'
                    }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            border: '2px solid var(--border)',
                            borderTop: '2px solid var(--accent)',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginRight: '10px'
                        }}></div>
                        Loading update log...
                    </div>
                ) : updateLog.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        color: 'var(--text-secondary)'
                    }}>
                        No update log available
                    </div>
                ) : (
                    updateLog.map((update, index) => (
                        <details key={index} style={{ marginBottom: '10px' }}>
                            <summary style={{
                                cursor: 'pointer',
                                padding: '10px',
                                background: 'var(--card)',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                marginBottom: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: '100ms'
                            }}>
                                <span style={{
                                    color: 'var(--accent)',
                                    fontWeight: '600'
                                }}>
                                    {update.version}
                                </span>
                                <span style={{ color: 'var(--text)' }}>
                                    {update.title}
                                </span>
                                <span style={{
                                    marginLeft: 'auto',
                                    fontSize: '12px',
                                    color: 'var(--text-secondary)'
                                }}>
                                    {update.date}
                                </span>
                            </summary>
                            <div style={{
                                background: 'var(--bg-secondary)',
                                padding: '15px',
                                borderRadius: '8px',
                                border: '1px solid var(--border)',
                                marginTop: '5px'
                            }}>
                                {update.changes.map((change, changeIndex) => (
                                    <p key={changeIndex} style={{
                                        margin: '5px 0',
                                        fontSize: '14px',
                                        color: 'var(--text-secondary)',
                                        lineHeight: '1.5'
                                    }}>
                                        &emsp;&emsp;- {change}
                                    </p>
                                ))}
                            </div>
                        </details>
                    ))
                )}

                <div style={{
                    textAlign: 'center',
                    marginTop: '20px'
                }}>
                    <a
                        href="https://github.com/ehz/OSPortfolio/commits/main"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: 'var(--accent)',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        View all commits on GitHub
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            background: 'var(--bg)',
            color: 'var(--text)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Sidebar Menu */}
            <div style={{
                width: '280px',
                minWidth: '280px',
                height: '100%',
                overflowY: 'auto',
                marginRight: '6px',
                paddingRight: '2px',
                padding: '15px 5px 5px 15px'
            }}>
                <div style={{
                    margin: '10px 0',
                    borderRadius: '8px',
                    background: 'var(--card)',
                    padding: '4px',
                    boxShadow: '0 1px 3px var(--shadow)'
                }}>
                    <div style={{
                        padding: '6px 10px',
                        fontWeight: '550',
                        fontSize: '14px',
                        color: 'var(--text-secondary)'
                    }}>
                        Navigation
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                style={{
                                    padding: '8px 20px',
                                    fontSize: '15px',
                                    borderRadius: '7px',
                                    transition: '100ms',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    height: '35px',
                                    border: 'none',
                                    background: activeSection === item.id ? 'var(--hover)' : 'transparent',
                                    color: 'var(--text)',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeSection !== item.id) {
                                        e.currentTarget.style.backgroundColor = 'var(--hover-light)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeSection !== item.id) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                flex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                paddingLeft: '2px'
            }}>
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    background: 'var(--bg-secondary)',
                    borderRadius: '8px',
                    margin: '10px 15px 10px 0',
                    boxShadow: '0 1px 3px var(--shadow)'
                }}>
                    <div style={{
                        opacity: activeSection === 'introduction' ? 1 : 0,
                        height: activeSection === 'introduction' ? 'auto' : 0,
                        overflow: activeSection === 'introduction' ? 'visible' : 'hidden',
                        transition: 'opacity 300ms 50ms',
                        display: activeSection === 'introduction' ? 'block' : 'none'
                    }}>
                        {renderIntroduction()}
                    </div>
                    <div style={{
                        opacity: activeSection === 'update-log' ? 1 : 0,
                        height: activeSection === 'update-log' ? 'auto' : 0,
                        overflow: activeSection === 'update-log' ? 'visible' : 'hidden',
                        transition: 'opacity 300ms 50ms',
                        display: activeSection === 'update-log' ? 'block' : 'none'
                    }}>
                        {renderUpdateLog()}
                    </div>
                </div>
            </div>
        </div>
    );
} 