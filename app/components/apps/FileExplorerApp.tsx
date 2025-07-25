import React, { useState, useEffect } from 'react';
import {
    Folder, File, Image, Music, Video, FileText, Settings, Download,
    Home, HardDrive, Trash2, Search, ArrowLeft, ArrowRight, ArrowUp,
    Grid, List, MoreHorizontal, ChevronRight, Star, Tag, User,
    FolderOpen, Monitor, Smartphone, Camera, Headphones, Menu,
    ChevronUp,
    ChevronLeft
} from 'lucide-react';

interface FileItem {
    id: string;
    name: string;
    type: 'folder' | 'file';
    size?: string;
    modified: string;
    path: string;
    icon: React.ReactNode;
    extension?: string;
}

interface FolderStructure {
    [key: string]: FileItem[];
}

export default function FileExplorerApp() {
    const [currentPath, setCurrentPath] = useState('This PC');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [history, setHistory] = useState<string[]>(['This PC']);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setShowSidebar(false);
            }
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const folderStructure: FolderStructure = {
        'This PC': [
            { id: 'desktop', name: 'Desktop', type: 'folder', modified: '2024-01-15', path: 'Desktop', icon: <Monitor className="w-5 h-5" /> },
            { id: 'documents', name: 'Documents', type: 'folder', modified: '2024-01-15', path: 'Documents', icon: <FileText className="w-5 h-5" /> },
            { id: 'downloads', name: 'Downloads', type: 'folder', modified: '2024-01-15', path: 'Downloads', icon: <Download className="w-5 h-5" /> },
            { id: 'music', name: 'Music', type: 'folder', modified: '2024-01-15', path: 'Music', icon: <Music className="w-5 h-5" /> },
            { id: 'pictures', name: 'Pictures', type: 'folder', modified: '2024-01-15', path: 'Pictures', icon: <Image className="w-5 h-5" /> },
            { id: 'videos', name: 'Videos', type: 'folder', modified: '2024-01-15', path: 'Videos', icon: <Video className="w-5 h-5" /> },
            { id: 'c-drive', name: 'Local Disk (C:)', type: 'folder', size: '500 GB', modified: '2024-01-15', path: 'C:', icon: <HardDrive className="w-5 h-5" /> },
        ],
        'Desktop': [
            { id: 'file1', name: 'Project.docx', type: 'file', size: '2.1 MB', modified: '2024-01-14', path: 'Desktop/Project.docx', icon: <FileText className="w-5 h-5" />, extension: 'docx' },
            { id: 'file2', name: 'Presentation.pptx', type: 'file', size: '5.3 MB', modified: '2024-01-13', path: 'Desktop/Presentation.pptx', icon: <FileText className="w-5 h-5" />, extension: 'pptx' },
            { id: 'folder1', name: 'Work Files', type: 'folder', modified: '2024-01-12', path: 'Desktop/Work Files', icon: <Folder className="w-5 h-5" /> },
        ],
        'Documents': [
            { id: 'doc1', name: 'Resume.pdf', type: 'file', size: '1.2 MB', modified: '2024-01-10', path: 'Documents/Resume.pdf', icon: <FileText className="w-5 h-5" />, extension: 'pdf' },
            { id: 'doc2', name: 'Budget.xlsx', type: 'file', size: '856 KB', modified: '2024-01-09', path: 'Documents/Budget.xlsx', icon: <FileText className="w-5 h-5" />, extension: 'xlsx' },
            { id: 'folder2', name: 'Personal', type: 'folder', modified: '2024-01-08', path: 'Documents/Personal', icon: <Folder className="w-5 h-5" /> },
        ],
        'Downloads': [
            { id: 'dl1', name: 'installer.exe', type: 'file', size: '25.6 MB', modified: '2024-01-15', path: 'Downloads/installer.exe', icon: <Settings className="w-5 h-5" />, extension: 'exe' },
            { id: 'dl2', name: 'document.zip', type: 'file', size: '3.2 MB', modified: '2024-01-14', path: 'Downloads/document.zip', icon: <File className="w-5 h-5" />, extension: 'zip' },
        ],
        'Music': [
            { id: 'music1', name: 'Song1.mp3', type: 'file', size: '4.2 MB', modified: '2024-01-12', path: 'Music/Song1.mp3', icon: <Music className="w-5 h-5" />, extension: 'mp3' },
            { id: 'music2', name: 'Song2.mp3', type: 'file', size: '3.8 MB', modified: '2024-01-11', path: 'Music/Song2.mp3', icon: <Music className="w-5 h-5" />, extension: 'mp3' },
            { id: 'album1', name: 'Album 1', type: 'folder', modified: '2024-01-10', path: 'Music/Album 1', icon: <FolderOpen className="w-5 h-5" /> },
        ],
        'Pictures': [
            { id: 'pic1', name: 'photo1.jpg', type: 'file', size: '2.1 MB', modified: '2024-01-13', path: 'Pictures/photo1.jpg', icon: <Image className="w-5 h-5" />, extension: 'jpg' },
            { id: 'pic2', name: 'photo2.png', type: 'file', size: '1.8 MB', modified: '2024-01-12', path: 'Pictures/photo2.png', icon: <Image className="w-5 h-5" />, extension: 'png' },
            { id: 'vacation', name: 'Vacation 2024', type: 'folder', modified: '2024-01-11', path: 'Pictures/Vacation 2024', icon: <Camera className="w-5 h-5" /> },
        ],
        'Videos': [
            { id: 'vid1', name: 'movie.mp4', type: 'file', size: '125 MB', modified: '2024-01-14', path: 'Videos/movie.mp4', icon: <Video className="w-5 h-5" />, extension: 'mp4' },
            { id: 'vid2', name: 'tutorial.avi', type: 'file', size: '89 MB', modified: '2024-01-13', path: 'Videos/tutorial.avi', icon: <Video className="w-5 h-5" />, extension: 'avi' },
        ]
    };

    const currentItems = folderStructure[currentPath] || [];
    const filteredItems = currentItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const navigateToFolder = (path: string) => {
        if (folderStructure[path]) {
            setCurrentPath(path);
            const newHistory = history.slice(0, historyIndex + 1);
            newHistory.push(path);
            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
            setSelectedItems([]);
        }
    };

    const goBack = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setCurrentPath(history[newIndex]);
            setSelectedItems([]);
        }
    };

    const goForward = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setCurrentPath(history[newIndex]);
            setSelectedItems([]);
        }
    };

    const goUp = () => {
        if (currentPath !== 'This PC') {
            navigateToFolder('This PC');
        }
    };

    const handleItemClick = (item: FileItem, event: React.MouseEvent) => {
        if (event.ctrlKey) {
            setSelectedItems(prev =>
                prev.includes(item.id)
                    ? prev.filter(id => id !== item.id)
                    : [...prev, item.id]
            );
        } else {
            if (item.type === 'folder') {
                navigateToFolder(item.path);
            } else {
                setSelectedItems([item.id]);
            }
        }
    };

    const sidebarItems = [
        { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" />, path: 'This PC' },
        { id: 'desktop', label: 'Desktop', icon: <Monitor className="w-4 h-4" />, path: 'Desktop' },
        { id: 'documents', label: 'Documents', icon: <FileText className="w-4 h-4" />, path: 'Documents' },
        { id: 'downloads', label: 'Downloads', icon: <Download className="w-4 h-4" />, path: 'Downloads' },
        { id: 'music', label: 'Music', icon: <Headphones className="w-4 h-4" />, path: 'Music' },
        { id: 'pictures', label: 'Pictures', icon: <Image className="w-4 h-4" />, path: 'Pictures' },
        { id: 'videos', label: 'Videos', icon: <Video className="w-4 h-4" />, path: 'Videos' },
    ];

    const quickAccessItems = [
        { id: 'recent', label: 'Recent', icon: <Star className="w-4 h-4" /> },
        { id: 'shared', label: 'Shared', icon: <User className="w-4 h-4" /> },
        { id: 'onedrive', label: 'OneDrive', icon: <Smartphone className="w-4 h-4" /> },
    ];

    const pathSegments = currentPath.split('/').filter(Boolean);
    if (pathSegments.length === 0) pathSegments.push('This PC');

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
                    background: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    zIndex: 1000
                }}>
                    <button
                        onClick={() => setShowSidebar(!showSidebar)}
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: 'none',
                            background: 'var(--card)',
                            color: 'var(--text)',
                            cursor: 'pointer',
                            marginRight: '12px'
                        }}
                    >
                        <Menu className="w-4 h-4" />
                    </button>
                    <span style={{
                        fontSize: '16px',
                        fontWeight: '500',
                        color: 'var(--text)'
                    }}>
                        File Explorer
                    </span>
                </div>
            )}

            {/* Sidebar */}
            <div style={{
                width: isMobile ? (showSidebar ? '280px' : '0') : '200px',
                background: 'var(--bg)',
                borderRight: '1px solid var(--border)',
                padding: isMobile && !showSidebar ? '0' : '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: isMobile ? 'absolute' : 'relative',
                height: isMobile ? '100%' : 'auto',
                zIndex: isMobile ? 999 : 'auto',
                transition: isMobile ? 'width 0.3s ease' : 'none',
                overflow: 'hidden'
            }}>
                {/* Quick Access */}
                <div style={{
                    background: 'var(--card)',
                    borderRadius: '8px',
                    padding: '10px',
                    boxShadow: '0 1px 3px var(--shadow)'
                }}>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: 'var(--text-secondary)'
                    }}>
                        Quick access
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {quickAccessItems.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '6px 8px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    color: 'var(--text)',
                                    transition: '100ms'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--hover)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* This PC */}
                <div style={{
                    background: 'var(--card)',
                    borderRadius: '8px',
                    padding: '10px',
                    boxShadow: '0 1px 3px var(--shadow)'
                }}>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: 'var(--text-secondary)'
                    }}>
                        This PC
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {sidebarItems.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    navigateToFolder(item.path);
                                    if (isMobile) {
                                        setShowSidebar(false);
                                    }
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: isMobile ? '10px 12px' : '6px 8px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: isMobile ? '15px' : '13px',
                                    color: 'var(--text)',
                                    background: currentPath === item.path ? 'var(--hover)' : 'transparent',
                                    transition: '100ms',
                                    minHeight: isMobile ? '44px' : 'auto'
                                }}
                                onMouseEnter={(e) => {
                                    if (currentPath !== item.path) {
                                        e.currentTarget.style.backgroundColor = 'var(--hover-light)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (currentPath !== item.path) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                    }
                                }}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div style={{
                    background: 'var(--card)',
                    borderRadius: '8px',
                    padding: '10px',
                    boxShadow: '0 1px 3px var(--shadow)'
                }}>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        marginBottom: '8px',
                        color: 'var(--text-secondary)'
                    }}>
                        Tags
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {[
                            { color: '#ff4757', label: 'Red' },
                            { color: '#2ed573', label: 'Green' },
                            { color: '#3742fa', label: 'Blue' },
                            { color: '#ffa502', label: 'Orange' }
                        ].map((tag) => (
                            <div
                                key={tag.label}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '6px 8px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '13px',
                                    color: 'var(--text)',
                                    transition: '100ms'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--hover)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: tag.color
                                }} />
                                <span>{tag.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--bg-secondary)',
                overflow: 'hidden',
                marginTop: isMobile ? '50px' : '0',
                marginLeft: isMobile && showSidebar ? '280px' : '0',
                transition: isMobile ? 'margin-left 0.3s ease' : 'none'
            }}>
                {/* Toolbar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: isMobile ? '6px 8px' : '8px 12px',
                    background: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border)',
                    gap: isMobile ? '4px' : '8px',
                    flexWrap: isMobile ? 'wrap' : 'nowrap'
                }}>
                    <button
                        onClick={goBack}
                        disabled={historyIndex === 0}
                        style={{
                            padding: isMobile ? '8px' : '6px',
                            borderRadius: '4px',
                            border: 'none',
                            background: historyIndex === 0 ? 'var(--bg)' : 'var(--card)',
                            color: historyIndex === 0 ? 'var(--text-secondary)' : 'var(--text)',
                            cursor: historyIndex === 0 ? 'not-allowed' : 'pointer',
                            transition: '100ms',
                            minWidth: isMobile ? '40px' : 'auto',
                            minHeight: isMobile ? '40px' : 'auto'
                        }}
                        onMouseEnter={(e) => {
                            if (historyIndex !== 0) {
                                e.currentTarget.style.backgroundColor = 'var(--hover)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (historyIndex !== 0) {
                                e.currentTarget.style.backgroundColor = 'var(--card)';
                            }
                        }}
                    >
                        <ChevronLeft className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
                    </button>
                    <button
                        onClick={goForward}
                        disabled={historyIndex === history.length - 1}
                        style={{
                            padding: isMobile ? '8px' : '6px',
                            borderRadius: '4px',
                            border: 'none',
                            background: historyIndex === history.length - 1 ? 'var(--bg)' : 'var(--card)',
                            color: historyIndex === history.length - 1 ? 'var(--text-secondary)' : 'var(--text)',
                            cursor: historyIndex === history.length - 1 ? 'not-allowed' : 'pointer',
                            transition: '100ms',
                            minWidth: isMobile ? '40px' : 'auto',
                            minHeight: isMobile ? '40px' : 'auto'
                        }}
                        onMouseEnter={(e) => {
                            if (historyIndex !== history.length - 1) {
                                e.currentTarget.style.backgroundColor = 'var(--hover)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (historyIndex !== history.length - 1) {
                                e.currentTarget.style.backgroundColor = 'var(--card)';
                            }
                        }}
                    >
                        <ChevronRight className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
                    </button>
                    <button
                        onClick={goUp}
                        disabled={currentPath === 'This PC'}
                        style={{
                            padding: '6px',
                            borderRadius: '4px',
                            border: 'none',
                            background: 'var(--card)',
                            color: 'var(--text)',
                            cursor: currentPath === 'This PC' ? 'not-allowed' : 'pointer',
                            opacity: currentPath === 'This PC' ? 0.5 : 1,
                            transition: '100ms'
                        }}
                        onMouseEnter={(e) => {
                            if (currentPath !== 'This PC') {
                                e.currentTarget.style.backgroundColor = 'var(--hover)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (currentPath !== 'This PC') {
                                e.currentTarget.style.backgroundColor = 'var(--card)';
                            }
                        }}
                    >
                        <ArrowUp className="w-4 h-4" />
                    </button>

                    <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--card)',
                        borderRadius: '7px',
                        padding: isMobile ? '6px 10px' : '4px 8px',
                        height: isMobile ? '36px' : '32px',
                        overflow: 'hidden',
                        minWidth: isMobile ? '120px' : 'auto'
                    }}>
                        <HardDrive className={isMobile ? "w-5 h-5 mr-2" : "w-4 h-4 mr-2"} style={{ color: 'var(--text-secondary)' }} />
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            overflow: 'hidden',
                            fontSize: isMobile ? '15px' : '14px'
                        }}>
                            {pathSegments.map((segment, index) => (
                                <React.Fragment key={index}>
                                    <span
                                        onClick={() => {
                                            if (index === 0) {
                                                navigateToFolder('This PC');
                                            }
                                        }}
                                        style={{
                                            cursor: index === 0 ? 'pointer' : 'default',
                                            padding: '2px 5px',
                                            borderRadius: '4px',
                                            transition: '50ms',
                                            whiteSpace: 'nowrap'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (index === 0) {
                                                e.currentTarget.style.backgroundColor = 'var(--hover-light)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (index === 0) {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        {segment}
                                    </span>
                                    {index < pathSegments.length - 1 && (
                                        <ChevronRight className="w-3 h-3 mx-1" style={{ color: 'var(--text-secondary)', opacity: 0.6 }} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div style={{
                        position: 'relative',
                        minWidth: isMobile ? '100px' : '170px',
                        width: isMobile ? '30%' : '26%',
                        maxWidth: isMobile ? '200px' : '400px'
                    }}>
                        <Search className={isMobile ? "w-5 h-5" : "w-4 h-4"} style={{
                            position: 'absolute',
                            left: isMobile ? '10px' : '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-secondary)'
                        }} />
                        <input
                            type="text"
                            placeholder={isMobile ? "Search" : "Search"}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: isMobile ? '8px 10px 8px 35px' : '6px 8px 6px 30px',
                                border: '1px solid var(--border)',
                                borderRadius: '4px',
                                background: 'var(--card)',
                                color: 'var(--text)',
                                fontSize: isMobile ? '15px' : '14px',
                                outline: 'none',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                height: isMobile ? '36px' : 'auto'
                            }}
                        />
                    </div>

                    <div style={{
                        height: '20px',
                        width: '1px',
                        background: 'var(--border)',
                        margin: '0 4px'
                    }} />

                    <button
                        onClick={() => setViewMode('grid')}
                        style={{
                            padding: isMobile ? '8px' : '6px',
                            borderRadius: '4px',
                            border: 'none',
                            background: viewMode === 'grid' ? 'var(--hover)' : 'var(--card)',
                            color: 'var(--text)',
                            cursor: 'pointer',
                            transition: '100ms',
                            minWidth: isMobile ? '40px' : 'auto',
                            minHeight: isMobile ? '40px' : 'auto'
                        }}
                        onMouseEnter={(e) => {
                            if (viewMode !== 'grid') {
                                e.currentTarget.style.backgroundColor = 'var(--hover)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (viewMode !== 'grid') {
                                e.currentTarget.style.backgroundColor = 'var(--card)';
                            }
                        }}
                    >
                        <Grid className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        style={{
                            padding: isMobile ? '8px' : '6px',
                            borderRadius: '4px',
                            border: 'none',
                            background: viewMode === 'list' ? 'var(--hover)' : 'var(--card)',
                            color: 'var(--text)',
                            cursor: 'pointer',
                            transition: '100ms',
                            minWidth: isMobile ? '40px' : 'auto',
                            minHeight: isMobile ? '40px' : 'auto'
                        }}
                        onMouseEnter={(e) => {
                            if (viewMode !== 'list') {
                                e.currentTarget.style.backgroundColor = 'var(--hover)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (viewMode !== 'list') {
                                e.currentTarget.style.backgroundColor = 'var(--card)';
                            }
                        }}
                    >
                        <List className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
                    </button>
                    <button
                        onClick={goUp}
                        style={{
                            padding: isMobile ? '8px' : '6px',
                            borderRadius: '4px',
                            border: 'none',
                            background: 'var(--card)',
                            color: 'var(--text)',
                            cursor: 'pointer',
                            transition: '100ms',
                            minWidth: isMobile ? '40px' : 'auto',
                            minHeight: isMobile ? '40px' : 'auto'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--hover)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--card)';
                        }}
                    >
                        <ChevronUp className={isMobile ? "w-5 h-5" : "w-4 h-4"} />
                    </button>
                </div>

                {/* File List */}
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: isMobile ? '8px' : '10px',
                    background: 'var(--bg)'
                }}>
                    <div style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {filteredItems.length === 0 ? (
                            <div style={{
                                color: 'var(--text-secondary)',
                                textAlign: 'center',
                                padding: '40px',
                                fontSize: '14px'
                            }}>
                                {searchQuery ? 'No items match your search.' : 'This folder is empty.'}
                            </div>
                        ) : (
                            filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={(e) => {
                                        handleItemClick(item, e);
                                        if (isMobile && showSidebar) {
                                            setShowSidebar(false);
                                        }
                                    }}
                                    style={{
                                        width: '100%',
                                        padding: isMobile ? '8px 12px' : '2px 5px',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        border: '1.5px solid transparent',
                                        fontSize: isMobile ? '15px' : '14px',
                                        alignItems: 'center',
                                        height: isMobile ? '44px' : '30px',
                                        cursor: 'pointer',
                                        transition: '50ms',
                                        background: selectedItems.includes(item.id) ? 'var(--hover)' : 'transparent',
                                        color: 'var(--text)'
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!selectedItems.includes(item.id)) {
                                            e.currentTarget.style.backgroundColor = 'var(--hover-light)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!selectedItems.includes(item.id)) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                        }
                                    }}
                                >
                                    <div style={{
                                        width: isMobile ? (item.type === 'file' ? '26px' : '28px') : (item.type === 'file' ? '22px' : '25px'),
                                        height: isMobile ? (item.type === 'file' ? '26px' : '28px') : (item.type === 'file' ? '22px' : '25px'),
                                        marginLeft: item.type === 'file' ? (isMobile ? '4px' : '2px') : '0',
                                        marginRight: item.type === 'file' ? (isMobile ? '12px' : '7px') : (isMobile ? '10px' : '5px'),
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-secondary)'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <span style={{
                                        flex: 1,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {item.name}
                                    </span>
                                    {item.size && !isMobile && (
                                        <span style={{
                                            marginLeft: '10px',
                                            color: 'var(--text-secondary)',
                                            fontSize: '12px',
                                            minWidth: '60px',
                                            textAlign: 'right'
                                        }}>
                                            {item.size}
                                        </span>
                                    )}
                                    {!isMobile && (
                                        <span style={{
                                            marginLeft: '10px',
                                            color: 'var(--text-secondary)',
                                            fontSize: '12px',
                                            minWidth: '80px',
                                            textAlign: 'right'
                                        }}>
                                            {item.modified}
                                        </span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Status Bar */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: isMobile ? '6px 12px' : '4px 12px',
                    background: 'var(--bg-secondary)',
                    borderTop: '1px solid var(--border)',
                    fontSize: isMobile ? '13px' : '12px',
                    color: 'var(--text-secondary)',
                    flexWrap: isMobile ? 'wrap' : 'nowrap',
                    gap: isMobile ? '4px' : '0'
                }}>
                    <span style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {filteredItems.length} items
                        {selectedItems.length > 0 && ` (${selectedItems.length} selected)`}
                    </span>
                    {!isMobile && (
                        <span style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '50%'
                        }}>
                            {currentPath}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}