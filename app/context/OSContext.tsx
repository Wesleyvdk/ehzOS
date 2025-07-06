import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { OSState, OSAction, AppDefinition, WindowState, DesktopIcon, ContextMenuItem } from '../types/os';

// Import app components
import ProjectsApp from '../components/apps/ProjectsApp';
import ResumeApp from '../components/apps/ResumeApp';
import CertificatesApp from '../components/apps/CertificatesApp';
import BlogApp from '../components/apps/BlogApp';
import AboutApp from '../components/apps/AboutApp';
import ContactApp from '../components/apps/ContactApp';
import TerminalApp from '../components/apps/TerminalApp';
import SettingsApp from '../components/apps/SettingsApp';
// Enhanced Win12-inspired apps
import CalculatorApp from '../components/apps/CalculatorApp';
import NotepadApp from '../components/apps/NotepadApp';
import FileExplorerApp from '../components/apps/FileExplorerApp';
import TaskManagerApp from '../components/apps/TaskManagerApp';
import EdgeApp from '../components/apps/EdgeApp';
import CameraApp from '../components/apps/CameraApp';
import MSStoreApp from '../components/apps/MSStoreApp';
import DefenderApp from '../components/apps/DefenderApp';
import CopilotApp from '../components/apps/CopilotApp';
import MinesweeperApp from '../components/apps/MinesweeperApp';
import PythonEditorApp from '../components/apps/PythonEditorApp';
import RunApp from '../components/apps/RunApp';
import WhiteboardApp from '../components/apps/WhiteboardApp';
import WinverApp from '../components/apps/WinverApp';

// Helper function to determine if an icon is a path or emoji
export const isIconPath = (icon: string): boolean => {
    return icon.includes('/') || icon.includes('.');
};

// Win12-inspired wallpapers with proper variable support
const defaultWallpapers = [
    'var(--bgul)', // Win12 dynamic background system
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
];

