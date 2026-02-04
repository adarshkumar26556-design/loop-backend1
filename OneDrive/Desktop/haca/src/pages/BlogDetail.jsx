import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogs } from '../data/mockData';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const blog = blogs.find(b => b.id === parseInt(id));

    if (!blog) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
                <button
                    onClick={() => navigate('/')}
                    className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition-colors"
                >
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <Link to="/" className="inline-flex items-center text-gray-500 hover:text-black mb-8 transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> Back to Home
                    </Link>

                    <div className="rounded-2xl overflow-hidden mb-10 shadow-xl aspect-video lg:aspect-[21/9]">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6 font-medium uppercase tracking-wider">
                        <div className="flex items-center">
                            <Calendar size={16} className="mr-2" />
                            {blog.date}
                        </div>
                        <div className="flex items-center text-blue-600">
                            <Tag size={16} className="mr-2" />
                            {blog.category}
                        </div>
                        <div className="flex items-center">
                            <User size={16} className="mr-2" />
                            Admin
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8">
                        {blog.title}
                    </h1>

                    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-img:rounded-xl">
                        <p className="text-xl text-gray-600 leading-relaxed font-light mb-8">
                            {blog.excerpt}
                        </p>
                        <p>
                            {blog.content}
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <h2 className="text-2xl font-bold mt-10 mb-4">Why this matters</h2>
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BlogDetail;
