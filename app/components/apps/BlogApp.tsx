import React, { useState, useEffect } from 'react';

interface BlogPost {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
    category: string;
    published: boolean;
    viewCount: number;
}

// Simple markdown renderer for basic formatting
const renderMarkdown = (markdown: string) => {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mb-3 mt-6 text-white">$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-4 mt-8 text-white">$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-6 mt-8 text-white">$1</h1>');

    // Bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>');

    // Italic text
    html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // Code blocks
    html = html.replace(/```(.*?)```/gs, '<pre class="bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto"><code class="text-sm text-gray-300">$1</code></pre>');

    // Inline code
    html = html.replace(/`(.*?)`/g, '<code class="bg-gray-800 px-2 py-1 rounded text-sm text-gray-300">$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Line breaks
    html = html.replace(/\n\n/g, '</p><p class="mb-4 text-gray-300 leading-relaxed">');
    html = html.replace(/\n/g, '<br>');

    // Wrap in paragraphs
    html = '<p class="mb-4 text-gray-300 leading-relaxed">' + html + '</p>';

    // Lists
    html = html.replace(/^- (.*$)/gm, '<li class="mb-1 text-gray-300">$1</li>');
    html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside mb-4 space-y-1">$1</ul>');

    return html;
};

export default function BlogApp() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [loadingPost, setLoadingPost] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://blog-backend-nine-peach.vercel.app/api/posts');
                if (response.ok) {
                    const data = await response.json();
                    // The API returns {posts: [...]} format or direct array
                    const postsArray = data.posts || data;

                    // Filter out unpublished posts and sort by date (newest first)
                    const publishedPosts = postsArray
                        .filter((post: any) => post.published)
                        .sort((a: any, b: any) => {
                            const dateA = new Date(a.createdAt);
                            const dateB = new Date(b.createdAt);
                            return dateB.getTime() - dateA.getTime();
                        });

                    setPosts(publishedPosts);
                }
            } catch (error) {
                console.error('Failed to fetch blog posts:', error);
                // Fallback data
                setPosts([
                    {
                        id: 1,
                        title: 'Building Portfolio OS',
                        content: '# Building Portfolio OS\n\nHow I created an interactive desktop experience using React and modern web technologies. This project combines the familiar feel of a desktop operating system with the power of web development.\n\n## Key Features\n\n- **Window Management**: Draggable and resizable windows\n- **Desktop Environment**: Start menu, taskbar, and desktop icons\n- **Applications**: Various built-in apps including file explorer, calculator, and more\n\n### Technical Stack\n\n- React with TypeScript\n- Tailwind CSS for styling\n- Framer Motion for animations\n- React Router for navigation',
                        createdAt: '2025-07-06T10:00:00Z',
                        updatedAt: '2025-07-06T10:00:00Z',
                        tags: ['React', 'TypeScript', 'Web Development'],
                        category: 'development',
                        published: true,
                        viewCount: 0
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handlePostClick = (post: BlogPost) => {
        setSelectedPost(post);
    };

    const handleBackClick = () => {
        setSelectedPost(null);
    };

    const createExcerpt = (content: string, maxLength: number = 200) => {
        // Remove markdown formatting for excerpt
        let excerpt = content.replace(/[#*`\[\]()]/g, '');
        excerpt = excerpt.replace(/\n+/g, ' ');
        return excerpt.length > maxLength ? excerpt.substring(0, maxLength) + '...' : excerpt;
    };

    if (loading) {
        return (
            <div className="p-6 h-full bg-gray-900 text-white overflow-y-auto flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-gray-300">Loading blog posts...</p>
                </div>
            </div>
        );
    }

    // Blog detail view
    if (selectedPost) {
        return (
            <div className="p-6 h-full bg-gray-900 text-white overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={handleBackClick}
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Blog
                    </button>

                    <article className="bg-gray-800 bg-opacity-80 rounded-xl p-8 border border-gray-700">
                        <header className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-4">{selectedPost.title}</h1>
                            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                <span>{formatDate(selectedPost.createdAt)}</span>
                                <span className="capitalize">{selectedPost.category}</span>
                            </div>
                            {selectedPost.tags && selectedPost.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {selectedPost.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-600 bg-opacity-80 px-3 py-1 rounded-full text-xs text-white font-medium"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </header>

                        <div
                            className="prose prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: renderMarkdown(selectedPost.content) }}
                        />
                    </article>
                </div>
            </div>
        );
    }

    // Blog list view
    return (
        <div className="p-6 h-full bg-gray-900 text-white overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-white">Blog</h1>

                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No blog posts available at the moment.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {posts.map((post) => (
                            <article
                                key={post.id}
                                className="bg-gray-800 bg-opacity-80 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg cursor-pointer"
                                onClick={() => handlePostClick(post)}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="font-semibold text-xl text-white hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h2>
                                    <span className="text-sm text-gray-400 whitespace-nowrap ml-4">
                                        {formatDate(post.createdAt)}
                                    </span>
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-4 line-clamp-3">
                                    {createExcerpt(post.content)}
                                </p>

                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-600 bg-opacity-80 px-3 py-1 rounded-full text-xs text-white font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                    <span className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                                        Read more →
                                    </span>
                                    <div className="flex items-center gap-4 text-sm text-gray-400">
                                        <span className="capitalize">{post.category}</span>
                                        <span>{post.viewCount} views</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 