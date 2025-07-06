import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image, Paperclip, Sparkles, User, Bot } from 'lucide-react';

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'copilot';
    timestamp: Date;
    type: 'text' | 'image' | 'file';
}

export default function CopilotApp() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: "Hello! I'm your AI assistant. I can help you with various tasks like answering questions, writing content, coding assistance, and more. How can I help you today?",
            sender: 'copilot',
            timestamp: new Date(),
            type: 'text'
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputText,
            sender: 'user',
            timestamp: new Date(),
            type: 'text'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "I understand your question. Let me help you with that.",
                "That's an interesting topic! Here's what I can tell you about it...",
                "I'd be happy to assist you with this. Based on what you've asked, I recommend...",
                "Great question! Let me break this down for you step by step.",
                "I can help you with that. Here are some suggestions and insights...",
                "This is a common question, and I have some useful information for you.",
                "Let me provide you with a comprehensive answer to your inquiry.",
                "I'm here to help! Based on your request, here's what I suggest..."
            ];

            const copilotMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: responses[Math.floor(Math.random() * responses.length)],
                sender: 'copilot',
                timestamp: new Date(),
                type: 'text'
            };

            setMessages(prev => [...prev, copilotMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const quickActions = [
        { icon: Sparkles, label: 'Generate Ideas', action: () => setInputText('Help me generate creative ideas for...') },
        { icon: Bot, label: 'Code Assistant', action: () => setInputText('Help me write code for...') },
        { icon: User, label: 'Writing Help', action: () => setInputText('Help me write...') },
        { icon: Image, label: 'Image Analysis', action: () => setInputText('Can you analyze this image...') }
    ];

    return (
        <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
            {/* Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Copilot</h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Your AI assistant</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.sender === 'user'
                            ? 'bg-blue-600 text-white rounded-l-lg rounded-tr-lg'
                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-r-lg rounded-tl-lg border border-gray-200 dark:border-gray-600'
                            } p-3 shadow-sm`}>
                            <div className="flex items-start space-x-2">
                                {message.sender === 'copilot' && (
                                    <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <Sparkles className="w-3 h-3 text-white" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <p className="text-sm leading-relaxed">{message.content}</p>
                                    <p className={`text-xs mt-1 ${message.sender === 'user'
                                        ? 'text-blue-100'
                                        : 'text-gray-500 dark:text-gray-400'
                                        }`}>
                                        {formatTime(message.timestamp)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-700 rounded-r-lg rounded-tl-lg border border-gray-200 dark:border-gray-600 p-3 shadow-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <Sparkles className="w-3 h-3 text-white" />
                                </div>
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Quick actions:</p>
                    <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action, index) => {
                            const Icon = action.icon;
                            return (
                                <button
                                    key={index}
                                    onClick={action.action}
                                    className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                                >
                                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300">{action.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex items-end space-x-2">
                    <div className="flex-1 relative">
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything..."
                            className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                            rows={1}
                            style={{ minHeight: '44px', maxHeight: '120px' }}
                        />
                        <div className="absolute right-2 bottom-2 flex space-x-1">
                            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <Paperclip className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <Image className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <Mic className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim()}
                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
} 