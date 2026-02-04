import { Facebook, Linkedin, Instagram } from 'lucide-react';
import footerFrame from '../assets/footer_frame.png';

const Footer = () => {
    const navLinks = [
        'Home', 'Services', 'Works', 'Clients', 'Awards', 'About us', 'Blogs', 'Careers'
    ];

    return (
        <footer className="bg-white text-black py-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">

                    {/* Left Section - Contact */}
                    <div className="flex flex-col gap-4  -mt-1">
                        <h3 className="text-4xl font-normal mr-10 -mb-3">Let's Connect</h3>
                        <a
                            href="mailto:bd@harisand.co"
                            className="-ml-4 text-2xl sm:text-3xl md:text-5xl text-gray-600 hover:text-black transition-colors"
                        >
                            bd@harisand.co
                        </a>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                            >
                                <Facebook size={20} fill="currentColor" />
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                            >
                                <Linkedin size={20} fill="currentColor" />
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                            >
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Center Section - Image Replacement */}
                    <div className="flex-1 flex flex-col items-center">
                        <img
                            src={footerFrame}
                            alt="Haris&Co"
                            className="w-full h-auto object-contain"
                        />

                        {/* Navigation Links - Commented out as they are in the image frame */}
                        {/* 
                        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
                            {navLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                                    className="hover:underline transition-all"
                                >
                                    {link}
                                </a>
                            ))}
                        </nav>
                        */}
                    </div>
                </div>

                {/* Bottom Section - Legal Links */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-sm text-gray-600">
                    <div className="flex gap-8 mb-4 md:mb-0">
                        <a href="#" className="hover:text-black transition-colors">Privacy</a>
                        <a href="#" className="hover:text-black transition-colors">Terms & Conditions</a>
                    </div>
                    <p>© 2024 Haris&Co.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
