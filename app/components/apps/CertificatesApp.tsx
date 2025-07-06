import React from 'react';
import { Award, BookOpen, Target, Calendar, MapPin, GraduationCap } from 'lucide-react';

export default function CertificatesApp() {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'var(--bg)',
            color: 'var(--text)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '20px',
            overflow: 'auto'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                <h1 style={{
                    fontSize: '32px',
                    marginBottom: '30px',
                    color: 'var(--text)',
                    textAlign: 'center'
                }}>
                    Certificates & Education
                </h1>

                {/* Current Education */}
                <div style={{
                    background: 'var(--card)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        marginBottom: '15px'
                    }}>
                        <GraduationCap className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                        <div>
                            <h2 style={{
                                fontSize: '24px',
                                marginBottom: '5px',
                                color: 'var(--text)'
                            }}>
                                Associate Degree in Programming
                            </h2>
                            <p style={{
                                fontSize: '16px',
                                color: 'var(--text-secondary)',
                                margin: 0
                            }}>
                                AP University of Applied Arts and Sciences, Antwerp
                            </p>
                        </div>
                    </div>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '15px',
                        marginBottom: '15px'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px',
                            background: 'var(--bg-secondary)',
                            borderRadius: '8px'
                        }}>
                            <Calendar className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                            <div>
                                <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '500' }}>Duration</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>September 2023 - June 2025</div>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px',
                            background: 'var(--bg-secondary)',
                            borderRadius: '8px'
                        }}>
                            <Award className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                            <div>
                                <div style={{ fontSize: '14px', color: 'var(--text)', fontWeight: '500' }}>Status</div>
                                <div style={{ fontSize: '12px', color: 'var(--accent)' }}>Completed</div>
                            </div>
                        </div>
                    </div>
                    <p style={{
                        fontSize: '14px',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        margin: 0
                    }}>
                        Comprehensive program covering programming fundamentals, web development, database management,
                        and software engineering principles. Gained hands-on experience with modern development tools and methodologies.
                    </p>
                </div>

                {/* Certificates in Progress */}
                <div style={{
                    background: 'var(--card)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        marginBottom: '15px'
                    }}>
                        <Target className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                        <div>
                            <h2 style={{
                                fontSize: '24px',
                                marginBottom: '5px',
                                color: 'var(--text)'
                            }}>
                                Certificates in Progress
                            </h2>
                            <p style={{
                                fontSize: '16px',
                                color: 'var(--text-secondary)',
                                margin: 0
                            }}>
                                Currently working towards professional certifications
                            </p>
                        </div>
                    </div>

                    <div style={{
                        background: 'var(--bg-secondary)',
                        padding: '15px',
                        borderRadius: '8px',
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '10px'
                        }}>
                            <span style={{ fontSize: '20px' }}>☁️</span>
                            <h3 style={{
                                fontSize: '18px',
                                color: 'var(--text)',
                                margin: 0
                            }}>
                                AWS Certifications
                            </h3>
                        </div>
                        <p style={{
                            fontSize: '14px',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.6',
                            marginBottom: '10px'
                        }}>
                            Actively preparing for AWS certification exams to enhance cloud computing expertise and
                            demonstrate proficiency in cloud architecture and services.
                        </p>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}>
                            <div style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: 'var(--accent)',
                                animation: 'pulse 2s infinite'
                            }}></div>
                            <span style={{
                                fontSize: '12px',
                                color: 'var(--accent)',
                                fontWeight: '500'
                            }}>
                                In Progress
                            </span>
                        </div>
                    </div>
                </div>

                {/* Future Goals */}
                <div style={{
                    background: 'var(--card)',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid var(--border)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        marginBottom: '15px'
                    }}>
                        <BookOpen className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                        <div>
                            <h2 style={{
                                fontSize: '24px',
                                marginBottom: '5px',
                                color: 'var(--text)'
                            }}>
                                Future Certification Goals
                            </h2>
                            <p style={{
                                fontSize: '16px',
                                color: 'var(--text-secondary)',
                                margin: 0
                            }}>
                                Planned certifications to advance my career
                            </p>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gap: '10px'
                    }}>
                        {[
                            'AWS Certified Developer - Associate',
                            'AWS Certified Solutions Architect - Associate',
                            'Microsoft Azure Fundamentals',
                            'Google Cloud Professional Cloud Architect'
                        ].map((cert, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '10px',
                                background: 'var(--bg-secondary)',
                                borderRadius: '6px',
                                border: '1px solid var(--border)'
                            }}>
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    background: 'var(--text-secondary)',
                                    opacity: 0.5
                                }}></div>
                                <span style={{
                                    fontSize: '14px',
                                    color: 'var(--text-secondary)'
                                }}>
                                    {cert}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 