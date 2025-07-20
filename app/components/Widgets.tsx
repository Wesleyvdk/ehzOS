import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, MoreHorizontal, Move, Trash2, ArrowRight } from 'lucide-react';
import { useOS } from '../context/OSContext';

interface Widget {
    id: string;
    title: string;
    type: 'calculator' | 'weather' | 'monitor' | 'news';
    size: 'small' | 'medium' | 'large';
    position: { x: number; y: number };
    enabled: boolean;
}

interface NewsArticle {
    title: string;
    content: string;
    author: string;
    date: string;
    time: string;
    readMoreUrl: string;
    imageUrl: string;
}

interface WidgetsProps {
    isVisible: boolean;
    onClose: () => void;
}

const Widgets: React.FC<WidgetsProps> = ({ isVisible, onClose }) => {
    const { state } = useOS();

    // Calculator state
    const [display, setDisplay] = useState('0');
    const [previousValue, setPreviousValue] = useState<number | null>(null);
    const [operation, setOperation] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    // Mobile detection state
    const [isMobile, setIsMobile] = useState(false);

    // System monitor state
    const [systemStats, setSystemStats] = useState({
        cpu: 45,
        memory: 62,
        disk: 78,
        network: 23
    });

    // News state
    const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
    const [newsLoading, setNewsLoading] = useState(false);

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Update system stats every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setSystemStats({
                cpu: Math.floor(Math.random() * 100),
                memory: Math.floor(Math.random() * 100),
                disk: Math.floor(Math.random() * 100),
                network: Math.floor(Math.random() * 100)
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    // Fetch news when widgets are opened
    useEffect(() => {
        const fetchNews = async () => {
            if (!isVisible) return;

            setNewsLoading(true);
            try {
                const response = await fetch('https://inshorts.deta.dev/news?category=technology');
                const data = await response.json();

                console.log('News API Response:', data); // Debug log

                // Handle different possible response formats
                let articles = [];
                if (data.success && data.data) {
                    articles = data.data;
                } else if (data.articles) {
                    articles = data.articles;
                } else if (Array.isArray(data)) {
                    articles = data;
                } else {
                    console.log('Unknown API response format:', data);
                }

                // Map the articles to our expected format
                const mappedArticles = articles.slice(0, 5).map((article: any, index: number) => ({
                    title: article.title || article.headline || 'No title',
                    content: article.content || article.description || article.summary || 'No content available',
                    author: article.author || article.source || 'Unknown',
                    date: article.date || article.publishedAt || new Date().toISOString().split('T')[0],
                    time: article.time || new Date().toLocaleTimeString(),
                    readMoreUrl: article.url || article.link || '#',
                    imageUrl: article.imageUrl || article.image || '/icon/files/txt.png'
                }));

                setNewsArticles(mappedArticles);
            } catch (error) {
                console.error('Failed to fetch news:', error);
                // Fallback news data
                setNewsArticles([
                    {
                        title: "Technology Advances in 2024",
                        content: "Major breakthroughs in AI and quantum computing are reshaping the tech landscape. Companies are investing heavily in machine learning and artificial intelligence to stay competitive.",
                        author: "Tech Reporter",
                        date: "2024-01-15",
                        time: "10:30 AM",
                        readMoreUrl: "#",
                        imageUrl: "/icon/files/txt.png"
                    },
                    {
                        title: "New JavaScript Framework Released",
                        content: "A new lightweight JavaScript framework promises to revolutionize web development with better performance and easier syntax for developers worldwide.",
                        author: "Web Developer",
                        date: "2024-01-14",
                        time: "2:15 PM",
                        readMoreUrl: "#",
                        imageUrl: "/icon/files/txt.png"
                    },
                    {
                        title: "Cloud Computing Trends",
                        content: "Cloud adoption continues to accelerate as businesses seek scalable solutions for their growing data needs and remote work requirements.",
                        author: "Cloud Analyst",
                        date: "2024-01-13",
                        time: "9:45 AM",
                        readMoreUrl: "#",
                        imageUrl: "/icon/files/txt.png"
                    }
                ]);
            } finally {
                setNewsLoading(false);
            }
        };

        fetchNews();
    }, [isVisible]);

    // Calculator functions
    const inputDigit = (num: string) => {
        if (waitingForOperand) {
            setDisplay(num);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === '0' ? num : display + num);
        }
    };

    const inputDecimal = () => {
        if (waitingForOperand) {
            setDisplay('0.');
            setWaitingForOperand(false);
        } else if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const clearAll = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    const clearEntry = () => {
        setDisplay('0');
    };

    const backspace = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
        } else {
            setDisplay('0');
        }
    };

    const performOperation = (nextOperator: string) => {
        const inputValue = parseFloat(display);

        if (previousValue === null) {
            setPreviousValue(inputValue);
        } else if (operation) {
            const currentValue = previousValue || 0;
            const newValue = performCalculation(currentValue, inputValue, operation);

            setDisplay(String(newValue));
            setPreviousValue(newValue);
        }

        setWaitingForOperand(true);
        setOperation(nextOperator);
    };

    const calculate = () => {
        const inputValue = parseFloat(display);

        if (previousValue !== null && operation) {
            const newValue = performCalculation(previousValue, inputValue, operation);
            setDisplay(String(newValue));
            setPreviousValue(null);
            setOperation(null);
            setWaitingForOperand(true);
        }
    };

    const performCalculation = (firstValue: number, secondValue: number, operation: string) => {
        switch (operation) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '*':
                return firstValue * secondValue;
            case '/':
                return firstValue / secondValue;
            default:
                return secondValue;
        }
    };

    const clearCalculator = () => {
        setDisplay('0');
        setPreviousValue(null);
        setOperation(null);
        setWaitingForOperand(false);
    };

    const addDecimal = () => {
        if (display.indexOf('.') === -1) {
            setDisplay(display + '.');
        }
    };

    const renderCalculatorWidget = () => (
        <div className="widget-item calculator-widget">
            <div className="widget-header">
                <h3>Calculator</h3>
                <button className="widget-menu-btn">
                    <MoreHorizontal size={12} />
                </button>
            </div>
            <input
                type="text"
                value={display}
                readOnly
                className="calculator-display"
            />
            <div className="calculator-buttons">
                <button className="calculator-btn" onClick={() => clearAll()}>C</button>
                <button className="calculator-btn" onClick={() => clearEntry()}>CE</button>
                <button className="calculator-btn" onClick={() => backspace()}>⌫</button>
                <button className="calculator-btn operator" onClick={() => performOperation('/')}>÷</button>

                <button className="calculator-btn" onClick={() => inputDigit('7')}>7</button>
                <button className="calculator-btn" onClick={() => inputDigit('8')}>8</button>
                <button className="calculator-btn" onClick={() => inputDigit('9')}>9</button>
                <button className="calculator-btn operator" onClick={() => performOperation('*')}>×</button>

                <button className="calculator-btn" onClick={() => inputDigit('4')}>4</button>
                <button className="calculator-btn" onClick={() => inputDigit('5')}>5</button>
                <button className="calculator-btn" onClick={() => inputDigit('6')}>6</button>
                <button className="calculator-btn operator" onClick={() => performOperation('-')}>−</button>

                <button className="calculator-btn" onClick={() => inputDigit('1')}>1</button>
                <button className="calculator-btn" onClick={() => inputDigit('2')}>2</button>
                <button className="calculator-btn" onClick={() => inputDigit('3')}>3</button>
                <button className="calculator-btn operator" onClick={() => performOperation('+')}>+</button>

                <button className="calculator-btn" onClick={() => inputDigit('0')} style={{ gridColumn: 'span 2' }}>0</button>
                <button className="calculator-btn" onClick={() => inputDecimal()}>.</button>
                <button className="calculator-btn equals" onClick={() => calculate()}>=</button>
            </div>
        </div>
    );

    const renderWeatherWidget = () => (
        <div className="widget-item weather-widget">
            <div className="widget-header">
                <h3>Weather</h3>
                <button className="widget-menu-btn">
                    <MoreHorizontal size={12} />
                </button>
            </div>
            <div className="weather-icon">☀️</div>
            <div className="weather-temp">22°C</div>
            <div className="weather-desc">Partly Cloudy</div>
            <div className="weather-details">
                <span>Humidity: 65%</span>
                <span>Wind: 8 mph</span>
            </div>
        </div>
    );

    const renderMonitorWidget = () => (
        <div className="widget-item monitor-widget">
            <div className="widget-header">
                <h3>System Monitor</h3>
                <button className="widget-menu-btn">
                    <MoreHorizontal size={12} />
                </button>
            </div>
            <div className="monitor-item">
                <span className="monitor-label">CPU</span>
                <span className="monitor-value">{systemStats.cpu}%</span>
            </div>
            <div className="monitor-bar">
                <div
                    className={`monitor-bar-fill ${systemStats.cpu > 80 ? 'critical' : systemStats.cpu > 60 ? 'high' : ''}`}
                    style={{ width: `${systemStats.cpu}%` }}
                />
            </div>

            <div className="monitor-item">
                <span className="monitor-label">Memory</span>
                <span className="monitor-value">{systemStats.memory}%</span>
            </div>
            <div className="monitor-bar">
                <div
                    className={`monitor-bar-fill ${systemStats.memory > 80 ? 'critical' : systemStats.memory > 60 ? 'high' : ''}`}
                    style={{ width: `${systemStats.memory}%` }}
                />
            </div>

            <div className="monitor-item">
                <span className="monitor-label">Disk</span>
                <span className="monitor-value">{systemStats.disk}%</span>
            </div>
            <div className="monitor-bar">
                <div
                    className={`monitor-bar-fill ${systemStats.disk > 80 ? 'critical' : systemStats.disk > 60 ? 'high' : ''}`}
                    style={{ width: `${systemStats.disk}%` }}
                />
            </div>

            <div className="monitor-item">
                <span className="monitor-label">Network</span>
                <span className="monitor-value">{systemStats.network}%</span>
            </div>
            <div className="monitor-bar">
                <div
                    className={`monitor-bar-fill ${systemStats.network > 80 ? 'critical' : systemStats.network > 60 ? 'high' : ''}`}
                    style={{ width: `${systemStats.network}%` }}
                />
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ 
                        opacity: 0, 
                        ...(isMobile ? { scale: 0.9 } : { y: 50 })
                    }}
                    animate={{ 
                        opacity: 1, 
                        ...(isMobile ? { scale: 1 } : { y: 0 })
                    }}
                    exit={{ 
                        opacity: 0, 
                        ...(isMobile ? { scale: 0.9 } : { y: 50 })
                    }}
                    transition={{ duration: 0.3, ease: [0.9, 0, 0.1, 1] }}
                    className={`widgets-panel ${state.theme === 'dark' ? 'dark' : ''} ${isMobile ? 'mobile-fullscreen' : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="widgets-section">
                        <div className="widgets-header">
                            <h2 className="widgets-title">Widgets</h2>
                            <button className="widget-menu-btn">
                                <Plus size={16} />
                            </button>
                        </div>
                        <div className="widgets-content">
                            <div className="widgets-grid">
                                {renderCalculatorWidget()}
                                {renderWeatherWidget()}
                                {renderMonitorWidget()}
                            </div>
                        </div>
                    </div>

                    <div className="widgets-divider"></div>

                    <div className="widgets-section">
                        <div className="widgets-header">
                            <h2 className="widgets-title">News</h2>
                            <button className="widget-menu-btn">
                                <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="widgets-content">
                            {newsLoading ? (
                                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
                                    <p>Loading news...</p>
                                </div>
                            ) : newsArticles.length > 0 ? (
                                <div className="news-list">
                                    {newsArticles.map((article, index) => (
                                        <div key={index} className="news-item">
                                            <div className="news-content">
                                                <h4 className="news-title">{article.title}</h4>
                                                <p className="news-excerpt">{article.content.substring(0, 120)}...</p>
                                                <div className="news-meta">
                                                    <span className="news-author">{article.author}</span>
                                                    <span className="news-time">{article.time}</span>
                                                </div>
                                            </div>
                                            {article.imageUrl && (
                                                <div className="news-image">
                                                    <img src={article.imageUrl} alt={article.title} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-secondary)' }}>
                                    <p>No news articles available</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        className="widget-menu-btn"
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: isMobile ? '20px' : '10px',
                            right: isMobile ? '20px' : '10px',
                            background: 'rgba(255, 255, 255, 0.8)',
                            borderRadius: '50%',
                            width: isMobile ? '40px' : '32px',
                            height: isMobile ? '40px' : '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1000
                        }}
                    >
                        <X size={isMobile ? 20 : 16} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Widgets;