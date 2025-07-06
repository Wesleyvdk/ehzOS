import React, { useState, useRef, useEffect } from 'react';

export default function CameraApp() {
    const [isStreaming, setIsStreaming] = useState(false);
    const [photos, setPhotos] = useState<string[]>([]);
    const [activeMode, setActiveMode] = useState<'photo' | 'video'>('photo');
    const [flashMode, setFlashMode] = useState<'auto' | 'on' | 'off'>('auto');
    const [showPreview, setShowPreview] = useState(false);
    const [lastPhoto, setLastPhoto] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const startCamera = async () => {
        try {
            setIsStreaming(true);
            // Simulate camera stream with placeholder
        } catch (error) {
            console.error('Error accessing camera:', error);
            setIsStreaming(false);
        }
    };

    const stopCamera = () => {
        setIsStreaming(false);
    };

    const takePhoto = () => {
        if (!isStreaming) return;

        // Simulate taking a photo
        const photoId = `photo_${Date.now()}`;
        const newPhotoUrl = `data:image/svg+xml;base64,${btoa(`
            <svg width="640" height="480" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#bg)"/>
                <circle cx="320" cy="240" r="100" fill="white" opacity="0.8"/>
                <text x="320" y="250" text-anchor="middle" fill="white" font-size="16" font-family="Arial">
                    📸 Photo ${photos.length + 1}
                </text>
                <text x="320" y="280" text-anchor="middle" fill="white" font-size="12" font-family="Arial">
                    ${new Date().toLocaleString()}
                </text>
            </svg>
        `)}`;

        setPhotos(prev => [newPhotoUrl, ...prev]);
        setLastPhoto(newPhotoUrl);
        setShowPreview(true);

        // Hide preview after 3 seconds
        setTimeout(() => setShowPreview(false), 3000);
    };

    useEffect(() => {
        startCamera();
        return () => stopCamera();
    }, []);

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#000',
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            position: 'relative'
        }}>
            {/* Camera Viewfinder */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isStreaming ?
                    'linear-gradient(45deg, #667eea 0%, #764ba2 100%)' :
                    '#333',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {!isStreaming ? (
                    <div style={{
                        textAlign: 'center',
                        color: '#999'
                    }}>
                        <div style={{ fontSize: '64px', marginBottom: '20px' }}>📷</div>
                        <p>Camera not available</p>
                        <button
                            onClick={startCamera}
                            style={{
                                background: 'var(--accent)',
                                border: 'none',
                                color: 'white',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                marginTop: '16px'
                            }}
                        >
                            Enable Camera
                        </button>
                    </div>
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        {/* Simulated Camera Feed */}
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '48px'
                        }}>
                            📹 Live Preview
                        </div>

                        {/* Camera Grid Overlay */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `
                                linear-gradient(to right, transparent 33%, rgba(255,255,255,0.2) 33%, rgba(255,255,255,0.2) 33.5%, transparent 33.5%, transparent 66%, rgba(255,255,255,0.2) 66%, rgba(255,255,255,0.2) 66.5%, transparent 66.5%),
                                linear-gradient(to bottom, transparent 33%, rgba(255,255,255,0.2) 33%, rgba(255,255,255,0.2) 33.5%, transparent 33.5%, transparent 66%, rgba(255,255,255,0.2) 66%, rgba(255,255,255,0.2) 66.5%, transparent 66.5%)
                            `,
                            pointerEvents: 'none',
                            opacity: 0.5
                        }} />

                        {/* Focus Point */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '60px',
                            height: '60px',
                            border: '2px solid white',
                            borderRadius: '50%',
                            opacity: 0.6,
                            pointerEvents: 'none'
                        }} />
                    </div>
                )}

                {/* Flash Effect */}
                {showPreview && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'white',
                        opacity: 0.8,
                        animation: 'flash 0.2s ease-out',
                        pointerEvents: 'none'
                    }} />
                )}
            </div>

            {/* Top Controls */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10
            }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={() => setFlashMode(flashMode === 'auto' ? 'on' : flashMode === 'on' ? 'off' : 'auto')}
                        style={{
                            background: 'rgba(0,0,0,0.5)',
                            border: 'none',
                            color: 'white',
                            padding: '8px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            fontSize: '16px',
                            width: '40px',
                            height: '40px'
                        }}
                        title={`Flash: ${flashMode}`}
                    >
                        {flashMode === 'auto' ? '⚡' : flashMode === 'on' ? '💡' : '🚫'}
                    </button>
                </div>

                <div style={{
                    background: 'rgba(0,0,0,0.5)',
                    borderRadius: '20px',
                    padding: '4px',
                    display: 'flex'
                }}>
                    <button
                        onClick={() => setActiveMode('photo')}
                        style={{
                            background: activeMode === 'photo' ? 'white' : 'transparent',
                            color: activeMode === 'photo' ? 'black' : 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        📸 Photo
                    </button>
                    <button
                        onClick={() => setActiveMode('video')}
                        style={{
                            background: activeMode === 'video' ? 'white' : 'transparent',
                            color: activeMode === 'video' ? 'black' : 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        🎥 Video
                    </button>
                </div>

                <button
                    style={{
                        background: 'rgba(0,0,0,0.5)',
                        border: 'none',
                        color: 'white',
                        padding: '8px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '16px',
                        width: '40px',
                        height: '40px'
                    }}
                    title="Settings"
                >
                    ⚙️
                </button>
            </div>

            {/* Bottom Controls */}
            <div style={{
                background: 'rgba(0,0,0,0.8)',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Photo Gallery Preview */}
                <div
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '8px',
                        background: photos.length > 0 ? 'none' : 'rgba(255,255,255,0.1)',
                        border: '2px solid rgba(255,255,255,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        overflow: 'hidden'
                    }}
                    onClick={() => {
                        if (photos.length > 0) {
                            alert(`Gallery: ${photos.length} photos saved`);
                        }
                    }}
                >
                    {photos.length > 0 ? (
                        <img
                            src={photos[0]}
                            alt="Latest photo"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    ) : (
                        <span style={{ fontSize: '24px', opacity: 0.5 }}>📁</span>
                    )}
                </div>

                {/* Capture Button */}
                <button
                    onClick={takePhoto}
                    disabled={!isStreaming}
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: isStreaming ? 'white' : 'rgba(255,255,255,0.3)',
                        border: '4px solid rgba(255,255,255,0.8)',
                        cursor: isStreaming ? 'pointer' : 'not-allowed',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        transition: 'transform 100ms'
                    }}
                    onMouseDown={(e) => {
                        if (isStreaming) {
                            e.currentTarget.style.transform = 'scale(0.9)';
                        }
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    {activeMode === 'photo' ? '📸' : '🔴'}
                </button>

                {/* Switch Camera */}
                <button
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.1)',
                        border: '2px solid rgba(255,255,255,0.3)',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '20px'
                    }}
                    title="Switch camera"
                >
                    🔄
                </button>
            </div>

            {/* Photo Count Badge */}
            {photos.length > 0 && (
                <div style={{
                    position: 'absolute',
                    bottom: '100px',
                    right: '20px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '16px',
                    fontSize: '12px',
                    fontWeight: '500'
                }}>
                    {photos.length} photo{photos.length !== 1 ? 's' : ''} saved
                </div>
            )}

            <style>{`
                @keyframes flash {
                    0% { opacity: 0; }
                    50% { opacity: 0.8; }
                    100% { opacity: 0; }
                }
            `}</style>
        </div>
    );
} 