import React, { useState, useEffect } from 'react';
import { useOS } from '../../context/OSContext';

export default function ResumeApp() {
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
        <div className={`${isMobile ? 'p-4' : 'p-6'} h-full bg-gray-900 text-white overflow-y-auto`}>
            <div className={`${isMobile ? '' : 'max-w-4xl mx-auto'}`}>
                <div className={`bg-gray-800 bg-opacity-80 ${isMobile ? 'rounded-lg p-4' : 'rounded-xl p-8'} border border-gray-700`}>

                    {/* Header Section */}
                    <div className={`text-center ${isMobile ? 'mb-6' : 'mb-8'}`}>
                        <h1 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold text-white mb-2`}>ehz</h1>
                        <p className={`${isMobile ? 'text-lg' : 'text-xl'} text-blue-400 mb-4`}>Full-Stack Developer</p>
                        <div className={`flex justify-center ${isMobile ? 'gap-4' : 'gap-6'} ${isMobile ? 'text-xs' : 'text-sm'} text-gray-300 flex-wrap`}>
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                Netherlands
                            </span>
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                </svg>
                                ehz@treffortly.com
                            </span>
                        </div>
                    </div>

                    {/* Professional Summary */}
                    <div className={`${isMobile ? 'mb-6' : 'mb-8'}`}>
                        <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-semibold text-white ${isMobile ? 'mb-3' : 'mb-4'} border-b border-gray-600 pb-2`}>Professional Summary</h2>
                        <p className={`text-gray-300 leading-relaxed ${isMobile ? 'text-sm' : ''}`}>
                            Motivated and eager to learn full-stack developer with experience in both frontend and backend web development.
                            Proficient in HTML, CSS, JavaScript and frameworks such as React and Vue 3, with knowledge of user-friendly and scalable UIs.
                            Experience with backend technologies such as Node.js, Express.js, C#, and databases such as MySQL and PostgreSQL (PSQL).
                            Worked on REST APIs, unit testing, and full web projects in team and independently. Strong in self-learning, and motivated
                            to continuously grow within a professional development team.
                        </p>
                    </div>

                    {/* Technical Skills */}
                    <div className={`${isMobile ? 'mb-6' : 'mb-8'}`}>
                        <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-semibold text-white ${isMobile ? 'mb-3' : 'mb-4'} border-b border-gray-600 pb-2`}>Technical Skills</h2>
                        <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-6'}`}>
                            <div>
                                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-blue-400 ${isMobile ? 'mb-2' : 'mb-3'}`}>Frontend Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`bg-blue-600 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>React</span>
                                    <span className={`bg-green-500 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>Vue 3</span>
                                    <span className={`bg-blue-500 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>TypeScript</span>
                                    <span className={`bg-yellow-500 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>JavaScript</span>
                                    <span className={`bg-orange-500 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>HTML5</span>
                                    <span className={`bg-blue-400 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>CSS3</span>
                                    <span className={`bg-cyan-500 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>Tailwind CSS</span>
                                </div>
                            </div>
                            <div>
                                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-blue-400 ${isMobile ? 'mb-2' : 'mb-3'}`}>Backend Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`bg-green-600 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>Node.js</span>
                                    <span className={`bg-red-600 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>Express.js</span>
                                    <span className={`bg-purple-600 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>C#</span>
                                    <span className={`bg-blue-700 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>.NET</span>
                                    <span className={`bg-indigo-600 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>Python</span>
                                    <span className={`bg-red-500 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>Ruby on Rails</span>
                                    <span className={`bg-orange-600 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>Java</span>
                                    <span className={`bg-gray-600 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>C++</span>
                                </div>
                            </div>
                        </div>
                        <div className={`${isMobile ? 'mt-4' : 'mt-6'}`}>
                            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-blue-400 ${isMobile ? 'mb-2' : 'mb-3'}`}>Databases & Tools</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className={`bg-blue-800 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>MySQL</span>
                                <span className={`bg-blue-900 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>PostgreSQL</span>
                                <span className={`bg-green-700 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>NoSQL</span>
                                <span className={`bg-gray-700 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>Git</span>
                                <span className={`bg-gray-800 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>GitHub</span>
                                <span className={`bg-blue-600 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>Docker</span>
                                <span className={`bg-orange-500 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>AWS</span>
                                <span className={`bg-purple-600 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>Vercel</span>
                                <span className={`bg-green-600 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>Netlify</span>
                                <span className={`bg-yellow-600 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>Webpack</span>
                                <span className={`bg-pink-600 ${isMobile ? 'px-2 py-1' : 'px-3 py-1'} rounded-lg text-xs text-white`}>Vite</span>
                            </div>
                        </div>
                    </div>

                    {/* Current Internship */}
                    <div className={`${isMobile ? 'mb-6' : 'mb-8'}`}>
                        <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-semibold text-white ${isMobile ? 'mb-3' : 'mb-4'} border-b border-gray-600 pb-2`}>Current Position</h2>
                        <div>
                            <div className={`${isMobile ? 'block' : 'flex justify-between items-start'} mb-2`}>
                                <h3 className={`${isMobile ? 'text-base' : 'text-xl'} font-semibold text-white`}>Full Stack Developer (Internship)</h3>
                                <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400`}>February 2025 - June 2025</span>
                            </div>
                            <p className={`text-blue-400 ${isMobile ? 'text-xs' : 'text-sm'} mb-3`}>TagLayer, Antwerpen</p>
                            <ul className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'} space-y-1 list-disc list-inside`}>
                                <li>Contributed to a large-scale Vue.js and TailwindCSS web application focusing on component development, UI consistency and implementing new features</li>
                                <li>Built a dynamic and reusable onboarding system and participated in a full-stack project to centralize templates using Express.js and a shared database</li>
                                <li>Written extensive unit tests for both Vue components and core JavaScript services to ensure application stability and maintainability</li>
                                <li>Participated in code reviews, incorporated feedback and improved legacy code through refactoring and modernization</li>
                                <li>Maintained a technical blog documenting progress and learning experiences on a weekly basis</li>
                            </ul>
                        </div>
                    </div>

                    {/* Featured Projects */}
                    <div className={`${isMobile ? 'mb-6' : 'mb-8'}`}>
                        <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-semibold text-white ${isMobile ? 'mb-3' : 'mb-4'} border-b border-gray-600 pb-2`}>Featured Projects</h2>
                        <div className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}>
                            <div>
                                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white mb-2`}>Treffortly</h3>
                                <p className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'} mb-2`}>
                                    Web application project demonstrating full-stack development capabilities.
                                </p>
                                <a
                                    href="https://treffortly.com"
                                    onClick={(e) => handleLinkClick('https://treffortly.com', e)}
                                    className={`text-blue-400 ${isMobile ? 'text-xs' : 'text-sm'} mb-2 cursor-pointer hover:text-blue-300 transition-colors`}
                                    style={{ display: 'block' }}
                                >
                                    🔗 treffortly.com
                                </a>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`bg-green-600 ${isMobile ? 'px-1 py-1' : 'px-2 py-1'} rounded text-xs`}>Full-Stack</span>
                                    <span className={`bg-blue-600 ${isMobile ? 'px-1 py-1' : 'px-2 py-1'} rounded text-xs`}>Web App</span>
                                </div>
                            </div>

                            <div>
                                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white mb-2`}>AP Gaming & Dashboard</h3>
                                <p className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'} mb-2`}>
                                    Gaming community platform with administrative dashboard for user management and content moderation.
                                </p>
                                <a
                                    href="https://ap-gaming.org"
                                    onClick={(e) => handleLinkClick('https://ap-gaming.org', e)}
                                    className={`text-blue-400 ${isMobile ? 'text-xs' : 'text-sm'} mb-2 cursor-pointer hover:text-blue-300 transition-colors`}
                                    style={{ display: 'block' }}
                                >
                                    🔗 ap-gaming.org
                                </a>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`bg-green-600 ${isMobile ? 'px-1 py-1' : 'px-2 py-1'} rounded text-xs`}>Community Platform</span>
                                    <span className={`bg-red-600 ${isMobile ? 'px-1 py-1' : 'px-2 py-1'} rounded text-xs`}>Dashboard</span>
                                    <span className={`bg-gray-700 ${isMobile ? 'px-1 py-1' : 'px-2 py-1'} rounded text-xs`}>GitHub</span>
                                </div>
                            </div>

                            <div>
                                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white mb-2`}>Dreamy Stories</h3>
                                <p className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'} mb-2`}>
                                    Creative web application project showcasing frontend development skills and user interface design.
                                </p>
                                <a
                                    href="https://github.com/DreamyCroissan"
                                    onClick={(e) => handleLinkClick('https://github.com/DreamyCroissan', e)}
                                    className={`text-blue-400 ${isMobile ? 'text-xs' : 'text-sm'} mb-2 cursor-pointer hover:text-blue-300 transition-colors`}
                                    style={{ display: 'block' }}
                                >
                                    🔗 GitHub: DreamyCroissan
                                </a>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`bg-purple-600 ${isMobile ? 'px-1 py-1' : 'px-2 py-1'} rounded text-xs`}>Creative App</span>
                                    <span className={`bg-blue-600 ${isMobile ? 'px-1 py-1' : 'px-2 py-1'} rounded text-xs`}>Frontend</span>
                                    <span className={`bg-gray-700 ${isMobile ? 'px-1 py-1' : 'px-2 py-1'} rounded text-xs`}>GitHub</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div className={`${isMobile ? 'mb-6' : 'mb-8'}`}>
                        <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-semibold text-white ${isMobile ? 'mb-3' : 'mb-4'} border-b border-gray-600 pb-2`}>Education</h2>
                        <div className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}>
                            <div>
                                <div className={`${isMobile ? 'block' : 'flex justify-between items-start'} mb-2`}>
                                    <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white`}>Associate Degree Programming</h3>
                                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400`}>September 2023 - June 2025</span>
                                </div>
                                <p className={`text-blue-400 ${isMobile ? 'text-xs' : 'text-sm'} mb-2`}>AP University of Applied Arts and Sciences, Antwerp</p>
                                <p className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Currently pursuing associate degree with focus on programming and software development.</p>
                            </div>

                            <div>
                                <div className={`${isMobile ? 'block' : 'flex justify-between items-start'} mb-2`}>
                                    <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-white`}>Graduate Mechanics</h3>
                                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400`}>September 2014 - June 2020</span>
                                </div>
                                <p className={`text-blue-400 ${isMobile ? 'text-xs' : 'text-sm'} mb-2`}>PITO, Stabroek</p>
                                <p className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>Technical education providing strong foundation in problem-solving and analytical thinking.</p>
                            </div>
                        </div>
                    </div>

                    {/* Languages */}
                    <div className={`${isMobile ? 'mb-6' : 'mb-8'}`}>
                        <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-semibold text-white ${isMobile ? 'mb-3' : 'mb-4'} border-b border-gray-600 pb-2`}>Languages</h2>
                        <div className={`${isMobile ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-2 gap-4'}`}>
                            <div className="flex justify-between items-center">
                                <span className={`text-gray-300 ${isMobile ? 'text-sm' : ''}`}>Dutch</span>
                                <div className="flex gap-1">
                                    <span className="text-yellow-400">★★★★★</span>
                                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400 ml-2`}>Native</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className={`text-gray-300 ${isMobile ? 'text-sm' : ''}`}>English</span>
                                <div className="flex gap-1">
                                    <span className="text-yellow-400">★★★★</span>
                                    <span className="text-gray-500">★</span>
                                    <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400 ml-2`}>Professional</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div>
                        <h2 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-semibold text-white ${isMobile ? 'mb-3' : 'mb-4'} border-b border-gray-600 pb-2`}>Personal Information</h2>
                        <div className={`${isMobile ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}`}>
                            <div className="flex justify-between items-center">
                                <span className={`text-gray-300 ${isMobile ? 'text-sm' : ''}`}>Date of Birth</span>
                                <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400`}>08/06/2002</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className={`text-gray-300 ${isMobile ? 'text-sm' : ''}`}>Driving License</span>
                                <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-400`}>Available</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}