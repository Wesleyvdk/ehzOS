export interface WindowState {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType<any>;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface DesktopIcon {
  id: string;
  title: string;
  icon: string;
  type: 'app' | 'file' | 'folder';
  position: { x: number; y: number };
  action: () => void;
}

export interface AppDefinition {
  id: string;
  title: string;
  icon: string;
  component: React.ComponentType<any>;
  defaultSize: { width: number; height: number };
  minSize?: { width: number; height: number };
  resizable?: boolean;
  category: 'portfolio' | 'system' | 'productivity' | 'media' | 'store' | 'utility';
  description?: string;
  version?: string;
  lastUpdated?: Date;
}

// Win12-inspired Widget System
export interface Widget {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  size: 'small' | 'medium' | 'large';
  position: { x: number; y: number };
  refreshInterval?: number;
  settings?: Record<string, any>;
}

// Win12-inspired File System
export interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  icon: string;
  size?: number;
  dateModified: Date;
  dateCreated: Date;
  parent?: string;
  content?: string;
  metadata?: Record<string, any>;
}

export interface OSState {
  windows: WindowState[];
  desktopIcons: DesktopIcon[];
  apps: AppDefinition[];
  widgets: Widget[];
  fileSystem: FileSystemItem[];
  theme: 'light' | 'dark';
  wallpaper: string;
  startMenuOpen: boolean;
  widgetsOpen: boolean;
  copilotOpen: boolean;
  contextMenu: {
    isOpen: boolean;
    position: { x: number; y: number };
    items: ContextMenuItem[];
  };
  currentTime: Date;
  systemInfo: {
    cpuUsage: number;
    memoryUsage: number;
    diskUsage: number;
    networkActivity: number;
  };
  notifications: Notification[];
  edgeInitialUrl?: string;
}

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: string;
  action: () => void;
  separator?: boolean;
  disabled?: boolean;
}

// Win12-inspired Notification System
export interface Notification {
  id: string;
  title: string;
  message: string;
  icon?: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  persistent?: boolean;
  actions?: Array<{
    label: string;
    action: () => void;
  }>;
}

export type OSAction = 
  | { type: 'OPEN_WINDOW'; payload: { appId: string } }
  | { type: 'CLOSE_WINDOW'; payload: { windowId: string } }
  | { type: 'MINIMIZE_WINDOW'; payload: { windowId: string } }
  | { type: 'MAXIMIZE_WINDOW'; payload: { windowId: string } }
  | { type: 'FOCUS_WINDOW'; payload: { windowId: string } }
  | { type: 'UPDATE_WINDOW_POSITION'; payload: { windowId: string; position: { x: number; y: number } } }
  | { type: 'UPDATE_WINDOW_SIZE'; payload: { windowId: string; size: { width: number; height: number } } }
  | { type: 'TOGGLE_START_MENU' }
  | { type: 'TOGGLE_WIDGETS' }
  | { type: 'TOGGLE_COPILOT' }
  | { type: 'OPEN_CONTEXT_MENU'; payload: { position: { x: number; y: number }; items: ContextMenuItem[] } }
  | { type: 'CLOSE_CONTEXT_MENU' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'CHANGE_WALLPAPER'; payload: { wallpaper: string } }
  | { type: 'UPDATE_TIME'; payload: { time: Date } }
  | { type: 'ADD_WIDGET'; payload: { widget: Widget } }
  | { type: 'REMOVE_WIDGET'; payload: { widgetId: string } }
  | { type: 'UPDATE_WIDGET_POSITION'; payload: { widgetId: string; position: { x: number; y: number } } }
  | { type: 'UPDATE_SYSTEM_INFO'; payload: { systemInfo: Partial<OSState['systemInfo']> } }
  | { type: 'ADD_NOTIFICATION'; payload: { notification: Notification } }
  | { type: 'REMOVE_NOTIFICATION'; payload: { notificationId: string } }
  | { type: 'SET_EDGE_INITIAL_URL'; payload: { url: string } };

export interface Wallpaper {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
}

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  action: () => void;
  description: string;
} 