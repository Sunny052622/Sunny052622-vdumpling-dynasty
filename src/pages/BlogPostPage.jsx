import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';
import { ArrowLeft, Clock, User } from 'lucide-react';

const BlogPostPage = ({ onOpenOutletModal }) => {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);

    React.useEffect(() => {
        if (post) {
            document.title = post.seo.title;
        }
    }, [post]);

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Helmet>
                <title>{post.seo.title}</title>
                <meta name="description" content={post.seo.description} />
                <meta name="keywords" content={post.seo.keywords} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={post.seo.title} />
                <meta property="og:description" content={post.seo.description} />
                <meta property="og:image" content={window.location.origin + post.image} />
                <meta property="og:url" content={window.location.href} />

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post.seo.title} />
                <meta name="twitter:description" content={post.seo.description} />
                <meta name="twitter:image" content={window.location.origin + post.image} />
            </Helmet>

            <main className="flex-grow container mx-auto px-4 py-8 mt-20">
                <Link to="/blog" id="back-to-blog" className="inline-flex items-center text-gray-600 hover:text-nepal-red mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Blog
                </Link>

                <article className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto">
                    <div className="h-64 md:h-96 overflow-hidden relative">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <h1 className="text-3xl md:text-5xl font-bold text-white font-display leading-tight">
                                {post.title}
                            </h1>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8 border-b border-gray-100 pb-8">
                            <div className="flex items-center">
                                <User size={18} className="mr-2" />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock size={18} className="mr-2" />
                                <span>{post.date}</span>
                            </div>
                        </div>

                        <div
                            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-nepal-red hover:prose-a:text-red-700 prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Call to Action */}
                        <div className="mt-12 bg-yellow-50 rounded-2xl p-8 text-center border border-yellow-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Craving Momos Now?</h3>
                            <p className="text-gray-600 mb-6">
                                Don't just read about it. Taste the best momos in Bhubaneswar today!
                            </p>
                            <button
                                onClick={onOpenOutletModal}
                                className="inline-block bg-nepal-red text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
                            >
                                Order Now
                            </button>
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default BlogPostPage;
