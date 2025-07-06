import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Minimize, Maximize, Power, RotateCcw, ChevronRight } from 'lucide-react';
import { useOS } from '../context/OSContext';

interface StartMenuProps {
    isVisible: boolean;
    onClose: () => void;
}

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    slug: string;
}

const StartMenu: React.FC<StartMenuProps> = ({ isVisible, onClose }) => {
    const { state, openWindow } = useOS();
    const [isMaximized, setIsMaximized] = useState(false);
    const [showPowerMenu, setShowPowerMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await fetch('https://blog-backend-nine-peach.vercel.app/api/posts');
                if (response.ok) {
                    const data = await response.json();
                    // The API returns {posts: [...]} format, map the data to our interface
                    const mappedPosts = (data.posts || data).map((post: any) => ({
                        id: post.id.toString(),
                        title: post.title,
                        excerpt: post.content ? post.content.substring(0, 150) + '...' : 'No excerpt available',
                        date: post.createdAt || post.date,
                        slug: post.slug || post.title.toLowerCase().replace(/\s+/g, '-')
                    }));
                    setBlogPosts(mappedPosts.slice(0, 4)); // Show only first 4 posts
                }
            } catch (error) {
                console.error('Failed to fetch blog posts:', error);
                // Fallback data
                setBlogPosts([
                    {
                        id: '1',
                        title: 'Building Portfolio OS',
                        excerpt: 'How I created an interactive desktop experience using React and modern web technologies.',
                        date: '2025-07-06',
                        slug: 'building-portfolio-os'
                    },
                    {
                        id: '2',
                        title: 'The Future of Web Development',
                        excerpt: 'Exploring upcoming trends and technologies that will shape the web development landscape.',
                        date: '2025-07-06',
                        slug: 'future-of-web-development'
                    }
                ]);
            }
        };

        if (isVisible) {
            fetchBlogPosts();
        }
    }, [isVisible]);

    const handleAppClick = (appId: string) => {
        openWindow(appId);
        onClose();
    };

    const handleSearchFocus = () => {
        onClose();
        // Focus search in taskbar
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatBlogDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    };

    const availableApps = [
        { id: 'settings', name: 'Settings', icon: '/icon/setting.svg' },
        { id: 'file-explorer', name: 'File Explorer', icon: '/icon/explorer.svg' },
        { id: 'calculator', name: 'Calculator', icon: '/icon/calc.svg' },
        { id: 'terminal', name: 'Terminal', icon: '/icon/terminal.svg' },
        { id: 'notepad', name: 'Notepad', icon: '/icon/notepad.svg' },
        { id: 'task-manager', name: 'Task Manager', icon: '/icon/taskmgr.png' },
        { id: 'projects', name: 'Projects', icon: '/icon/explorer.svg' },
        { id: 'resume', name: 'Resume', icon: '/icon/notepad.svg' },
        { id: 'blog', name: 'Blog', icon: '/icon/edge.svg' },
        { id: 'about', name: 'About Me', icon: '/icon/about.svg' },
        { id: 'contact', name: 'Contact', icon: '/icon/feedback.svg' },
        { id: 'certificates', name: 'Certificates', icon: '/icon/certificate.svg' },
        { id: 'edge', name: 'Microsoft Edge', icon: '/icon/edge.svg' },
        { id: 'camera', name: 'Camera', icon: '/icon/camera.svg' },
        { id: 'msstore', name: 'Microsoft Store', icon: '/icon/msstore.svg' },
        { id: 'defender', name: 'Windows Security', icon: '/icon/defender.svg' },
        { id: 'copilot', name: 'Copilot', icon: '/icon/copilot.svg' },
        { id: 'minesweeper', name: 'Minesweeper', icon: '/icon/minesweeper.svg' },
        { id: 'python-editor', name: 'Python Editor', icon: '/icon/python.svg' },
        { id: 'run', name: 'Run', icon: '/icon/run.svg' },
        { id: 'whiteboard', name: 'Whiteboard', icon: '/icon/whiteboard.svg' },
        { id: 'winver', name: 'About Windows', icon: '/icon/about.svg' }
    ];

    const pinnedApps = [
        { id: 'projects', name: 'Projects', icon: '/icon/explorer.svg' },
        { id: 'resume', name: 'Resume', icon: '/icon/notepad.svg' },
        { id: 'blog', name: 'Blog', icon: '/icon/edge.svg' },
        { id: 'about', name: 'About Me', icon: '/icon/about.svg' },
        { id: 'contact', name: 'Contact', icon: '/icon/feedback.svg' },
        { id: 'calculator', name: 'Calculator', icon: '/icon/calc.svg' },
        { id: 'notepad', name: 'Notepad', icon: '/icon/notepad.svg' },
        { id: 'copilot', name: 'Copilot', icon: '/icon/copilot.svg' },
        { id: 'minesweeper', name: 'Minesweeper', icon: '/icon/minesweeper.svg' },
        { id: 'python-editor', name: 'Python Editor', icon: '/icon/python.svg' },
        { id: 'whiteboard', name: 'Whiteboard', icon: '/icon/whiteboard.svg' },
        { id: 'defender', name: 'Windows Security', icon: '/icon/defender.svg' }
    ];

    const folderApps = [
        { id: 'projects', name: 'Projects', icon: '/icon/explorer.svg' },
        { id: 'resume', name: 'Resume', icon: '/icon/notepad.svg' },
        { id: 'settings', name: 'Settings', icon: '/icon/setting.svg' }
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 650 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 650 }}
                        transition={{ duration: 0.2, ease: [0.9, 0, 0.1, 1] }}
                        className={`start-menu ${isMaximized ? 'max' : ''} ${state.theme === 'dark' ? 'dark' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Left Section */}
                        <div id="s-m-l">
                            {/* User Profile */}
                            <div id="s-m-user">
                                <svg viewBox="0,0,257,344" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="user-fill1" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#A964C8" />
                                            <stop offset="100%" stopColor="#2D8AD5" />
                                        </linearGradient>
                                    </defs>
                                    <circle cx="128" cy="100" r="60" fill="url(#user-fill1)" />
                                    <path d="M50 280 Q50 200 128 200 Q206 200 206 280 L206 344 L50 344 Z" fill="url(#user-fill1)" />
                                </svg>
                            </div>
                            <p style={{ width: '100%', textAlign: 'center', margin: '-50px 0 20px 0', fontSize: '30px', color: 'var(--text)' }}>Administrator</p>

                            {/* Search */}
                            <div className="search-container">
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Search apps, settings, and files"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={handleSearchFocus}
                                />
                                <Search className="search-icon" size={16} />
                            </div>

                            {/* Apps List */}
                            <div className="apps-list">
                                <p className="text">Available</p>
                                {availableApps.map((app) => (
                                    <a
                                        key={app.id}
                                        className="app-item"
                                        onClick={() => handleAppClick(app.id)}
                                    >
                                        <img src={app.icon} alt={app.name} />
                                        <p>{app.name}</p>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Right Section */}
                        <div id="s-m-r">
                            {/* Row 1 - Folders and Tools */}
                            <div className="row1">
                                <div className="folder">
                                    {folderApps.map((app) => (
                                        <a
                                            key={app.id}
                                            className="sm-app enable"
                                            onClick={() => handleAppClick(app.id)}
                                        >
                                            <img src={app.icon} alt={app.name} />
                                            <p>{app.name}</p>
                                        </a>
                                    ))}
                                </div>
                                <div className="tool">
                                    <p className="time">{formatTime(currentTime)}</p>
                                    <p className="date">{formatDate(currentTime)}</p>
                                    <div className="pw">
                                        <button
                                            className="btn btn-icon big"
                                            onClick={() => setIsMaximized(!isMaximized)}
                                            title="Toggle fullscreen"
                                        >
                                            {isMaximized ? <Minimize size={16} /> : <Maximize size={16} />}
                                        </button>
                                        <button
                                            className={`btn btn-icon power ${showPowerMenu ? 'show' : ''}`}
                                            onClick={() => setShowPowerMenu(!showPowerMenu)}
                                            title="Power"
                                        >
                                            <Power size={16} />
                                            {showPowerMenu && (
                                                <div className="power-menu">
                                                    <button onClick={() => window.location.href = '/shutdown'} title="Shutdown">
                                                        <Power size={16} />
                                                    </button>
                                                    <button onClick={() => window.location.reload()} title="Restart">
                                                        <RotateCcw size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Pinned Apps */}
                            <div className="pinned">
                                <div className="title">
                                    <p>Pinned</p>
                                    <div>
                                        <a className="more-btn">
                                            <span>All apps</span>
                                            <ChevronRight size={12} />
                                        </a>
                                    </div>
                                </div>
                                <div className="apps">
                                    {pinnedApps.map((app) => (
                                        <a
                                            key={app.id}
                                            className="sm-app enable"
                                            onClick={() => handleAppClick(app.id)}
                                        >
                                            <img src={app.icon} alt={app.name} />
                                            <p>{app.name}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Recommended */}
                            <div className="tuijian">
                                <div className="title">
                                    <p>Recommended</p>
                                    <div>
                                        <a className="more-btn">
                                            <span>More</span>
                                            <ChevronRight size={12} />
                                        </a>
                                    </div>
                                </div>
                                <div className="apps">
                                    {blogPosts.map((post) => (
                                        <a
                                            key={post.id}
                                            className="tj-obj"
                                            onClick={() => window.open(`https://blog-backend-nine-peach.vercel.app/post/${post.slug}`, '_blank')}
                                        >
                                            <img src="/icon/edge.svg" alt="Blog post" />
                                            <div>
                                                <p>{post.title}</p>
                                                <p>{formatBlogDate(post.date)}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default StartMenu; 