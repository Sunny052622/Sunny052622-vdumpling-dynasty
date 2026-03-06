import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts } from '../data/blogPosts';


const BlogPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Helmet>
                <title>Blog | VDumpling Dynasty - Best Momos in Bhubaneswar</title>
                <meta name="description" content="Read our latest stories about authentic momos, food culture in Bhubaneswar, and why we serve the best dumplings in Patia and Saheed Nagar." />
                <meta name="keywords" content="momo blog, food blog bhubaneswar, best momo stories, dumpling dynasty blog" />
            </Helmet>



            <main className="flex-grow container mx-auto px-4 py-8 mt-20">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-display">
                        The Dumpling Chronicles
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Stories of spice, tradition, and the quest for the perfect momo in Bhubaneswar.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                    <span>{post.date}</span>
                                    <span className="mx-2">•</span>
                                    <span>{post.author}</span>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-nepal-red transition-colors">
                                    <Link to={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                                    {post.excerpt}
                                </p>
                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="inline-block text-nepal-red font-bold hover:underline mt-auto"
                                >
                                    Read More →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </main>


        </div>
    );
};

export default BlogPage;
