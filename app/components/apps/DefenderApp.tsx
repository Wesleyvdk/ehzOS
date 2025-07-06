import React, { useState, useEffect } from 'react';
import { Shield, Activity, Wifi, HardDrive, AlertTriangle, CheckCircle } from 'lucide-react';

export default function DefenderApp() {
    const [systemStatus, setSystemStatus] = useState({
        virusProtection: 'active',
        firewall: 'active',
        deviceSecurity: 'active',
        accountProtection: 'active',
        networkUsage: 85,
        networkSpeed: 99,
        threatsBlocked: 247,
        lastScan: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    });

    const [activeTab, setActiveTab] = useState('overview');

    const formatLastScan = (date: Date) => {
        const now = new Date();
        const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
        if (diffHours < 1) return 'Less than 1 hour ago';
        if (diffHours === 1) return '1 hour ago';
        return `${diffHours} hours ago`;
    };

    const menuItems = [
        { id: 'overview', label: 'Security Overview', icon: Shield },
        { id: 'virus', label: 'Virus & Threat Protection', icon: Shield },
        { id: 'account', label: 'Account Protection', icon: Shield },
        { id: 'firewall', label: 'Firewall & Network Protection', icon: Wifi },
        { id: 'device', label: 'Device Security', icon: HardDrive }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-green-500';
            case 'warning': return 'text-yellow-500';
            case 'danger': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
            case 'danger': return <AlertTriangle className="w-5 h-5 text-red-500" />;
            default: return <CheckCircle className="w-5 h-5 text-gray-500" />;
        }
    };

    return (
        <div className="h-full bg-white dark:bg-gray-900 flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Windows Security</h1>
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === item.id
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="text-sm">{item.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                {activeTab === 'overview' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Security Overview</h2>

                        {/* Status Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Network Usage</h3>
                                    <Activity className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                    {systemStatus.networkUsage}%
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${systemStatus.networkUsage}%` }}
                                    />
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Network Speed</h3>
                                    <Wifi className="w-5 h-5 text-green-500" />
                                </div>
                                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                                    {systemStatus.networkSpeed} MB/s
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Connection stable
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Threats Blocked</h3>
                                    <Shield className="w-5 h-5 text-red-500" />
                                </div>
                                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                                    {systemStatus.threatsBlocked}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    This month
                                </div>
                            </div>
                        </div>

                        {/* Protection Status */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Protection Status</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        {getStatusIcon(systemStatus.virusProtection)}
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Virus & Threat Protection</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Last scan: {formatLastScan(systemStatus.lastScan)}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-medium ${getStatusColor(systemStatus.virusProtection)}`}>
                                        Active
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        {getStatusIcon(systemStatus.firewall)}
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Firewall & Network Protection</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                All networks protected
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-medium ${getStatusColor(systemStatus.firewall)}`}>
                                        Active
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        {getStatusIcon(systemStatus.deviceSecurity)}
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Device Security</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Security processor active
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-medium ${getStatusColor(systemStatus.deviceSecurity)}`}>
                                        Active
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        {getStatusIcon(systemStatus.accountProtection)}
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">Account Protection</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Sign-in options available
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-medium ${getStatusColor(systemStatus.accountProtection)}`}>
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'virus' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Virus & Threat Protection</h2>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No current threats</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Last scan: {formatLastScan(systemStatus.lastScan)}</p>
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Quick Scan
                                </button>
                                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    Scan Options
                                </button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Protection History</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-gray-900 dark:text-white">Threats blocked this month</span>
                                    <span className="font-bold text-red-600 dark:text-red-400">{systemStatus.threatsBlocked}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-gray-900 dark:text-white">Files scanned</span>
                                    <span className="font-bold text-blue-600 dark:text-blue-400">1,247,893</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-gray-900 dark:text-white">Scan duration</span>
                                    <span className="font-bold text-green-600 dark:text-green-400">2 min 34 sec</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add other tab content as needed */}
                {activeTab !== 'overview' && activeTab !== 'virus' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            {menuItems.find(item => item.id === activeTab)?.label}
                        </h2>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-400">
                                This section is under development. Security features are being implemented.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 