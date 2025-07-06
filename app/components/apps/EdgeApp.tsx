import React, { useState, useEffect, useRef } from 'react';
import { useOS } from '../../context/OSContext';

interface Tab {
    id: string;
    title: string;
    url: string;
    favicon: string;
    isActive: boolean;
    isLoading: boolean;
    history: string[];
    historyIndex: number;
}

interface EdgeAppProps {
    initialUrl?: string;
}

export default function EdgeApp({ initialUrl }: EdgeAppProps) {
    const { setEdgeInitialUrl } = useOS();
    const [tabs, setTabs] = useState<Tab[]>([]);
    const [activeTabId, setActiveTabId] = useState<string>('');
    const [addressBarValue, setAddressBarValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const iframeRefs = useRef<{ [key: string]: HTMLIFrameElement | null }>({});

    // Initialize with new tab or initial URL
    useEffect(() => {
        if (initialUrl) {
            addTab(initialUrl);
            setEdgeInitialUrl(''); // Clear after use
        } else {
            addTab();
        }
    }, [initialUrl]);

    // URL detection regex (same as win12)
    const isValidUrl = (str: string) => {
        const urlRegex = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/;
        return urlRegex.test(str) || str.match(/^mainpage.html$/);
    };

    // Process URL (same logic as win12)
    const processUrl = (input: string) => {
        if (!input.trim()) return 'about:blank';

        // If it's not a valid URL, use Bing search
        if (!isValidUrl(input)) {
            return `https://www.bing.com/search?q=${encodeURIComponent(input)}`;
        }

        // If it's a valid URL but doesn't have protocol, add http://
        if (!/^https?:\/\//.test(input) && !input.match(/^mainpage.html$/)) {
            return `https://${input}`;
        }

        return input;
    };

    const addTab = (url: string = 'about:blank') => {
        const newTab: Tab = {
            id: `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            title: url === 'about:blank' ? 'New Tab' : 'Loading...',
            url: url === 'about:blank' ? '' : processUrl(url),
            favicon: '🌐',
            isActive: true,
            isLoading: url !== 'about:blank',
            history: url === 'about:blank' ? [] : [processUrl(url)],
            historyIndex: url === 'about:blank' ? -1 : 0
        };

        setTabs(prevTabs => {
            const updatedTabs = prevTabs.map(tab => ({ ...tab, isActive: false }));
            return [...updatedTabs, newTab];
        });

        setActiveTabId(newTab.id);
        setAddressBarValue(url === 'about:blank' ? '' : url);
        setIsLoading(url !== 'about:blank');
    };

    const closeTab = (tabId: string) => {
        setTabs(prevTabs => {
            const updatedTabs = prevTabs.filter(tab => tab.id !== tabId);

            if (updatedTabs.length === 0) {
                // If no tabs left, create a new one
                const newTab: Tab = {
                    id: `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    title: 'New Tab',
                    url: '',
                    favicon: '🌐',
                    isActive: true,
                    isLoading: false,
                    history: [],
                    historyIndex: -1
                };
                setActiveTabId(newTab.id);
                setAddressBarValue('');
                return [newTab];
            }

            // If we closed the active tab, make another tab active
            if (tabId === activeTabId) {
                const newActiveTab = updatedTabs[updatedTabs.length - 1];
                newActiveTab.isActive = true;
                setActiveTabId(newActiveTab.id);
                setAddressBarValue(newActiveTab.url);
            }

            return updatedTabs;
        });
    };

    const switchTab = (tabId: string) => {
        setTabs(prevTabs => {
            const updatedTabs = prevTabs.map(tab => ({
                ...tab,
                isActive: tab.id === tabId
            }));

            const activeTab = updatedTabs.find(tab => tab.id === tabId);
            if (activeTab) {
                setAddressBarValue(activeTab.url);
            }

            return updatedTabs;
        });

        setActiveTabId(tabId);
    };

    const navigate = (url: string) => {
        if (!url.trim()) return;

        const processedUrl = processUrl(url);

        setTabs(prevTabs => {
            return prevTabs.map(tab => {
                if (tab.id === activeTabId) {
                    const newHistory = [...tab.history.slice(0, tab.historyIndex + 1), processedUrl];
                    return {
                        ...tab,
                        url: processedUrl,
                        title: 'Loading...',
                        isLoading: true,
                        history: newHistory,
                        historyIndex: newHistory.length - 1
                    };
                }
                return tab;
            });
        });

        setAddressBarValue(url);
        setIsLoading(true);
    };

    const handleAddressBarSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            navigate(addressBarValue);
        }
    };

    const handleIframeLoad = (tabId: string) => {
        setTabs(prevTabs => {
            return prevTabs.map(tab => {
                if (tab.id === tabId) {
                    let title = 'Untitled';
                    try {
                        const iframe = iframeRefs.current[tabId];
                        if (iframe && iframe.contentDocument) {
                            title = iframe.contentDocument.title || getPageTitle(tab.url);
                        } else {
                            title = getPageTitle(tab.url);
                        }
                    } catch (e) {
                        title = getPageTitle(tab.url);
                    }

                    return {
                        ...tab,
                        title,
                        isLoading: false,
                        favicon: getFavicon(tab.url)
                    };
                }
                return tab;
            });
        });

        setIsLoading(false);
    };

    const goBack = () => {
        const activeTab = tabs.find(tab => tab.id === activeTabId);
        if (!activeTab || activeTab.historyIndex <= 0) return;

        const newHistoryIndex = activeTab.historyIndex - 1;
        const newUrl = activeTab.history[newHistoryIndex];

        setTabs(prevTabs => {
            return prevTabs.map(tab => {
                if (tab.id === activeTabId) {
                    return {
                        ...tab,
                        url: newUrl,
                        historyIndex: newHistoryIndex,
                        isLoading: true,
                        title: 'Loading...'
                    };
                }
                return tab;
            });
        });

        setAddressBarValue(newUrl);
        setIsLoading(true);
    };

    const goForward = () => {
        const activeTab = tabs.find(tab => tab.id === activeTabId);
        if (!activeTab || activeTab.historyIndex >= activeTab.history.length - 1) return;

        const newHistoryIndex = activeTab.historyIndex + 1;
        const newUrl = activeTab.history[newHistoryIndex];

        setTabs(prevTabs => {
            return prevTabs.map(tab => {
                if (tab.id === activeTabId) {
                    return {
                        ...tab,
                        url: newUrl,
                        historyIndex: newHistoryIndex,
                        isLoading: true,
                        title: 'Loading...'
                    };
                }
                return tab;
            });
        });

        setAddressBarValue(newUrl);
        setIsLoading(true);
    };

    const reload = () => {
        const activeTab = tabs.find(tab => tab.id === activeTabId);
        if (!activeTab) return;

        setTabs(prevTabs => {
            return prevTabs.map(tab => {
                if (tab.id === activeTabId) {
                    return {
                        ...tab,
                        isLoading: true,
                        title: 'Loading...'
                    };
                }
                return tab;
            });
        });

        setIsLoading(true);

        // Force reload the iframe
        const iframe = iframeRefs.current[activeTabId];
        if (iframe) {
            iframe.src = iframe.src;
        }
    };

    const getPageTitle = (url: string) => {
        if (!url || url === 'about:blank') return 'New Tab';
        if (url.includes('bing.com/search')) return 'Bing Search';
        if (url.includes('github.com')) return 'GitHub';
        if (url.includes('linkedin.com')) return 'LinkedIn';
        if (url.includes('ap-gaming.org')) return 'AP Gaming';
        if (url.includes('treffortly.com')) return 'Treffortly';

        try {
            const domain = new URL(url).hostname;
            return domain.replace('www.', '');
        } catch {
            return 'Website';
        }
    };

    const getFavicon = (url: string) => {
        if (!url || url === 'about:blank') return '🌐';
        if (url.includes('bing.com')) return '🔍';
        if (url.includes('github.com')) return '🐙';
        if (url.includes('linkedin.com')) return '💼';
        if (url.includes('ap-gaming.org')) return '🎮';
        if (url.includes('treffortly.com')) return '🏢';
        if (url.includes('youtube.com')) return '📺';
        if (url.includes('google.com')) return '🔍';
        return '🌐';
    };

    const activeTab = tabs.find(tab => tab.id === activeTabId);
    const canGoBack = activeTab && activeTab.historyIndex > 0;
    const canGoForward = activeTab && activeTab.historyIndex < activeTab.history.length - 1;

    return (
        <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900">
            {/* Tab Bar */}
            <div className="flex items-center bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-1 overflow-x-auto">
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            className={`flex items-center min-w-0 max-w-xs px-4 py-2 border-r border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${tab.isActive ? 'bg-blue-50 dark:bg-blue-900 border-b-2 border-blue-500' : ''
                                }`}
                            onClick={() => switchTab(tab.id)}
                        >
                            <span className="text-sm mr-2">{tab.favicon}</span>
                            <span className="flex-1 truncate text-sm text-gray-700 dark:text-gray-300">
                                {tab.title}
                            </span>
                            {tab.isLoading && (
                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin ml-2"></div>
                            )}
                            <button
                                className="ml-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeTab(tab.id);
                                }}
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    onClick={() => addTab()}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            {/* Navigation Bar */}
            <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1">
                    <button
                        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${!canGoBack ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={goBack}
                        disabled={!canGoBack}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        className={`p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${!canGoForward ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        onClick={goForward}
                        disabled={!canGoForward}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button
                        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={reload}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-700 rounded-md px-3 py-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">🔒</span>
                    <input
                        type="text"
                        value={addressBarValue}
                        onChange={(e) => setAddressBarValue(e.target.value)}
                        onKeyPress={handleAddressBarSubmit}
                        placeholder="Search Bing or enter address"
                        className="flex-1 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-300"
                    />
                </div>

                <div className="flex items-center gap-1">
                    <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                    </button>
                    <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Quick Links */}
            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">Quick links:</span>
                {[
                    { name: 'Bing', url: 'https://www.bing.com', icon: '🔍' },
                    { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
                    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '💼' },
                    { name: 'YouTube', url: 'https://youtube.com', icon: '📺' },
                    { name: 'AP Gaming', url: 'https://ap-gaming.org', icon: '🎮' },
                    { name: 'Treffortly', url: 'https://treffortly.com', icon: '🏢' }
                ].map((link) => (
                    <button
                        key={link.name}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-white dark:bg-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-600 whitespace-nowrap"
                        onClick={() => navigate(link.url)}
                    >
                        <span>{link.icon}</span>
                        <span className="text-gray-700 dark:text-gray-300">{link.name}</span>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 relative">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className={`absolute inset-0 ${tab.isActive ? 'block' : 'hidden'}`}
                    >
                        {tab.url && tab.url !== 'about:blank' ? (
                            <iframe
                                ref={(el) => {
                                    iframeRefs.current[tab.id] = el;
                                }}
                                src={tab.url}
                                className="w-full h-full border-0"
                                onLoad={() => handleIframeLoad(tab.id)}
                                sandbox="allow-same-origin allow-scripts allow-forms allow-navigation allow-popups"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">🌐</div>
                                    <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">New Tab</h2>
                                    <p className="text-gray-500 dark:text-gray-400 mb-4">Search Bing or enter a web address</p>
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                            onClick={() => navigate('https://www.bing.com')}
                                        >
                                            Go to Bing
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                                            onClick={() => navigate('https://github.com')}
                                        >
                                            Go to GitHub
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
} 