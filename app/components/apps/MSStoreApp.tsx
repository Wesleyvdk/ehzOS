import React, { useState, useEffect } from 'react';
import { Search, Star, Download, Check, Play, Image, Music, Video, Gamepad2, Code, BookOpen, Settings, Zap, Heart, Award, TrendingUp, Filter } from 'lucide-react';

interface App {
    id: string;
    name: string;
    developer: string;
    price: string;
    rating: number;
    reviews: number;
    category: string;
    icon: React.ReactNode;
    screenshots: string[];
    description: string;
    features: string[];
    size: string;
    version: string;
    installed: boolean;
    installing: boolean;
    featured: boolean;
    tags: string[];
}

export default function MSStoreApp() {
    const [activeTab, setActiveTab] = useState<'home' | 'apps' | 'games' | 'movies' | 'library'>('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedApp, setSelectedApp] = useState<App | null>(null);
    const [apps, setApps] = useState<App[]>([
        {
            id: '1',
            name: 'Visual Studio Code',
            developer: 'Microsoft Corporation',
            price: 'Free',
            rating: 4.8,
            reviews: 125420,
            category: 'Developer Tools',
            icon: <Code className="w-8 h-8 text-blue-500" />,
            screenshots: ['https://via.placeholder.com/400x300/0078d4/ffffff?text=VS+Code'],
            description: 'Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux.',
            features: ['IntelliSense', 'Debugging', 'Git integration', 'Extensions'],
            size: '85.2 MB',
            version: '1.85.0',
            installed: false,
            installing: false,
            featured: true,
            tags: ['code', 'development', 'editor', 'programming']
        },
        {
            id: '2',
            name: 'Minecraft',
            developer: 'Mojang Studios',
            price: '$26.95',
            rating: 4.6,
            reviews: 89340,
            category: 'Games',
            icon: <Gamepad2 className="w-8 h-8 text-green-500" />,
            screenshots: ['https://via.placeholder.com/400x300/4CAF50/ffffff?text=Minecraft'],
            description: 'Minecraft is a sandbox video game where you can build, explore, and survive in randomly generated worlds.',
            features: ['Creative mode', 'Survival mode', 'Multiplayer', 'Mods support'],
            size: '1.2 GB',
            version: '1.20.4',
            installed: true,
            installing: false,
            featured: true,
            tags: ['game', 'sandbox', 'building', 'adventure']
        },
        {
            id: '3',
            name: 'Spotify',
            developer: 'Spotify AB',
            price: 'Free',
            rating: 4.3,
            reviews: 234567,
            category: 'Music',
            icon: <Music className="w-8 h-8 text-green-600" />,
            screenshots: ['https://via.placeholder.com/400x300/1DB954/ffffff?text=Spotify'],
            description: 'Spotify is a digital music service that gives you access to millions of songs.',
            features: ['Music streaming', 'Playlists', 'Podcasts', 'Offline mode'],
            size: '156.8 MB',
            version: '1.2.25',
            installed: false,
            installing: false,
            featured: true,
            tags: ['music', 'streaming', 'audio', 'entertainment']
        },
        {
            id: '4',
            name: 'Adobe Photoshop',
            developer: 'Adobe Inc.',
            price: '$20.99/month',
            rating: 4.4,
            reviews: 45678,
            category: 'Photo & Video',
            icon: <Image className="w-8 h-8 text-blue-600" />,
            screenshots: ['https://via.placeholder.com/400x300/0066CC/ffffff?text=Photoshop'],
            description: 'Adobe Photoshop is a raster graphics editor developed and published by Adobe Inc.',
            features: ['Photo editing', 'Digital art', 'Filters', 'Layers'],
            size: '2.1 GB',
            version: '2025.1',
            installed: false,
            installing: false,
            featured: false,
            tags: ['photo', 'editing', 'design', 'creative']
        },
        {
            id: '5',
            name: 'Netflix',
            developer: 'Netflix, Inc.',
            price: 'Free',
            rating: 4.1,
            reviews: 189234,
            category: 'Entertainment',
            icon: <Video className="w-8 h-8 text-red-600" />,
            screenshots: ['https://via.placeholder.com/400x300/E50914/ffffff?text=Netflix'],
            description: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies and documentaries.',
            features: ['HD streaming', 'Offline viewing', 'Multiple profiles', 'Recommendations'],
            size: '245.7 MB',
            version: '6.98.1',
            installed: false,
            installing: false,
            featured: true,
            tags: ['streaming', 'movies', 'tv', 'entertainment']
        },
        {
            id: '6',
            name: 'Discord',
            developer: 'Discord Inc.',
            price: 'Free',
            rating: 4.5,
            reviews: 156789,
            category: 'Social',
            icon: <Zap className="w-8 h-8 text-indigo-500" />,
            screenshots: ['https://via.placeholder.com/400x300/5865F2/ffffff?text=Discord'],
            description: 'Discord is a voice, video, and text communication service used by millions of people.',
            features: ['Voice chat', 'Video calls', 'Screen sharing', 'Communities'],
            size: '89.3 MB',
            version: '1.0.9013',
            installed: false,
            installing: false,
            featured: false,
            tags: ['chat', 'communication', 'gaming', 'social']
        },
        {
            id: '7',
            name: 'Notion',
            developer: 'Notion Labs, Inc.',
            price: 'Free',
            rating: 4.7,
            reviews: 67890,
            category: 'Productivity',
            icon: <BookOpen className="w-8 h-8 text-gray-700" />,
            screenshots: ['https://via.placeholder.com/400x300/000000/ffffff?text=Notion'],
            description: 'Notion is a note-taking and collaboration application with markdown support.',
            features: ['Note taking', 'Databases', 'Collaboration', 'Templates'],
            size: '125.4 MB',
            version: '2.0.35',
            installed: false,
            installing: false,
            featured: false,
            tags: ['productivity', 'notes', 'organization', 'collaboration']
        },
        {
            id: '8',
            name: 'Cyberpunk 2077',
            developer: 'CD PROJEKT RED',
            price: '$59.99',
            rating: 4.2,
            reviews: 78901,
            category: 'Games',
            icon: <Gamepad2 className="w-8 h-8 text-yellow-500" />,
            screenshots: ['https://via.placeholder.com/400x300/FFD700/000000?text=Cyberpunk'],
            description: 'Cyberpunk 2077 is an open-world, action-adventure RPG set in the megalopolis of Night City.',
            features: ['Open world', 'RPG elements', 'Customization', 'Story driven'],
            size: '70.2 GB',
            version: '2.1',
            installed: false,
            installing: false,
            featured: true,
            tags: ['game', 'rpg', 'action', 'futuristic']
        }
    ]);

    const categories = [
        { id: 'all', name: 'All', icon: <Filter className="w-4 h-4" /> },
        { id: 'games', name: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
        { id: 'productivity', name: 'Productivity', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'entertainment', name: 'Entertainment', icon: <Video className="w-4 h-4" /> },
        { id: 'developer tools', name: 'Developer Tools', icon: <Code className="w-4 h-4" /> },
        { id: 'music', name: 'Music', icon: <Music className="w-4 h-4" /> },
        { id: 'photo & video', name: 'Photo & Video', icon: <Image className="w-4 h-4" /> },
        { id: 'social', name: 'Social', icon: <Zap className="w-4 h-4" /> }
    ];

    const filteredApps = apps.filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || app.category.toLowerCase() === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredApps = apps.filter(app => app.featured);

    const handleInstall = (appId: string) => {
        setApps(prevApps => prevApps.map(app =>
            app.id === appId ? { ...app, installing: true } : app
        ));

        // Simulate installation
        setTimeout(() => {
            setApps(prevApps => prevApps.map(app =>
                app.id === appId ? { ...app, installing: false, installed: true } : app
            ));
        }, 3000);
    };

    const handleUninstall = (appId: string) => {
        setApps(prevApps => prevApps.map(app =>
            app.id === appId ? { ...app, installed: false } : app
        ));
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    const AppCard = ({ app, featured = false }: { app: App; featured?: boolean }) => (
        <div
            onClick={() => setSelectedApp(app)}
            style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: featured ? '20px' : '16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                minWidth: featured ? '300px' : '200px'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{
                    width: featured ? '64px' : '48px',
                    height: featured ? '64px' : '48px',
                    background: 'var(--bg)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {app.icon}
                </div>
                <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: featured ? '18px' : '16px', fontWeight: '600' }}>
                        {app.name}
                    </h3>
                    <p style={{ margin: '2px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {app.developer}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        {renderStars(app.rating)}
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '4px' }}>
                            ({app.reviews.toLocaleString()})
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '600', color: 'var(--accent)' }}>
                    {app.price}
                </span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if (app.installed) {
                            handleUninstall(app.id);
                        } else if (!app.installing) {
                            handleInstall(app.id);
                        }
                    }}
                    style={{
                        background: app.installed ? 'var(--bg)' : 'var(--accent)',
                        color: app.installed ? 'var(--text)' : 'white',
                        border: app.installed ? '1px solid var(--border)' : 'none',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        minWidth: '80px',
                        justifyContent: 'center'
                    }}
                    disabled={app.installing}
                >
                    {app.installing ? (
                        <>
                            <div style={{
                                width: '12px',
                                height: '12px',
                                border: '2px solid transparent',
                                borderTop: '2px solid currentColor',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }} />
                            Installing...
                        </>
                    ) : app.installed ? (
                        <>
                            <Check className="w-4 h-4" />
                            Installed
                        </>
                    ) : (
                        <>
                            <Download className="w-4 h-4" />
                            Get
                        </>
                    )}
                </button>
            </div>
        </div>
    );

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg)',
            color: 'var(--text)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>

            {/* Header */}
            <div style={{
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border)',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px'
            }}>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Microsoft Store</h1>

                <div style={{ display: 'flex', gap: '16px' }}>
                    {[
                        { id: 'home', label: 'Home', icon: <Settings className="w-4 h-4" /> },
                        { id: 'apps', label: 'Apps', icon: <Code className="w-4 h-4" /> },
                        { id: 'games', label: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
                        { id: 'movies', label: 'Movies & TV', icon: <Video className="w-4 h-4" /> },
                        { id: 'library', label: 'Library', icon: <BookOpen className="w-4 h-4" /> }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            style={{
                                background: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                                color: activeTab === tab.id ? 'white' : 'var(--text)',
                                border: 'none',
                                borderRadius: '20px',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '20px',
                        padding: '8px 16px',
                        width: '300px'
                    }}>
                        <Search className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search apps, games, movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                                color: 'var(--text)',
                                fontSize: '14px',
                                width: '100%'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: 'auto' }}>
                {activeTab === 'home' && (
                    <div style={{ padding: '24px' }}>
                        {/* Featured Section */}
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Award className="w-5 h-5 text-yellow-500" />
                                Featured
                            </h2>
                            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
                                {featuredApps.map((app) => (
                                    <AppCard key={app.id} app={app} featured={true} />
                                ))}
                            </div>
                        </div>

                        {/* Top Charts */}
                        <div style={{ marginBottom: '32px' }}>
                            <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                Top Charts
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                                {apps.slice(0, 6).map((app) => (
                                    <AppCard key={app.id} app={app} />
                                ))}
                            </div>
                        </div>

                        {/* Recommended */}
                        <div>
                            <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Heart className="w-5 h-5 text-red-500" />
                                Recommended for you
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                                {apps.slice(2, 8).map((app) => (
                                    <AppCard key={app.id} app={app} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {(activeTab === 'apps' || activeTab === 'games') && (
                    <div style={{ padding: '24px' }}>
                        {/* Categories */}
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        style={{
                                            background: selectedCategory === category.id ? 'var(--accent)' : 'var(--bg-secondary)',
                                            color: selectedCategory === category.id ? 'white' : 'var(--text)',
                                            border: '1px solid var(--border)',
                                            borderRadius: '20px',
                                            padding: '8px 16px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {category.icon}
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Apps Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                            {filteredApps.map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>

                        {filteredApps.length === 0 && (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '200px',
                                color: 'var(--text-secondary)'
                            }}>
                                <Search className="w-12 h-12 mb-4 opacity-50" />
                                <p>No apps found matching your search</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'library' && (
                    <div style={{ padding: '24px' }}>
                        <h2 style={{ margin: '0 0 24px 0', fontSize: '20px', fontWeight: '600' }}>Your Library</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                            {apps.filter(app => app.installed).map((app) => (
                                <AppCard key={app.id} app={app} />
                            ))}
                        </div>

                        {apps.filter(app => app.installed).length === 0 && (
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '200px',
                                color: 'var(--text-secondary)'
                            }}>
                                <BookOpen className="w-12 h-12 mb-4 opacity-50" />
                                <p>No apps installed yet</p>
                                <p>Visit the store to download apps</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'movies' && (
                    <div style={{ padding: '24px' }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '400px',
                            color: 'var(--text-secondary)'
                        }}>
                            <Video className="w-16 h-16 mb-4 opacity-50" />
                            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>Movies & TV</h3>
                            <p>Coming soon! Stay tuned for the latest movies and TV shows.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* App Detail Modal */}
            {selectedApp && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'var(--bg)',
                        borderRadius: '12px',
                        padding: '24px',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '80%',
                        overflow: 'auto'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'var(--bg-secondary)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {selectedApp.icon}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>
                                    {selectedApp.name}
                                </h2>
                                <p style={{ margin: '4px 0', color: 'var(--text-secondary)' }}>
                                    {selectedApp.developer}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                    {renderStars(selectedApp.rating)}
                                    <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                        {selectedApp.rating} ({selectedApp.reviews.toLocaleString()} reviews)
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedApp(null)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text)',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    padding: '8px'
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <p style={{ margin: 0, lineHeight: '1.5' }}>{selectedApp.description}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                            <div>
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>Features</h4>
                                <ul style={{ margin: 0, paddingLeft: '16px' }}>
                                    {selectedApp.features.map((feature, index) => (
                                        <li key={index} style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>Details</h4>
                                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                    <p style={{ margin: '4px 0' }}>Size: {selectedApp.size}</p>
                                    <p style={{ margin: '4px 0' }}>Version: {selectedApp.version}</p>
                                    <p style={{ margin: '4px 0' }}>Category: {selectedApp.category}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <button
                                onClick={() => {
                                    if (selectedApp.installed) {
                                        handleUninstall(selectedApp.id);
                                    } else if (!selectedApp.installing) {
                                        handleInstall(selectedApp.id);
                                    }
                                }}
                                style={{
                                    background: 'var(--accent)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '12px 24px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                                disabled={selectedApp.installing}
                            >
                                {selectedApp.installing ? (
                                    <>
                                        <div style={{
                                            width: '16px',
                                            height: '16px',
                                            border: '2px solid transparent',
                                            borderTop: '2px solid currentColor',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }} />
                                        Installing...
                                    </>
                                ) : selectedApp.installed ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        Uninstall
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-4 h-4" />
                                        Install
                                    </>
                                )}
                            </button>
                            <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--accent)' }}>
                                {selectedApp.price}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 