// Enhanced Win12-inspired app definitions
const appDefinitions: AppDefinition[] = [
    // Portfolio Apps
    {
        id: 'projects',
        title: 'Projects',
        icon: 'icon/explorer.svg',
        component: ProjectsApp,
        defaultSize: { width: 800, height: 600 },
        minSize: { width: 400, height: 300 },
        resizable: true,
        category: 'portfolio',
        description: 'View my portfolio projects and work samples'
    },
    {
        id: 'resume',
        title: 'Resume',
        icon: 'icon/notepad.svg',
        component: ResumeApp,
        defaultSize: { width: 700, height: 800 },
        minSize: { width: 400, height: 500 },
        resizable: true,
        category: 'portfolio',
        description: 'Professional resume and experience'
    },
    {
        id: 'certificates',
        title: 'Certificates',
        icon: '🏆',
        component: CertificatesApp,
        defaultSize: { width: 900, height: 600 },
        minSize: { width: 500, height: 400 },
        resizable: true,
        category: 'portfolio',
        description: 'Professional certifications and achievements'
    },
    {
        id: 'blog',
        title: 'Blog',
        icon: 'icon/edge.svg',
        component: BlogApp,
        defaultSize: { width: 800, height: 700 },
        minSize: { width: 400, height: 300 },
        resizable: true,
        category: 'portfolio',
        description: 'Technical blog and articles'
    },
    {
        id: 'about',
        title: 'About Me',
        icon: 'icon/about.svg',
        component: AboutApp,
        defaultSize: { width: 600, height: 500 },
        minSize: { width: 400, height: 300 },
        resizable: true,
        category: 'portfolio',
        description: 'Learn more about my background'
    },
    {
        id: 'contact',
        title: 'Contact',
        icon: 'icon/feedback.svg',
        component: ContactApp,
        defaultSize: { width: 500, height: 600 },
        minSize: { width: 350, height: 400 },
        resizable: true,
        category: 'portfolio',
        description: 'Get in touch with me'
    },

    // System Apps (Win12-inspired)
    {
        id: 'terminal',
        title: 'Terminal',
        icon: 'icon/terminal.svg',
        component: TerminalApp,
        defaultSize: { width: 700, height: 500 },
        minSize: { width: 400, height: 300 },
        resizable: true,
        category: 'system',
        description: 'Command line interface with custom commands'
    },
    {
        id: 'settings',
        title: 'Settings',
        icon: 'icon/setting.svg',
        component: SettingsApp,
        defaultSize: { width: 800, height: 600 },
        minSize: { width: 500, height: 400 },
        resizable: true,
        category: 'system',
        description: 'System configuration and personalization'
    },
    {
        id: 'file-explorer',
        title: 'File Explorer',
        icon: 'icon/explorer.svg',
        component: FileExplorerApp,
        defaultSize: { width: 800, height: 600 },
        minSize: { width: 500, height: 400 },
        resizable: true,
        category: 'system',
        description: 'Browse files and folders'
    },
    {
        id: 'task-manager',
        title: 'Task Manager',
        icon: 'icon/taskmgr.png',
        component: TaskManagerApp,
        defaultSize: { width: 600, height: 500 },
        minSize: { width: 450, height: 350 },
        resizable: true,
        category: 'system',
        description: 'Monitor and manage system processes'
    },

    // Productivity Apps (Win12-inspired)
    {
        id: 'calculator',
        title: 'Calculator',
        icon: 'icon/calc.svg',
        component: CalculatorApp,
        defaultSize: { width: 350, height: 500 },
        minSize: { width: 300, height: 400 },
        resizable: false,
        category: 'productivity',
        description: 'Scientific calculator with advanced functions'
    },
    {
        id: 'notepad',
        title: 'Notepad',
        icon: 'icon/notepad.svg',
        component: NotepadApp,
        defaultSize: { width: 600, height: 400 },
        minSize: { width: 400, height: 300 },
        resizable: true,
        category: 'productivity',
        description: 'Simple text editor for notes and documents'
    },
    {
        id: 'edge',
        title: 'Microsoft Edge',
        icon: 'icon/edge.svg',
        component: EdgeApp,
        defaultSize: { width: 1000, height: 700 },
        minSize: { width: 600, height: 400 },
        resizable: true,
        category: 'productivity',
        description: 'Web browser with tabbed browsing'
    },

    // Media & Entertainment (Win12-inspired)
    {
        id: 'camera',
        title: 'Camera',
        icon: 'icon/camera.svg',
        component: CameraApp,
        defaultSize: { width: 640, height: 480 },
        minSize: { width: 480, height: 360 },
        resizable: true,
        category: 'media',
        description: 'Camera application for photos and videos'
    },

    // Store & Apps
    {
        id: 'ms-store',
        title: 'Microsoft Store',
        icon: 'icon/msstore.svg',
        component: MSStoreApp,
        defaultSize: { width: 900, height: 700 },
        minSize: { width: 600, height: 500 },
        resizable: true,
        category: 'store',
        description: 'App marketplace and software downloads'
    },
    {
        id: 'defender',
        title: 'Windows Security',
        icon: 'icon/defender.svg',
        component: DefenderApp,
        defaultSize: { width: 900, height: 700 },
        minSize: { width: 700, height: 500 },
        resizable: true,
        category: 'system',
        description: 'Windows Defender security center'
    },
    {
        id: 'copilot',
        title: 'Copilot',
        icon: 'icon/copilot.svg',
        component: CopilotApp,
        defaultSize: { width: 700, height: 600 },
        minSize: { width: 500, height: 400 },
        resizable: true,
        category: 'utility',
        description: 'AI assistant for productivity'
    },
    {
        id: 'minesweeper',
        title: 'Minesweeper',
        icon: 'icon/minesweeper.svg',
        component: MinesweeperApp,
        defaultSize: { width: 600, height: 700 },
        minSize: { width: 400, height: 500 },
        resizable: true,
        category: 'utility',
        description: 'Classic minesweeper game'
    },
    {
        id: 'python-editor',
        title: 'Python Editor',
        icon: 'icon/python.svg',
        component: PythonEditorApp,
        defaultSize: { width: 1000, height: 700 },
        minSize: { width: 800, height: 500 },
        resizable: true,
        category: 'productivity',
        description: 'Python code editor and runner'
    },
    {
        id: 'run',
        title: 'Run',
        icon: 'icon/run.svg',
        component: RunApp,
        defaultSize: { width: 400, height: 300 },
        minSize: { width: 350, height: 250 },
        resizable: false,
        category: 'system',
        description: 'Run programs and commands'
    },
    {
        id: 'whiteboard',
        title: 'Whiteboard',
        icon: 'icon/whiteboard.svg',
        component: WhiteboardApp,
        defaultSize: { width: 900, height: 700 },
        minSize: { width: 600, height: 400 },
        resizable: true,
        category: 'utility',
        description: 'Digital whiteboard for drawing'
    },
    {
        id: 'winver',
        title: 'About Windows',
        icon: 'icon/winver.svg',
        component: WinverApp,
        defaultSize: { width: 600, height: 500 },
        minSize: { width: 500, height: 400 },
        resizable: true,
        category: 'system',
        description: 'System information and version'
    }
];

