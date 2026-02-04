import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '#services' },
        { name: 'Works', path: '#work' },
        { name: 'Clients', path: '#clients' },
        { name: 'Awards', path: '#awards' },
        { name: 'Our Story', path: '#about' },
        { name: 'Blogs', path: '#blog' },
        { name: 'Careers', path: '#careers' },
    ];

    return (
        <nav className="bg-[#141414] text-white px-4 sm:px-8 py-6 fixed w-full top-0 z-50 border-b border-transparent">
            <div className="max-w-[1800px] mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="flex items-center ml-4 mt-2"
                >
                    <img
                        src="/images/logo.png"
                        alt="Haris&Co."
                        className="h-12 w-auto mr-5"
                    />
                </Link>


                {/* Desktop Nav */}
                <div className="hidden xl:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            className={`text-[15px] transition-colors ${link.name === 'Home'
                                ? 'text-white font-bold'
                                : 'text-[#9ca3af] font-normal hover:text-white'
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}

                    <button className="ml-8 flex items-center gap-3 border border-[#333] hover:border-white text-white px-6 py-3 text-[15px] font-medium transition-all group">
                        <span>Contact Us</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button className="xl:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="xl:hidden absolute top-full left-0 w-full bg-black border-t border-gray-900 h-screen flex flex-col p-4 sm:p-8 space-y-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.path}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-medium text-gray-300 hover:text-white"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button className="flex items-center justify-between border border-white text-white px-6 py-4 mt-4 w-full text-lg">
                        <span>Contact Us</span>
                        <ArrowRight size={20} />
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
