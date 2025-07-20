import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Github, Calendar, User, GraduationCap, Briefcase, Code, Target } from 'lucide-react';
import { useOS } from '../../context/OSContext';

export default function AboutApp() {
    const { openEdgeWithUrl } = useOS();
    const [isMobile, setIsMobile] = useState(false);

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

    const handleLinkClick = (url: string, e: React.MouseEvent) => {
        e.preventDefault();
        openEdgeWithUrl(url);
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: 'var(--bg)',
            color: 'var(--text)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: isMobile ? '10px' : '20px',
            overflow: 'auto'
        }}>
            <div style={{
                maxWidth: isMobile ? '100%' : '800px',
                margin: '0 auto'
            }}>
                <h1 style={{
                    fontSize: isMobile ? '24px' : '32px',
                    marginBottom: isMobile ? '20px' : '30px',
                    color: 'var(--text)',
                    textAlign: 'center'
                }}>
                    About Me
                </h1>

                <div style={{
                    display: 'grid',
                    gap: isMobile ? '15px' : '20px',
                    marginBottom: isMobile ? '20px' : '30px'
                }}>
                    <div style={{
                        background: 'var(--card)',
                        padding: isMobile ? '15px' : '20px',
                        borderRadius: isMobile ? '8px' : '12px',
                        border: '1px solid var(--border)'
                    }}>
                        <h2 style={{
                            fontSize: isMobile ? '20px' : '24px',
                            marginBottom: isMobile ? '10px' : '15px',
                            color: 'var(--text)'
                        }}>
                            Introduction
                        </h2>
                        <p style={{
                            lineHeight: '1.6',
                            color: 'var(--text-secondary)',
                            marginBottom: isMobile ? '10px' : '15px',
                            fontSize: isMobile ? '14px' : '16px'
                        }}>
                            Hello! I'm a motivated and eager-to-learn full-stack developer with experience in both frontend and backend web development.
                            I have completed an Associate Degree in Programming at AP University of Applied Arts and Sciences in Antwerp,
                            where I expanded my technical knowledge and practical skills.
                        </p>
                        <p style={{
                            lineHeight: '1.6',
                            color: 'var(--text-secondary)',
                            fontSize: isMobile ? '14px' : '16px'
                        }}>
                            I'm proficient in HTML, CSS, JavaScript and frameworks such as React and Vue 3, with knowledge of creating
                            user-friendly and scalable UIs. My backend experience includes working with Node.js, Express.js, C#, .NET,
                            and databases such as MySQL and PostgreSQL.
                        </p>
                    </div>

                    <div style={{
                        background: 'var(--card)',
                        padding: isMobile ? '15px' : '20px',
                        borderRadius: isMobile ? '8px' : '12px',
                        border: '1px solid var(--border)'
                    }}>
                        <h2 style={{
                            fontSize: isMobile ? '20px' : '24px',
                            marginBottom: isMobile ? '10px' : '15px',
                            color: 'var(--text)'
                        }}>
                            Current Focus
                        </h2>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: isMobile ? '10px' : '15px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '10px'
                            }}>
                                <span style={{ color: 'var(--accent)', fontSize: '18px' }}>🚀</span>
                                <div>
                                    <div style={{ color: 'var(--text)', fontWeight: '500', fontSize: isMobile ? '14px' : '16px' }}>Treffortly</div>
                                    <div style={{ fontSize: isMobile ? '12px' : '14px', color: 'var(--text-secondary)' }}>
                                        Working on developing and expanding this web application with modern technologies
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '10px'
                            }}>
                                <span style={{ color: 'var(--accent)', fontSize: '18px' }}>☁️</span>
                                <div>
                                    <div style={{ color: 'var(--text)', fontWeight: '500', fontSize: isMobile ? '14px' : '16px' }}>AWS Certificates</div>
                                    <div style={{ fontSize: isMobile ? '12px' : '14px', color: 'var(--text-secondary)' }}>
                                        Pursuing AWS certifications to enhance cloud computing expertise
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '10px'
                            }}>
                                <span style={{ color: 'var(--accent)', fontSize: '18px' }}>💼</span>
                                <div>
                                    <div style={{ color: 'var(--text)', fontWeight: '500', fontSize: isMobile ? '14px' : '16px' }}>Freelance Work</div>
                                    <div style={{ fontSize: isMobile ? '12px' : '14px', color: 'var(--text-secondary)' }}>
                                        Always open for new opportunities and projects. Contact me through email or contact form
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'var(--card)',
                        padding: isMobile ? '15px' : '20px',
                        borderRadius: isMobile ? '8px' : '12px',
                        border: '1px solid var(--border)'
                    }}>
                        <h2 style={{
                            fontSize: isMobile ? '20px' : '24px',
                            marginBottom: isMobile ? '10px' : '15px',
                            color: 'var(--text)'
                        }}>
                            Skills & Technologies
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: isMobile ? '10px' : '15px'
                        }}>
                            <div>
                                <h3 style={{
                                    color: 'var(--accent)',
                                    marginBottom: isMobile ? '8px' : '10px',
                                    fontSize: isMobile ? '14px' : '16px'
                                }}>
                                    Frontend
                                </h3>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0
                                }}>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px', fontSize: isMobile ? '12px' : '14px' }}>React</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px', fontSize: isMobile ? '12px' : '14px' }}>Vue 3</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px', fontSize: isMobile ? '12px' : '14px' }}>TypeScript</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px', fontSize: isMobile ? '12px' : '14px' }}>JavaScript</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px', fontSize: isMobile ? '12px' : '14px' }}>HTML5 & CSS3</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px', fontSize: isMobile ? '12px' : '14px' }}>Tailwind CSS</li>
                                </ul>
                            </div>
                            <div>
                                <h3 style={{
                                    color: 'var(--accent)',
                                    marginBottom: '10px',
                                    fontSize: '16px'
                                }}>
                                    Backend
                                </h3>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0
                                }}>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Node.js</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Express.js</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>C#</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>.NET</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Python</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Ruby on Rails</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Java</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>C++</li>
                                </ul>
                            </div>
                            <div>
                                <h3 style={{
                                    color: 'var(--accent)',
                                    marginBottom: '10px',
                                    fontSize: '16px'
                                }}>
                                    Databases & Tools
                                </h3>
                                <ul style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0
                                }}>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>MySQL</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>PostgreSQL</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>NoSQL</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Git & GitHub</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Docker</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>AWS</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Vercel</li>
                                    <li style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>Linux</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'var(--card)',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid var(--border)'
                    }}>
                        <h2 style={{
                            fontSize: '24px',
                            marginBottom: '15px',
                            color: 'var(--text)'
                        }}>
                            Featured Projects
                        </h2>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px'
                        }}>
                            <div>
                                <h4 style={{ color: 'var(--text)', fontWeight: '500', marginBottom: '5px' }}>AP Gaming & Dashboard</h4>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                                    Gaming community platform with administrative dashboard for user management.
                                </p>
                                <a
                                    href="https://ap-gaming.org"
                                    onClick={(e) => handleLinkClick('https://ap-gaming.org', e)}
                                    style={{ color: 'var(--accent)', fontSize: '14px', textDecoration: 'none', cursor: 'pointer' }}
                                >
                                    🔗 ap-gaming.org
                                </a>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--text)', fontWeight: '500', marginBottom: '5px' }}>Treffortly</h4>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                                    Web application demonstrating full-stack development capabilities.
                                </p>
                                <a
                                    href="https://treffortly.com"
                                    onClick={(e) => handleLinkClick('https://treffortly.com', e)}
                                    style={{ color: 'var(--accent)', fontSize: '14px', textDecoration: 'none', cursor: 'pointer' }}
                                >
                                    🔗 treffortly.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'var(--card)',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid var(--border)'
                    }}>
                        <h2 style={{
                            fontSize: '24px',
                            marginBottom: '15px',
                            color: 'var(--text)'
                        }}>
                            Contact Information
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '15px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '10px',
                                background: 'var(--bg-secondary)',
                                borderRadius: '8px'
                            }}>
                                <MapPin className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                                <div>
                                    <div style={{ color: 'var(--text)', fontWeight: '500' }}>Location</div>
                                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Netherlands</div>
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
                                <Mail className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                                <div>
                                    <div style={{ color: 'var(--text)', fontWeight: '500' }}>Email</div>
                                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>ehz@treffortly.com</div>
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
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '10px',
                                background: 'var(--bg-secondary)',
                                borderRadius: '8px'
                            }}>
                                <Github className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                                <div>
                                    <div style={{ color: 'var(--text)', fontWeight: '500' }}>GitHub</div>
                                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                        <a
                                            href="https://github.com/ehz"
                                            onClick={(e) => handleLinkClick('https://github.com/Wesleyvdk', e)}
                                            style={{ color: 'var(--accent)', textDecoration: 'none', cursor: 'pointer' }}
                                        >
                                            github.com/Wesleyvdk
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'var(--card)',
                        padding: '20px',
                        borderRadius: '12px',
                        border: '1px solid var(--border)'
                    }}>
                        <h2 style={{
                            fontSize: '24px',
                            marginBottom: '15px',
                            color: 'var(--text)'
                        }}>
                            Languages
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '15px'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
                                background: 'var(--bg-secondary)',
                                borderRadius: '8px'
                            }}>
                                <span style={{ color: 'var(--text)' }}>Dutch</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span style={{ color: 'var(--accent)' }}>★★★★★</span>
                                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Native</span>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
                                background: 'var(--bg-secondary)',
                                borderRadius: '8px'
                            }}>
                                <span style={{ color: 'var(--text)' }}>English</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span style={{ color: 'var(--accent)' }}>★★★★</span>
                                    <span style={{ color: 'var(--text-secondary)' }}>★</span>
                                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Professional</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}