// Desktop icons configuration
const createDesktopIcons = (openWindow: (appId: string) => void): DesktopIcon[] => [
    {
        id: 'projects-icon',
        title: 'Projects',
        icon: 'icon/fold_dark.svg',
        type: 'folder',
        position: { x: 50, y: 50 },
        action: () => openWindow('projects')
    },
    {
        id: 'resume-icon',
        title: 'Resume.pdf',
        icon: 'icon/office.png',
        type: 'file',
        position: { x: 50, y: 150 },
        action: () => openWindow('resume')
    },
    {
        id: 'certificates-icon',
        title: 'Certificates',
        icon: '🏆',
        type: 'folder',
        position: { x: 50, y: 250 },
        action: () => openWindow('certificates')
    },
    {
        id: 'blog-icon',
        title: 'Blog',
        icon: 'icon/edge.svg',
        type: 'app',
        position: { x: 180, y: 50 },
        action: () => openWindow('blog')
    },
    {
        id: 'about-icon',
        title: 'About Me',
        icon: 'icon/user.svg',
        type: 'app',
        position: { x: 180, y: 150 },
        action: () => openWindow('about')
    },
    {
        id: 'contact-icon',
        title: 'Contact',
        icon: 'icon/feedback.svg',
        type: 'app',
        position: { x: 180, y: 250 },
        action: () => openWindow('contact')
    }
];

// Initial state
const initialState: OSState = {
    windows: [],
    desktopIcons: [],
    apps: appDefinitions,
    widgets: [],
    fileSystem: [
        {
            id: 'root',
            name: 'C:',
            type: 'folder',
            icon: '💻',
            dateModified: new Date(),
            dateCreated: new Date(),
            metadata: { isRoot: true }
        },
        {
            id: 'documents',
            name: 'Documents',
            type: 'folder',
            icon: '📁',
            parent: 'root',
            dateModified: new Date(),
            dateCreated: new Date()
        },
        {
            id: 'pictures',
            name: 'Pictures',
            type: 'folder',
            icon: '🖼️',
            parent: 'root',
            dateModified: new Date(),
            dateCreated: new Date()
        },
        {
            id: 'downloads',
            name: 'Downloads',
            type: 'folder',
            icon: '📥',
            parent: 'root',
            dateModified: new Date(),
            dateCreated: new Date()
        }
    ],
    theme: 'light',
    wallpaper: defaultWallpapers[0],
    startMenuOpen: false,
    widgetsOpen: false,
    copilotOpen: false,
    contextMenu: {
        isOpen: false,
        position: { x: 0, y: 0 },
        items: []
    },
    currentTime: new Date(),
    systemInfo: {
        cpuUsage: 0,
        memoryUsage: 0,
        diskUsage: 0,
        networkActivity: 0
    },
    notifications: [],
    edgeInitialUrl: undefined
};

