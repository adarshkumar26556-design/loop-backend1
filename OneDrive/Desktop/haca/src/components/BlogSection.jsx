import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogs } from '../data/mockData';

const BlogSection = () => {
    const navigate = useNavigate();

    // Show only first 3 blogs
    const displayedBlogs = blogs.slice(0, 3);

    return (
        <section id="blog" className="bg-[#111] text-white py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-8 md:mb-12">
                    Latest News & Blogs
                </h2>

                {/* Blogs Grid - 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {displayedBlogs.map((blog) => (
                        <div
                            key={blog.id}
                            onClick={() => navigate(`/blog/${blog.id}`)}
                            className="group cursor-pointer flex flex-col"
                        >
                            {/* Blog Image */}
                            <div className="relative overflow-hidden mb-4 rounded-lg aspect-video bg-gray-900">
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Blog Content */}
                            <div className="flex flex-col">
                                {/* Category Tag */}
                                <div className="mb-3">
                                    <span className="inline-block bg-green-600 text-white text-xs font-medium px-3 py-1 rounded">
                                        {blog.category}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight mb-3 group-hover:text-gray-300 transition-colors">
                                    {blog.title}
                                </h3>

                                {/* Date and Read Time */}
                                <div className="flex items-center gap-3 text-gray-400 text-sm">
                                    <span>{blog.date}</span>
                                    <span>•</span>
                                    <span>6 min read</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Blogs Link */}
                <div className="flex justify-center mt-12">
                    <button className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors group">
                        <span className="text-sm font-medium group-hover:text-gray-300">
                            View All Blogs
                        </span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
