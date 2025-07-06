import React, { useState, useEffect } from 'react';

interface Win12LoginScreenProps {
    onLogin: () => void;
}

export default function Win12LoginScreen({ onLogin }: Win12LoginScreenProps) {
    const [username] = useState('Administrator');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        // Add the spin animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes win12-spin {
                0% {
                    stroke-dasharray: 0.01px, 43.97px;
                    transform: rotate(0deg);
                }
                50% {
                    stroke-dasharray: 21.99px, 21.99px;
                    transform: rotate(450deg);
                }
                100% {
                    stroke-dasharray: 0.01px, 43.97px;
                    transform: rotate(1080deg);
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const handleLogin = () => {
        setIsLoggingIn(true);
        setTimeout(() => {
            onLogin();
        }, 1500);
    };

    return (
        <div
            className="fixed inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-in-out"
            style={{
                backgroundImage: 'url("/login.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
                backgroundRepeat: 'no-repeat',
                filter: isLoggingIn ? 'brightness(0)' : 'none',
                backgroundColor: isLoggingIn ? 'black' : 'transparent'
            }}
        >
            {/* User Avatar */}
            <div
                className="w-36 h-36 rounded-full mb-2.5 bg-gray-300 transition-all duration-500 -mt-9"
                style={{
                    backgroundImage: 'url("/icon/user.svg")',
                    backgroundSize: '65% 65%',
                    backgroundPosition: '50% 50%',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#ddd',
                    filter: isLoggingIn ? 'brightness(0)' : 'none'
                }}
            />

            {/* Username */}
            <div
                className="text-white text-3xl mb-4 transition-colors duration-500"
                style={{
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    color: isLoggingIn ? '#000' : '#fefefe'
                }}
            >
                {username}
            </div>

            {/* Login Button or Welcome message */}
            <div className="relative z-10 flex flex-col items-center">
                {!isLoggingIn ? (
                    <button
                        onClick={handleLogin}
                        className="transition-all duration-75 outline-none -mb-10 z-10"
                        style={{
                            backgroundColor: 'rgba(238, 238, 238, 0.25)',
                            width: '100px',
                            padding: '5.5px 8px',
                            color: '#fff',
                            borderRadius: '6px',
                            fontSize: '15.8px',
                            textAlign: 'center' as const,
                            border: '3px solid transparent',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'transparent';
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.filter = 'brightness(2)';
                            e.currentTarget.style.transform = 'scale(0.97)';
                            e.currentTarget.style.backgroundColor = 'rgba(238, 238, 238, 0.44)';
                            e.currentTarget.style.borderColor = 'transparent';
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.filter = 'none';
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.backgroundColor = 'rgba(238, 238, 238, 0.25)';
                        }}
                    >
                        →
                    </button>
                ) : (
                    <div className="h-24 flex flex-col items-center justify-center">
                        <div className="mb-1">
                            <svg className="w-12 h-12" viewBox="0 0 16 16">
                                <circle
                                    cx="8"
                                    cy="8"
                                    r="6"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeDasharray="21.99px, 21.99px"
                                    style={{
                                        animation: 'win12-spin 2.5s linear infinite'
                                    }}
                                />
                            </svg>
                        </div>
                        <p
                            className="text-center text-white text-xl transition-colors duration-500"
                            style={{
                                fontSize: '22px',
                                color: isLoggingIn ? '#000' : '#fff',
                                marginTop: '5px'
                            }}
                        >
                            Welcome
                        </p>
                    </div>
                )}
            </div>

            {/* Language selector (bottom right) */}
            <div className="absolute bottom-20 right-2.5 text-white">
                <div className="flex flex-col space-y-0">
                    <div className="flex items-center mb-1">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484-.08.08-.162.158-.242.234-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327z" />
                        </svg>
                    </div>
                    <button className="px-4 py-1 hover:bg-white hover:bg-opacity-10 rounded text-sm font-bold">
                        English
                    </button>
                </div>
            </div>

            {/* Power options (bottom right) */}
            <div className="absolute bottom-5 right-5 flex items-center text-white">
                <button
                    className="p-2 rounded-lg transition-all duration-100 hover:bg-white hover:bg-opacity-20 active:opacity-70"
                    style={{ fontSize: '30px' }}
                    title="Power Options"
                >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-3zM5.5 4a1.5 1.5 0 0 0 0 3h5a1.5 1.5 0 0 0 0-3h-5zM8 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
                    </svg>
                </button>
                <button
                    className="p-2 rounded-lg transition-all duration-100 hover:bg-white hover:bg-opacity-20 active:opacity-70 ml-2"
                    style={{ fontSize: '30px' }}
                    title="Restart"
                >
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
                        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                    </svg>
                </button>
            </div>
        </div>
    );
} 