// Reducer
function osReducer(state: OSState, action: OSAction): OSState {
    switch (action.type) {
        case 'OPEN_WINDOW': {
            const app = state.apps.find(a => a.id === action.payload.appId);
            if (!app) return state;

            const existingWindow = state.windows.find(w => w.id === action.payload.appId);
            if (existingWindow) {
                return {
                    ...state,
                    windows: state.windows.map(w =>
                        w.id === action.payload.appId
                            ? { ...w, isMinimized: false, isFocused: true, zIndex: Math.max(...state.windows.map(win => win.zIndex)) + 1 }
                            : { ...w, isFocused: false }
                    )
                };
            }

            const newWindow: WindowState = {
                id: app.id,
                title: app.title,
                icon: app.icon,
                component: app.component,
                isOpen: true,
                isMinimized: false,
                isMaximized: false,
                isFocused: true,
                position: {
                    x: 100 + (state.windows.length * 30),
                    y: 100 + (state.windows.length * 30)
                },
                size: app.defaultSize,
                zIndex: Math.max(...state.windows.map(w => w.zIndex), 0) + 1
            };

            return {
                ...state,
                windows: [
                    ...state.windows.map(w => ({ ...w, isFocused: false })),
                    newWindow
                ]
            };
        }

        case 'CLOSE_WINDOW':
            return {
                ...state,
                windows: state.windows.filter(w => w.id !== action.payload.windowId)
            };

        case 'MINIMIZE_WINDOW':
            return {
                ...state,
                windows: state.windows.map(w =>
                    w.id === action.payload.windowId
                        ? { ...w, isMinimized: !w.isMinimized }
                        : w
                )
            };

        case 'MAXIMIZE_WINDOW':
            return {
                ...state,
                windows: state.windows.map(w =>
                    w.id === action.payload.windowId
                        ? { ...w, isMaximized: !w.isMaximized }
                        : w
                )
            };

        case 'FOCUS_WINDOW':
            return {
                ...state,
                windows: state.windows.map(w => ({
                    ...w,
                    isFocused: w.id === action.payload.windowId,
                    zIndex: w.id === action.payload.windowId
                        ? Math.max(...state.windows.map(win => win.zIndex)) + 1
                        : w.zIndex
                }))
            };

        case 'UPDATE_WINDOW_POSITION':
            return {
                ...state,
                windows: state.windows.map(w =>
                    w.id === action.payload.windowId
                        ? { ...w, position: action.payload.position }
                        : w
                )
            };

        case 'UPDATE_WINDOW_SIZE':
            return {
                ...state,
                windows: state.windows.map(w =>
                    w.id === action.payload.windowId
                        ? { ...w, size: action.payload.size }
                        : w
                )
            };

        case 'TOGGLE_START_MENU':
            return {
                ...state,
                startMenuOpen: !state.startMenuOpen,
                contextMenu: { ...state.contextMenu, isOpen: false }
            };

        case 'TOGGLE_WIDGETS':
            return {
                ...state,
                widgetsOpen: !state.widgetsOpen,
                copilotOpen: false,
                startMenuOpen: false,
                contextMenu: { ...state.contextMenu, isOpen: false }
            };

        case 'TOGGLE_COPILOT':
            return {
                ...state,
                copilotOpen: !state.copilotOpen,
                widgetsOpen: false,
                startMenuOpen: false,
                contextMenu: { ...state.contextMenu, isOpen: false }
            };

        case 'OPEN_CONTEXT_MENU':
            return {
                ...state,
                contextMenu: {
                    isOpen: true,
                    position: action.payload.position,
                    items: action.payload.items
                },
                startMenuOpen: false
            };

        case 'CLOSE_CONTEXT_MENU':
            return {
                ...state,
                contextMenu: { ...state.contextMenu, isOpen: false }
            };

        case 'TOGGLE_THEME':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            };

        case 'CHANGE_WALLPAPER':
            return {
                ...state,
                wallpaper: action.payload.wallpaper
            };

        case 'UPDATE_TIME':
            return {
                ...state,
                currentTime: action.payload.time
            };

        case 'SET_EDGE_INITIAL_URL':
            return {
                ...state,
                edgeInitialUrl: action.payload.url
            };

        default:
            return state;
    }
}

// Context
interface OSContextType {
    state: OSState;
    dispatch: React.Dispatch<OSAction>;
    openWindow: (appId: string) => void;
    openEdgeWithUrl: (url: string) => void;
    closeWindow: (windowId: string) => void;
    minimizeWindow: (windowId: string) => void;
    maximizeWindow: (windowId: string) => void;
    focusWindow: (windowId: string) => void;
    updateWindowPosition: (windowId: string, position: { x: number; y: number }) => void;
    updateWindowSize: (windowId: string, size: { width: number; height: number }) => void;
    toggleStartMenu: () => void;
    toggleWidgets: () => void;
    toggleCopilot: () => void;
    openContextMenu: (position: { x: number; y: number }, items: ContextMenuItem[]) => void;
    closeContextMenu: () => void;
    toggleTheme: () => void;
    changeWallpaper: (wallpaper: string) => void;
    setEdgeInitialUrl: (url: string) => void;
}

