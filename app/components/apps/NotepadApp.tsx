import React, { useState } from 'react';

export default function NotepadApp() {
    const [content, setContent] = useState('Welcome to Notepad!\n\nStart typing your notes here...');
    const [fileName, setFileName] = useState('Untitled.txt');
    const [isModified, setIsModified] = useState(false);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        setIsModified(true);
    };

    const handleSave = () => {
        // Simulate saving
        setIsModified(false);
        alert(`File "${fileName}" saved successfully!`);
    };

    const handleNew = () => {
        if (isModified && !confirm('You have unsaved changes. Are you sure you want to create a new file?')) {
            return;
        }
        setContent('');
        setFileName('Untitled.txt');
        setIsModified(false);
    };

    const handleOpen = () => {
        // Simulate opening a file
        const demoContent = `Portfolio Notes
==================

📁 Projects to showcase:
- React/TypeScript applications
- Full-stack web development
- UI/UX design projects
- Open source contributions

💡 Skills to highlight:
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, databases
- Tools: Git, Docker, CI/CD
- Design: Figma, Adobe Creative Suite

📧 Contact information:
- Email: your.email@example.com
- LinkedIn: linkedin.com/in/yourprofile
- GitHub: github.com/yourusername

🎯 Career objectives:
- Seeking full-stack developer role
- Interested in modern web technologies
- Passionate about user experience
- Open to remote opportunities`;

        setContent(demoContent);
        setFileName('portfolio-notes.txt');
        setIsModified(false);
    };

    const getWordCount = () => {
        return content.trim().split(/\s+/).filter(word => word.length > 0).length;
    };

    const getCharCount = () => {
        return content.length;
    };

    const getLineCount = () => {
        return content.split('\n').length;
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg)',
            color: 'var(--text)',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {/* Menu Bar */}
            <div style={{
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border)',
                padding: '8px 16px',
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                fontSize: '14px'
            }}>
                <button
                    onClick={handleNew}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text)',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        borderRadius: '4px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                    📄 New
                </button>
                <button
                    onClick={handleOpen}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text)',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        borderRadius: '4px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                    📂 Open
                </button>
                <button
                    onClick={handleSave}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text)',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        borderRadius: '4px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                >
                    💾 Save
                </button>
                <div style={{ marginLeft: 'auto', fontSize: '12px', opacity: '0.7' }}>
                    {fileName}{isModified ? ' *' : ''}
                </div>
            </div>

            {/* Text Editor */}
            <textarea
                value={content}
                onChange={handleContentChange}
                style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '20px',
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontSize: '14px',
                    fontFamily: 'Consolas, "Courier New", monospace',
                    lineHeight: '1.5',
                    resize: 'none',
                    width: '100%'
                }}
                placeholder="Start typing..."
            />

            {/* Status Bar */}
            <div style={{
                background: 'var(--bg-secondary)',
                borderTop: '1px solid var(--border)',
                padding: '8px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                color: 'var(--text-secondary)'
            }}>
                <div>
                    Lines: {getLineCount()} | Words: {getWordCount()} | Characters: {getCharCount()}
                </div>
                <div>
                    UTF-8 | Windows (CRLF)
                </div>
            </div>
        </div>
    );
} 