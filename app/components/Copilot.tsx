import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Info, ChevronRight } from 'lucide-react';
import { useOS } from '../context/OSContext';

interface ChatMessage {
    id: string;
    role: 'user' | 'ai' | 'system';
    content: string;
    timestamp: Date;
    actions?: Array<{
        type: string;
        data: any;
    }>;
}

interface CopilotProps {
    isVisible: boolean;
    onClose: () => void;
}

const Copilot: React.FC<CopilotProps> = ({ isVisible, onClose }) => {
    const { state, openWindow, toggleTheme } = useOS();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);

    // Initialize Copilot
    const initializeCopilot = () => {
        const welcomeMessage: ChatMessage = {
            id: 'welcome',
            role: 'ai',
            content: 'Welcome to ehzOS 12 Copilot! How can I help you today?',
            timestamp: new Date()
        };

        const systemMessage: ChatMessage = {
            id: 'system-info',
            role: 'system',
            content: 'Copilot is ready. You can ask me to open apps, change themes, or get system information.',
            timestamp: new Date()
        };

        setMessages([welcomeMessage, systemMessage]);
        setIsInitialized(true);
    };

    // Send message
    const sendMessage = async (content: string) => {
        if (!content.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: content.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // Simulate AI processing delay
        setTimeout(() => {
            const aiResponse = processUserMessage(content);
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1000);
    };

    // Process user message and generate appropriate response
    const processUserMessage = (content: string): ChatMessage => {
        const lowerContent = content.toLowerCase();
        let response = '';
        let actions: Array<{ type: string; data: any }> = [];

        // Handle app opening commands
        if (lowerContent.includes('open') || lowerContent.includes('launch') || lowerContent.includes('start')) {
            if (lowerContent.includes('project') || lowerContent.includes('portfolio')) {
                response = 'Opening your projects showcase for you.';
                actions.push({ type: 'openapp', data: 'projects' });
            } else if (lowerContent.includes('resume') || lowerContent.includes('cv')) {
                response = 'Opening your resume application.';
                actions.push({ type: 'openapp', data: 'resume' });
            } else if (lowerContent.includes('certificate') || lowerContent.includes('cert')) {
                response = 'Opening your certificates application.';
                actions.push({ type: 'openapp', data: 'certificates' });
            } else if (lowerContent.includes('blog') || lowerContent.includes('post')) {
                response = 'Opening your blog application.';
                actions.push({ type: 'openapp', data: 'blog' });
            } else if (lowerContent.includes('about') || lowerContent.includes('info')) {
                response = 'Opening the About Me application.';
                actions.push({ type: 'openapp', data: 'about' });
            } else if (lowerContent.includes('contact') || lowerContent.includes('reach')) {
                response = 'Opening your contact information.';
                actions.push({ type: 'openapp', data: 'contact' });
            } else if (lowerContent.includes('setting') || lowerContent.includes('config')) {
                response = 'Opening system settings for you.';
                actions.push({ type: 'openapp', data: 'settings' });
            } else if (lowerContent.includes('calculator') || lowerContent.includes('calc')) {
                response = 'Opening the calculator application.';
                actions.push({ type: 'openapp', data: 'calculator' });
            } else if (lowerContent.includes('notepad') || lowerContent.includes('note')) {
                response = 'Opening the notepad application.';
                actions.push({ type: 'openapp', data: 'notepad' });
            } else if (lowerContent.includes('file') || lowerContent.includes('explorer')) {
                response = 'Opening the file explorer.';
                actions.push({ type: 'openapp', data: 'file-explorer' });
            } else if (lowerContent.includes('browser') || lowerContent.includes('edge')) {
                response = 'Opening Microsoft Edge browser.';
                actions.push({ type: 'openapp', data: 'edge' });
            } else {
                response = 'I couldn\'t identify which app you want to open. Try saying "open projects", "open resume", etc.';
            }
        }
        // Handle theme switching
        else if (lowerContent.includes('theme') || lowerContent.includes('dark') || lowerContent.includes('light') || lowerContent.includes('switch')) {
            if (lowerContent.includes('dark')) {
                if (state.theme === 'dark') {
                    response = 'The system is already in dark mode.';
                } else {
                    response = 'Switching to dark mode for you.';
                    actions.push({ type: 'settheme', data: 'dark' });
                }
            } else if (lowerContent.includes('light')) {
                if (state.theme === 'light') {
                    response = 'The system is already in light mode.';
                } else {
                    response = 'Switching to light mode for you.';
                    actions.push({ type: 'settheme', data: 'light' });
                }
            } else {
                response = 'Switching the theme for you.';
                actions.push({ type: 'settheme', data: state.theme === 'dark' ? 'light' : 'dark' });
            }
        }
        // Handle system information
        else if (lowerContent.includes('system') || lowerContent.includes('info') || lowerContent.includes('about system')) {
            response = `Current system information:
- Operating System: ehzOS 12 Portfolio Edition
- Theme Mode: ${state.theme === 'dark' ? 'Dark' : 'Light'}
- Running Apps: ${state.windows.length}
- Developer: ehzOS Team`;
        }
        // Handle time and date
        else if (lowerContent.includes('time') || lowerContent.includes('date') || lowerContent.includes('clock')) {
            const now = new Date();
            response = `Current time: ${now.toLocaleTimeString()}
Current date: ${now.toLocaleDateString()}`;
        }
        // Handle weather
        else if (lowerContent.includes('weather') || lowerContent.includes('temperature')) {
            response = 'Current weather: 22°C, Partly Cloudy\nHumidity: 65%, Wind: 8 mph\n\nYou can also check the weather widget for more details.';
        }
        // Handle calculator
        else if (lowerContent.includes('calculate') || lowerContent.includes('math')) {
            response = 'I can help you with calculations! You can either:\n1. Open the calculator app by saying "open calculator"\n2. Use the calculator widget in the widgets panel\n3. Ask me simple math questions like "what is 2 + 2?"';
        }
        // Handle greetings
        else if (lowerContent.includes('hello') || lowerContent.includes('hi') || lowerContent.includes('hey')) {
            response = 'Hello! I\'m your ehzOS 12 Copilot assistant. I can help you open applications, change system settings, and answer questions about your system.';
        }
        // Handle help
        else if (lowerContent.includes('help') || lowerContent.includes('what can you do')) {
            response = `I can help you with:
1. Opening applications (projects, resume, certificates, blog, etc.)
2. Switching system themes (dark/light mode)
3. Getting system information
4. Checking time and date
5. Basic conversations

Try saying "open projects" or "switch theme" to get started!`;
        }
        // Handle simple math
        else if (lowerContent.includes('what is') && (lowerContent.includes('+') || lowerContent.includes('-') || lowerContent.includes('*') || lowerContent.includes('/'))) {
            try {
                const mathExpression = content.replace(/what is/i, '').trim();
                const result = eval(mathExpression.replace(/x/g, '*'));
                response = `The answer is: ${result}`;
            } catch (error) {
                response = 'I couldn\'t calculate that. Please try a simpler expression or use the calculator app.';
            }
        }
        // Default response
        else {
            const responses = [
                'I understand, but my capabilities are focused on app management and system controls. Try asking me to open an app or change the theme.',
                'I might not fully understand that request. I can help with opening applications, changing themes, and system information.',
                'I\'m still learning! Currently, I can help with app management, theme switching, and basic system tasks.',
                'Thanks for your patience! I specialize in app management and system controls. Try "open projects" or "switch theme".'
            ];
            response = responses[Math.floor(Math.random() * responses.length)];
        }

        // Execute actions
        actions.forEach(action => {
            switch (action.type) {
                case 'openapp':
                    setTimeout(() => openWindow(action.data), 500);
                    break;
                case 'settheme':
                    if ((action.data === 'dark' && state.theme !== 'dark') ||
                        (action.data === 'light' && state.theme !== 'light')) {
                        setTimeout(() => toggleTheme(), 500);
                    }
                    break;
            }
        });

        return {
            id: `ai-${Date.now()}`,
            role: 'ai',
            content: response,
            timestamp: new Date(),
            actions
        };
    };

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    // Handle Enter key
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(inputValue);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    id="copilot"
                    initial={{ opacity: 0, x: 410 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 410 }}
                    transition={{ duration: 0.3, ease: [0.9, 0, 0.1, 1] }}
                    className="fixed right-2 top-2 w-96 h-[calc(100vh-80px)] bg-var(--bg70) backdrop-blur-[60px] saturate-[3] contrast-[0.6] rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col border-2 border-[#6f6f6f30]"
                >
                    {/* Title bar */}
                    <div className="titbar h-10 flex items-center px-3 min-h-10">
                        <p className="text text-lg font-medium">ehzOS 12 Copilot</p>
                        <div className="alr flex-1 flex justify-end gap-1">
                            <button
                                className="btn w-8 h-8 flex items-center justify-center rounded hover:bg-var(--hover) transition-colors"
                                onClick={() => alert('ehzOS AI Copilot 3.0 - Supports app management and theme switching')}
                            >
                                <Info className="w-4 h-4" />
                            </button>
                            <button
                                className="btn hide w-8 h-8 flex items-center justify-center rounded hover:bg-var(--hover) transition-colors"
                                onClick={onClose}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Promotional banner */}
                    <div className="px-4 py-2 bg-gradient-to-r from-[#bd68e8] to-[#2a489c] text-white text-sm">
                        AI Copilot 3.0 now available with app management and system control
                    </div>

                    {/* Chat area */}
                    <div
                        ref={chatRef}
                        className="chat flex-1 p-4 overflow-y-auto overflow-x-hidden scroll-smooth"
                    >
                        {!isInitialized ? (
                            <div className="flex flex-col items-center justify-center h-full">
                                <button
                                    onClick={initializeCopilot}
                                    className="btn button px-4 py-2 bg-var(--theme-2) text-white rounded-lg hover:bg-var(--theme-1) transition-colors"
                                >
                                    Start Conversation
                                </button>
                                <p className="text-sm text-var(--text2) mt-4 text-center">
                                    Click the "<Info className="inline w-4 h-4" />" button above to learn about usage
                                </p>
                            </div>
                        ) : (
                            <>
                                {messages.map((message) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`line w-full flex mt-4 ${message.role === 'user' ? 'flex-row-reverse' : ''
                                            }`}
                                    >
                                        <div
                                            className={`text max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed ${message.role === 'user'
                                                ? 'bg-var(--theme-2) text-white ml-4'
                                                : message.role === 'ai'
                                                    ? 'bg-var(--bg) border border-var(--bd) text-var(--text) mr-4'
                                                    : 'bg-var(--hover) text-var(--text2) text-xs italic mx-auto'
                                                }`}
                                        >
                                            {message.content}
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="line w-full flex mt-4"
                                    >
                                        <div className="text max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed bg-var(--bg) border border-var(--bd) text-var(--text) mr-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-var(--theme-2) rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-var(--theme-2) rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-var(--theme-2) rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Input area */}
                    {isInitialized && (
                        <div className="inputbox p-4 border-t border-var(--bd) bg-var(--bg50)">
                            <div className="flex gap-2 items-end">
                                <textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Ask me anything..."
                                    className="input flex-1 px-3 py-2 border border-var(--bd) rounded-lg bg-var(--bg) text-var(--text) text-sm outline-none transition-colors resize-none min-h-[40px] max-h-[120px]"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={() => sendMessage(inputValue)}
                                    disabled={!inputValue.trim() || isLoading}
                                    className="send w-10 h-10 bg-var(--theme-2) text-white rounded-full flex items-center justify-center hover:bg-var(--theme-1) transition-colors disabled:bg-var(--hover) disabled:text-var(--text2) disabled:cursor-not-allowed"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Copilot; 