const OSContext = createContext<OSContextType | undefined>(undefined);

// Provider component
export function OSProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(osReducer, initialState);

    // Action creators
    const openWindow = useCallback((appId: string) => {
        dispatch({ type: 'OPEN_WINDOW', payload: { appId } });
    }, []);

    const openEdgeWithUrl = useCallback((url: string) => {
        // Close existing Edge windows first
        dispatch({ type: 'CLOSE_WINDOW', payload: { windowId: 'edge' } });

        // Set the initial URL in the state
        dispatch({ type: 'SET_EDGE_INITIAL_URL', payload: { url } });

        // Open Edge with the URL
        setTimeout(() => {
            dispatch({ type: 'OPEN_WINDOW', payload: { appId: 'edge' } });
        }, 100);
    }, []);

    const closeWindow = useCallback((windowId: string) => {
        dispatch({ type: 'CLOSE_WINDOW', payload: { windowId } });
    }, []);

    const minimizeWindow = useCallback((windowId: string) => {
        dispatch({ type: 'MINIMIZE_WINDOW', payload: { windowId } });
    }, []);

    const maximizeWindow = useCallback((windowId: string) => {
        dispatch({ type: 'MAXIMIZE_WINDOW', payload: { windowId } });
    }, []);

    const focusWindow = useCallback((windowId: string) => {
        dispatch({ type: 'FOCUS_WINDOW', payload: { windowId } });
    }, []);

    const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
        dispatch({ type: 'UPDATE_WINDOW_POSITION', payload: { windowId, position } });
    }, []);

    const updateWindowSize = useCallback((windowId: string, size: { width: number; height: number }) => {
        dispatch({ type: 'UPDATE_WINDOW_SIZE', payload: { windowId, size } });
    }, []);

    const toggleStartMenu = useCallback(() => {
        dispatch({ type: 'TOGGLE_START_MENU' });
    }, []);

    const toggleWidgets = useCallback(() => {
        dispatch({ type: 'TOGGLE_WIDGETS' });
    }, []);

    const toggleCopilot = useCallback(() => {
        dispatch({ type: 'TOGGLE_COPILOT' });
    }, []);

    const openContextMenu = useCallback((position: { x: number; y: number }, items: ContextMenuItem[]) => {
        dispatch({ type: 'OPEN_CONTEXT_MENU', payload: { position, items } });
    }, []);

    const closeContextMenu = useCallback(() => {
        dispatch({ type: 'CLOSE_CONTEXT_MENU' });
    }, []);

    const toggleTheme = useCallback(() => {
        dispatch({ type: 'TOGGLE_THEME' });
    }, []);

    const changeWallpaper = useCallback((wallpaper: string) => {
        dispatch({ type: 'CHANGE_WALLPAPER', payload: { wallpaper } });
    }, []);

    const setEdgeInitialUrl = useCallback((url: string) => {
        dispatch({ type: 'SET_EDGE_INITIAL_URL', payload: { url } });
    }, []);

    // Initialize desktop icons
    useEffect(() => {
        const icons = createDesktopIcons(openWindow);
        dispatch({ type: 'UPDATE_TIME', payload: { time: new Date() } });
        // We would need to add an action to set desktop icons, for now they're in initial state
    }, [openWindow]);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({ type: 'UPDATE_TIME', payload: { time: new Date() } });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Apply theme to document
    useEffect(() => {
        document.documentElement.className = `win12-theme ${state.theme}`;
    }, [state.theme]);

    const contextValue: OSContextType = {
        state,
        dispatch,
        openWindow,
        openEdgeWithUrl,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        updateWindowSize,
        toggleStartMenu,
        toggleWidgets,
        toggleCopilot,
        openContextMenu,
        closeContextMenu,
        toggleTheme,
        changeWallpaper,
        setEdgeInitialUrl
    };

    return (
        <OSContext.Provider value={contextValue}>
            {children}
        </OSContext.Provider>
    );
}

// Hook
export function useOS() {
    const context = useContext(OSContext);
    if (context === undefined) {
        throw new Error('useOS must be used within an OSProvider');
    }
    return context;
} 