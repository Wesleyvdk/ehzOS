import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, Wifi, Activity, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

interface Process {
    id: string;
    name: string;
    pid: number;
    cpu: number;
    memory: number;
    disk: number;
    network: number;
    power: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';
    icon: string;
    type: 'App' | 'Background process' | 'Windows process';
}

interface PerformanceData {
    cpu: number;
    memory: { used: number; total: number };
    disk: { usage: number; read: number; write: number };
    network: { send: number; receive: number };
    gpu: { usage: number; memory: number };
}

export default function TaskManagerApp() {
    const [activeTab, setActiveTab] = useState('processes');
    const [processes, setProcesses] = useState<Process[]>([]);
    const [performanceData, setPerformanceData] = useState<PerformanceData>({
        cpu: 0,
        memory: { used: 0, total: 16 },
        disk: { usage: 0, read: 0, write: 0 },
        network: { send: 0, receive: 0 },
        gpu: { usage: 0, memory: 0 }
    });
    const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [sortBy, setSortBy] = useState<'name' | 'cpu' | 'memory' | 'disk' | 'network' | 'power'>('cpu');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const generateProcesses = () => {
        const processNames = [
            { name: 'System', icon: '🔧', type: 'Windows process' as const },
            { name: 'Registry', icon: '📋', type: 'Windows process' as const },
            { name: 'winlogon.exe', icon: '🔐', type: 'Windows process' as const },
            { name: 'csrss.exe', icon: '⚙️', type: 'Windows process' as const },
            { name: 'wininit.exe', icon: '🔧', type: 'Windows process' as const },
            { name: 'services.exe', icon: '🔧', type: 'Windows process' as const },
            { name: 'lsass.exe', icon: '🔐', type: 'Windows process' as const },
            { name: 'svchost.exe', icon: '🔧', type: 'Windows process' as const },
            { name: 'dwm.exe', icon: '🖼️', type: 'Windows process' as const },
            { name: 'explorer.exe', icon: '📁', type: 'Windows process' as const },
            { name: 'ehzOS Desktop', icon: '🖥️', type: 'App' as const },
            { name: 'Google Chrome', icon: '🌐', type: 'App' as const },
            { name: 'Visual Studio Code', icon: '💻', type: 'App' as const },
            { name: 'Discord', icon: '💬', type: 'App' as const },
            { name: 'Spotify', icon: '🎵', type: 'App' as const },
            { name: 'Steam', icon: '🎮', type: 'App' as const },
            { name: 'Windows Security', icon: '🛡️', type: 'Background process' as const },
            { name: 'Windows Update', icon: '⬇️', type: 'Background process' as const },
            { name: 'Audio Service', icon: '🔊', type: 'Background process' as const },
            { name: 'Print Spooler', icon: '🖨️', type: 'Background process' as const },
            { name: 'Task Scheduler', icon: '⏰', type: 'Background process' as const },
            { name: 'Network Service', icon: '🌐', type: 'Background process' as const }
        ];

        const powerLevels: Process['power'][] = ['Very Low', 'Low', 'Moderate', 'High', 'Very High'];

        return processNames.map((proc, index) => ({
            id: `proc-${index}`,
            name: proc.name,
            pid: 1000 + index * 4,
            cpu: Number((Math.random() * 100).toFixed(1)),
            memory: Number((Math.random() * 2000).toFixed(0)),
            disk: Number((Math.random() * 100).toFixed(1)),
            network: Number((Math.random() * 1000).toFixed(0)),
            power: powerLevels[Math.floor(Math.random() * powerLevels.length)],
            icon: proc.icon,
            type: proc.type
        }));
    };

    const updatePerformanceData = () => {
        setPerformanceData(prev => ({
            cpu: Number((Math.random() * 100).toFixed(1)),
            memory: {
                used: Number((Math.random() * 12 + 4).toFixed(1)),
                total: 16
            },
            disk: {
                usage: Number((Math.random() * 100).toFixed(1)),
                read: Number((Math.random() * 100).toFixed(1)),
                write: Number((Math.random() * 50).toFixed(1))
            },
            network: {
                send: Number((Math.random() * 10).toFixed(2)),
                receive: Number((Math.random() * 50).toFixed(2))
            },
            gpu: {
                usage: Number((Math.random() * 100).toFixed(1)),
                memory: Number((Math.random() * 4).toFixed(1))
            }
        }));
    };

    useEffect(() => {
        setProcesses(generateProcesses());
        const interval = setInterval(() => {
            setProcesses(generateProcesses());
            updatePerformanceData();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const sortedProcesses = [...processes].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === 'name') {
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
        }

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const handleSort = (column: typeof sortBy) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('desc');
        }
    };

    const getPowerColor = (power: Process['power']) => {
        switch (power) {
            case 'Very Low': return '#4caf50';
            case 'Low': return '#8bc34a';
            case 'Moderate': return '#ffc107';
            case 'High': return '#ff9800';
            case 'Very High': return '#f44336';
            default: return '#9e9e9e';
        }
    };

    const menuItems = [
        { id: 'processes', label: 'Processes', icon: '📋' },
        { id: 'performance', label: 'Performance', icon: '📊' },
        { id: 'app-history', label: 'App history', icon: '📈' },
        { id: 'startup', label: 'Startup', icon: '🚀' },
        { id: 'users', label: 'Users', icon: '👥' },
        { id: 'details', label: 'Details', icon: '🔍' },
        { id: 'services', label: 'Services', icon: '⚙️' }
    ];

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: isMenuCollapsed ? '60px auto' : '280px auto',
            transition: 'grid-template-columns 200ms',
            background: 'var(--bg)',
            color: 'var(--text)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Sidebar Menu */}
            <div style={{
                background: 'var(--bg)',
                borderRight: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}>
                <div style={{
                    margin: '0px 15px 0px 5px',
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            style={{
                                padding: '5px 20px',
                                fontSize: '15px',
                                display: 'flex',
                                gap: '10px',
                                marginBottom: '3px',
                                overflow: 'hidden',
                                background: activeTab === item.id ? 'var(--hover)' : 'transparent',
                                border: 'none',
                                borderRadius: '7px',
                                color: 'var(--text)',
                                cursor: 'pointer',
                                textAlign: 'left',
                                alignItems: 'center',
                                transition: 'background-color 100ms, transform 400ms cubic-bezier(0.14, 1.02, 0.17, 0.03)'
                            }}
                            onMouseEnter={(e) => {
                                if (activeTab !== item.id) {
                                    e.currentTarget.style.background = 'var(--hover-light)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeTab !== item.id) {
                                    e.currentTarget.style.background = 'transparent';
                                }
                            }}
                            onMouseDown={(e) => {
                                e.currentTarget.style.transform = 'scale(0.95)';
                            }}
                            onMouseUp={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            <span style={{ fontSize: '16px', minWidth: '20px' }}>{item.icon}</span>
                            {!isMenuCollapsed && <span>{item.label}</span>}
                        </button>
                    ))}

                    {/* Collapse Button */}
                    <button
                        onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
                        style={{
                            padding: '5px 20px',
                            marginLeft: '5px',
                            display: 'block',
                            borderRadius: '7px',
                            maxWidth: isMenuCollapsed ? '40px' : '58px',
                            marginBottom: '3px',
                            marginTop: 'auto',
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text)',
                            cursor: 'pointer',
                            fontSize: '16px',
                            transition: 'background-color 80ms, transform 400ms cubic-bezier(0.14, 1.02, 0.17, 0.03)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--hover-light)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = 'scale(0.93)';
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        {isMenuCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                maxHeight: '100%',
                minHeight: '0px',
                background: 'var(--bg-secondary)',
                padding: '15px',
                borderRadius: '10px 0px 0px 0px',
                overflow: 'hidden'
            }}>
                {activeTab === 'processes' && (
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}>
                        <h2 style={{
                            fontSize: '1.2em',
                            marginBottom: '15px',
                            color: 'var(--text)'
                        }}>
                            Processes
                        </h2>

                        <div style={{
                            flex: 1,
                            overflow: 'auto',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            background: 'var(--card)'
                        }}>
                            <table style={{
                                width: '100%',
                                borderSpacing: '0px',
                                tableLayout: 'fixed'
                            }}>
                                <thead>
                                    <tr>
                                        <th
                                            onClick={() => handleSort('name')}
                                            style={{
                                                fontWeight: 'normal',
                                                fontSize: '0.78em',
                                                verticalAlign: 'bottom',
                                                borderRight: '1px solid var(--border)',
                                                borderBottom: '1px solid var(--border)',
                                                color: 'var(--text-secondary)',
                                                padding: '8px 10px',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                background: 'var(--bg-secondary)',
                                                position: 'sticky',
                                                top: 0,
                                                zIndex: 1,
                                                transition: 'background-color 80ms'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--hover)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'var(--bg-secondary)';
                                            }}
                                        >
                                            Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th
                                            onClick={() => handleSort('cpu')}
                                            style={{
                                                fontWeight: 'normal',
                                                fontSize: '0.78em',
                                                verticalAlign: 'bottom',
                                                borderRight: '1px solid var(--border)',
                                                borderBottom: '1px solid var(--border)',
                                                color: 'var(--text-secondary)',
                                                padding: '8px 10px',
                                                textAlign: 'right',
                                                width: '95px',
                                                cursor: 'pointer',
                                                background: 'var(--bg-secondary)',
                                                position: 'sticky',
                                                top: 0,
                                                zIndex: 1,
                                                transition: 'background-color 80ms'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--hover)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'var(--bg-secondary)';
                                            }}
                                        >
                                            CPU {sortBy === 'cpu' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th
                                            onClick={() => handleSort('memory')}
                                            style={{
                                                fontWeight: 'normal',
                                                fontSize: '0.78em',
                                                verticalAlign: 'bottom',
                                                borderRight: '1px solid var(--border)',
                                                borderBottom: '1px solid var(--border)',
                                                color: 'var(--text-secondary)',
                                                padding: '8px 10px',
                                                textAlign: 'right',
                                                width: '95px',
                                                cursor: 'pointer',
                                                background: 'var(--bg-secondary)',
                                                position: 'sticky',
                                                top: 0,
                                                zIndex: 1,
                                                transition: 'background-color 80ms'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--hover)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'var(--bg-secondary)';
                                            }}
                                        >
                                            Memory {sortBy === 'memory' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th
                                            onClick={() => handleSort('disk')}
                                            style={{
                                                fontWeight: 'normal',
                                                fontSize: '0.78em',
                                                verticalAlign: 'bottom',
                                                borderRight: '1px solid var(--border)',
                                                borderBottom: '1px solid var(--border)',
                                                color: 'var(--text-secondary)',
                                                padding: '8px 10px',
                                                textAlign: 'right',
                                                width: '95px',
                                                cursor: 'pointer',
                                                background: 'var(--bg-secondary)',
                                                position: 'sticky',
                                                top: 0,
                                                zIndex: 1,
                                                transition: 'background-color 80ms'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--hover)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'var(--bg-secondary)';
                                            }}
                                        >
                                            Disk {sortBy === 'disk' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th
                                            onClick={() => handleSort('network')}
                                            style={{
                                                fontWeight: 'normal',
                                                fontSize: '0.78em',
                                                verticalAlign: 'bottom',
                                                borderRight: '1px solid var(--border)',
                                                borderBottom: '1px solid var(--border)',
                                                color: 'var(--text-secondary)',
                                                padding: '8px 10px',
                                                textAlign: 'right',
                                                width: '95px',
                                                cursor: 'pointer',
                                                background: 'var(--bg-secondary)',
                                                position: 'sticky',
                                                top: 0,
                                                zIndex: 1,
                                                transition: 'background-color 80ms'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--hover)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'var(--bg-secondary)';
                                            }}
                                        >
                                            Network {sortBy === 'network' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </th>
                                        <th
                                            onClick={() => handleSort('power')}
                                            style={{
                                                fontWeight: 'normal',
                                                fontSize: '0.78em',
                                                verticalAlign: 'bottom',
                                                borderBottom: '1px solid var(--border)',
                                                color: 'var(--text-secondary)',
                                                padding: '8px 10px',
                                                textAlign: 'right',
                                                width: '120px',
                                                cursor: 'pointer',
                                                background: 'var(--bg-secondary)',
                                                position: 'sticky',
                                                top: 0,
                                                zIndex: 1,
                                                transition: 'background-color 80ms'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--hover)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'var(--bg-secondary)';
                                            }}
                                        >
                                            Power usage {sortBy === 'power' && (sortOrder === 'asc' ? '↑' : '↓')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedProcesses.map((process) => (
                                        <tr
                                            key={process.id}
                                            onClick={() => setSelectedProcess(process.id)}
                                            style={{
                                                background: selectedProcess === process.id ? 'var(--hover)' : 'transparent',
                                                cursor: 'pointer',
                                                transition: 'background-color 200ms'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (selectedProcess !== process.id) {
                                                    e.currentTarget.style.background = 'var(--hover-light)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (selectedProcess !== process.id) {
                                                    e.currentTarget.style.background = 'transparent';
                                                }
                                            }}
                                        >
                                            <td style={{
                                                borderRight: '1px solid var(--border)',
                                                padding: '4px 10px',
                                                height: '25px',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                <span style={{
                                                    fontSize: '16px',
                                                    marginRight: '8px',
                                                    width: '21px',
                                                    height: '21px',
                                                    display: 'inline-block',
                                                    textAlign: 'center'
                                                }}>
                                                    {process.icon}
                                                </span>
                                                <span style={{
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    color: 'var(--text)'
                                                }}>
                                                    {process.name}
                                                </span>
                                            </td>
                                            <td style={{
                                                borderRight: '1px solid var(--border)',
                                                padding: '4px 10px',
                                                height: '25px',
                                                textAlign: 'right',
                                                color: 'var(--text)'
                                            }}>
                                                {process.cpu}%
                                            </td>
                                            <td style={{
                                                borderRight: '1px solid var(--border)',
                                                padding: '4px 10px',
                                                height: '25px',
                                                textAlign: 'right',
                                                color: 'var(--text)'
                                            }}>
                                                {process.memory} MB
                                            </td>
                                            <td style={{
                                                borderRight: '1px solid var(--border)',
                                                padding: '4px 10px',
                                                height: '25px',
                                                textAlign: 'right',
                                                color: 'var(--text)'
                                            }}>
                                                {process.disk}%
                                            </td>
                                            <td style={{
                                                borderRight: '1px solid var(--border)',
                                                padding: '4px 10px',
                                                height: '25px',
                                                textAlign: 'right',
                                                color: 'var(--text)'
                                            }}>
                                                {process.network} KB/s
                                            </td>
                                            <td style={{
                                                padding: '4px 10px',
                                                height: '25px',
                                                textAlign: 'right'
                                            }}>
                                                <span style={{
                                                    color: getPowerColor(process.power),
                                                    fontWeight: '500'
                                                }}>
                                                    {process.power}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'performance' && (
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}>
                        <h2 style={{
                            fontSize: '1.2em',
                            marginBottom: '15px',
                            color: 'var(--text)'
                        }}>
                            Performance
                        </h2>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '320px auto',
                            gap: '20px',
                            height: '100%',
                            minHeight: '0px'
                        }}>
                            {/* Left sidebar with performance metrics */}
                            <div style={{
                                maxHeight: '100%',
                                overflow: 'auto',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}>
                                {/* CPU Card */}
                                <div style={{
                                    background: 'var(--card)',
                                    borderRadius: '10px',
                                    padding: '12px',
                                    border: '1px solid var(--border)',
                                    display: 'grid',
                                    gridTemplateColumns: '120px auto',
                                    gap: '10px',
                                    cursor: 'pointer',
                                    transition: 'background-color 80ms, transform 400ms cubic-bezier(0.14, 1.02, 0.17, 0.03)'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--hover-light)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--card)';
                                    }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.transform = 'scale(0.95)';
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <div style={{
                                        height: '80px',
                                        width: '100%',
                                        border: '1px solid #2983cc',
                                        borderRadius: '4px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        background: 'var(--bg-secondary)'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: `${performanceData.cpu}%`,
                                            height: '100%',
                                            background: 'linear-gradient(to top, #2983cc, #2983cc88)',
                                            transition: 'width 1s ease'
                                        }} />
                                    </div>
                                    <div>
                                        <div style={{
                                            fontSize: '1.4em',
                                            fontWeight: '300',
                                            color: 'var(--text)',
                                            marginBottom: '5px'
                                        }}>
                                            CPU
                                        </div>
                                        <div style={{
                                            fontSize: '0.9em',
                                            color: 'var(--text-secondary)',
                                            lineHeight: '1.2'
                                        }}>
                                            {performanceData.cpu}%<br />
                                            3.2 GHz
                                        </div>
                                    </div>
                                </div>

                                {/* Memory Card */}
                                <div style={{
                                    background: 'var(--card)',
                                    borderRadius: '10px',
                                    padding: '12px',
                                    border: '1px solid var(--border)',
                                    display: 'grid',
                                    gridTemplateColumns: '120px auto',
                                    gap: '10px',
                                    cursor: 'pointer',
                                    transition: 'background-color 80ms, transform 400ms cubic-bezier(0.14, 1.02, 0.17, 0.03)'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--hover-light)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--card)';
                                    }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.transform = 'scale(0.95)';
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <div style={{
                                        height: '80px',
                                        width: '100%',
                                        border: '1px solid #660099',
                                        borderRadius: '4px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        background: 'var(--bg-secondary)'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: `${(performanceData.memory.used / performanceData.memory.total) * 100}%`,
                                            height: '100%',
                                            background: 'linear-gradient(to top, #660099, #66009988)',
                                            transition: 'width 1s ease'
                                        }} />
                                    </div>
                                    <div>
                                        <div style={{
                                            fontSize: '1.4em',
                                            fontWeight: '300',
                                            color: 'var(--text)',
                                            marginBottom: '5px'
                                        }}>
                                            Memory
                                        </div>
                                        <div style={{
                                            fontSize: '0.9em',
                                            color: 'var(--text-secondary)',
                                            lineHeight: '1.2'
                                        }}>
                                            {((performanceData.memory.used / performanceData.memory.total) * 100).toFixed(0)}%<br />
                                            {performanceData.memory.used.toFixed(1)} / {performanceData.memory.total} GB
                                        </div>
                                    </div>
                                </div>

                                {/* Disk Card */}
                                <div style={{
                                    background: 'var(--card)',
                                    borderRadius: '10px',
                                    padding: '12px',
                                    border: '1px solid var(--border)',
                                    display: 'grid',
                                    gridTemplateColumns: '120px auto',
                                    gap: '10px',
                                    cursor: 'pointer',
                                    transition: 'background-color 80ms, transform 400ms cubic-bezier(0.14, 1.02, 0.17, 0.03)'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--hover-light)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--card)';
                                    }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.transform = 'scale(0.95)';
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <div style={{
                                        height: '80px',
                                        width: '100%',
                                        border: '1px solid #008000',
                                        borderRadius: '4px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        background: 'var(--bg-secondary)'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: `${performanceData.disk.usage}%`,
                                            height: '100%',
                                            background: 'linear-gradient(to top, #008000, #00800088)',
                                            transition: 'width 1s ease'
                                        }} />
                                    </div>
                                    <div>
                                        <div style={{
                                            fontSize: '1.4em',
                                            fontWeight: '300',
                                            color: 'var(--text)',
                                            marginBottom: '5px'
                                        }}>
                                            Disk
                                        </div>
                                        <div style={{
                                            fontSize: '0.9em',
                                            color: 'var(--text-secondary)',
                                            lineHeight: '1.2'
                                        }}>
                                            {performanceData.disk.usage}%<br />
                                            {performanceData.disk.read} MB/s
                                        </div>
                                    </div>
                                </div>

                                {/* Network Card */}
                                <div style={{
                                    background: 'var(--card)',
                                    borderRadius: '10px',
                                    padding: '12px',
                                    border: '1px solid var(--border)',
                                    display: 'grid',
                                    gridTemplateColumns: '120px auto',
                                    gap: '10px',
                                    cursor: 'pointer',
                                    transition: 'background-color 80ms, transform 400ms cubic-bezier(0.14, 1.02, 0.17, 0.03)'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--hover-light)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'var(--card)';
                                    }}
                                    onMouseDown={(e) => {
                                        e.currentTarget.style.transform = 'scale(0.95)';
                                    }}
                                    onMouseUp={(e) => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                >
                                    <div style={{
                                        height: '80px',
                                        width: '100%',
                                        border: '1px solid #8e5829',
                                        borderRadius: '4px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        background: 'var(--bg-secondary)'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: `${Math.min(performanceData.network.receive * 2, 100)}%`,
                                            height: '100%',
                                            background: 'linear-gradient(to top, #8e5829, #8e582988)',
                                            transition: 'width 1s ease'
                                        }} />
                                    </div>
                                    <div>
                                        <div style={{
                                            fontSize: '1.4em',
                                            fontWeight: '300',
                                            color: 'var(--text)',
                                            marginBottom: '5px'
                                        }}>
                                            Network
                                        </div>
                                        <div style={{
                                            fontSize: '0.9em',
                                            color: 'var(--text-secondary)',
                                            lineHeight: '1.2'
                                        }}>
                                            {performanceData.network.receive} Mbps<br />
                                            Send: {performanceData.network.send} Mbps
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right side - detailed performance graph */}
                            <div style={{
                                maxHeight: '100%',
                                overflow: 'auto',
                                background: 'var(--card)',
                                borderRadius: '8px',
                                padding: '20px',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '20px'
                                }}>
                                    <h3 style={{
                                        fontSize: '2em',
                                        fontWeight: '300',
                                        color: 'var(--text)',
                                        margin: 0
                                    }}>
                                        CPU
                                    </h3>
                                    <div style={{
                                        fontSize: '1.2em',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        {performanceData.cpu}%
                                    </div>
                                </div>

                                <div style={{
                                    height: '200px',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: '8px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    marginBottom: '20px'
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: `${performanceData.cpu}%`,
                                        height: '100%',
                                        background: 'linear-gradient(to top, #2983cc, #2983cc44)',
                                        transition: 'width 1s ease'
                                    }} />
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'auto 300px',
                                    gap: '20px',
                                    fontSize: '0.85em'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '15px',
                                        alignItems: 'flex-start'
                                    }}>
                                        <div>
                                            <div style={{
                                                fontSize: '0.8em',
                                                color: 'var(--text-secondary)',
                                                marginBottom: '5px'
                                            }}>
                                                Utilization
                                            </div>
                                            <div style={{
                                                fontSize: '1.44em',
                                                color: 'var(--text)'
                                            }}>
                                                {performanceData.cpu}%
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{
                                                fontSize: '0.8em',
                                                color: 'var(--text-secondary)',
                                                marginBottom: '5px'
                                            }}>
                                                Speed
                                            </div>
                                            <div style={{
                                                fontSize: '1.44em',
                                                color: 'var(--text)'
                                            }}>
                                                3.2 GHz
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{
                                                fontSize: '0.8em',
                                                color: 'var(--text-secondary)',
                                                marginBottom: '5px'
                                            }}>
                                                Processes
                                            </div>
                                            <div style={{
                                                fontSize: '1.44em',
                                                color: 'var(--text)'
                                            }}>
                                                {processes.length}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <table style={{ width: '100%', borderSpacing: '0 8px' }}>
                                            <tbody>
                                                <tr>
                                                    <td style={{
                                                        color: 'var(--text-secondary)',
                                                        paddingRight: '20px'
                                                    }}>
                                                        Threads
                                                    </td>
                                                    <td style={{ color: 'var(--text)' }}>
                                                        {processes.length * 2}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{
                                                        color: 'var(--text-secondary)',
                                                        paddingRight: '20px'
                                                    }}>
                                                        Handles
                                                    </td>
                                                    <td style={{ color: 'var(--text)' }}>
                                                        {(processes.length * 50).toLocaleString()}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{
                                                        color: 'var(--text-secondary)',
                                                        paddingRight: '20px'
                                                    }}>
                                                        Up time
                                                    </td>
                                                    <td style={{ color: 'var(--text)' }}>
                                                        2:34:17
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'startup' && (
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}>
                        <h2 style={{
                            fontSize: '1.2em',
                            marginBottom: '15px',
                            color: 'var(--text)'
                        }}>
                            Startup apps
                        </h2>

                        <div style={{
                            flex: 1,
                            overflow: 'auto',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            background: 'var(--card)'
                        }}>
                            <table style={{
                                width: '100%',
                                borderSpacing: '0px'
                            }}>
                                <thead>
                                    <tr>
                                        <th style={{
                                            fontWeight: 'normal',
                                            fontSize: '0.78em',
                                            borderRight: '1px solid var(--border)',
                                            borderBottom: '1px solid var(--border)',
                                            color: 'var(--text-secondary)',
                                            padding: '8px 10px',
                                            textAlign: 'left',
                                            background: 'var(--bg-secondary)',
                                            position: 'sticky',
                                            top: 0
                                        }}>
                                            Name
                                        </th>
                                        <th style={{
                                            fontWeight: 'normal',
                                            fontSize: '0.78em',
                                            borderRight: '1px solid var(--border)',
                                            borderBottom: '1px solid var(--border)',
                                            color: 'var(--text-secondary)',
                                            padding: '8px 10px',
                                            textAlign: 'left',
                                            background: 'var(--bg-secondary)',
                                            position: 'sticky',
                                            top: 0
                                        }}>
                                            Publisher
                                        </th>
                                        <th style={{
                                            fontWeight: 'normal',
                                            fontSize: '0.78em',
                                            borderRight: '1px solid var(--border)',
                                            borderBottom: '1px solid var(--border)',
                                            color: 'var(--text-secondary)',
                                            padding: '8px 10px',
                                            textAlign: 'left',
                                            background: 'var(--bg-secondary)',
                                            position: 'sticky',
                                            top: 0
                                        }}>
                                            Status
                                        </th>
                                        <th style={{
                                            fontWeight: 'normal',
                                            fontSize: '0.78em',
                                            borderBottom: '1px solid var(--border)',
                                            color: 'var(--text-secondary)',
                                            padding: '8px 10px',
                                            textAlign: 'left',
                                            background: 'var(--bg-secondary)',
                                            position: 'sticky',
                                            top: 0
                                        }}>
                                            Startup impact
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'ehzOS Desktop', publisher: 'ehzOS', status: 'Enabled', impact: 'High' },
                                        { name: 'Windows Security', publisher: 'Microsoft Corporation', status: 'Enabled', impact: 'Low' },
                                        { name: 'Steam', publisher: 'Valve Corporation', status: 'Enabled', impact: 'High' },
                                        { name: 'Discord', publisher: 'Discord Inc.', status: 'Enabled', impact: 'Medium' },
                                        { name: 'Spotify', publisher: 'Spotify AB', status: 'Disabled', impact: 'Medium' },
                                        { name: 'Adobe Updater', publisher: 'Adobe', status: 'Enabled', impact: 'Low' },
                                        { name: 'NVIDIA GeForce Experience', publisher: 'NVIDIA Corporation', status: 'Enabled', impact: 'Medium' },
                                        { name: 'Skype', publisher: 'Microsoft Corporation', status: 'Disabled', impact: 'Low' }
                                    ].map((app, index) => (
                                        <tr key={index} style={{
                                            transition: 'background-color 200ms'
                                        }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = 'var(--hover-light)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent';
                                            }}>
                                            <td style={{
                                                borderRight: '1px solid var(--border)',
                                                padding: '8px 10px',
                                                color: 'var(--text)'
                                            }}>
                                                {app.name}
                                            </td>
                                            <td style={{
                                                borderRight: '1px solid var(--border)',
                                                padding: '8px 10px',
                                                color: 'var(--text-secondary)'
                                            }}>
                                                {app.publisher}
                                            </td>
                                            <td style={{
                                                borderRight: '1px solid var(--border)',
                                                padding: '8px 10px',
                                                color: app.status === 'Enabled' ? '#4caf50' : '#f44336'
                                            }}>
                                                {app.status}
                                            </td>
                                            <td style={{
                                                padding: '8px 10px',
                                                color: app.impact === 'High' ? '#f44336' : app.impact === 'Medium' ? '#ff9800' : '#4caf50'
                                            }}>
                                                {app.impact}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {!['processes', 'performance', 'startup'].includes(activeTab) && (
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚧</div>
                            <h3>This section is under construction</h3>
                            <p>The {menuItems.find(item => item.id === activeTab)?.label} tab will be available in a future update.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 