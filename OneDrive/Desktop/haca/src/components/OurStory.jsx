import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import styleWatermark from '../assets/our_story_watermark.png';

const OurStory = () => {
    return (
        <div className="relative w-full py-24 md:py-32 overflow-hidden min-h-[500px] flex items-center">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/our-story-bg.png"
                    alt="Liquid Background"
                    className="w-full h-full object-cover"
                />
                {/* Dark overlay to ensure text readability matching reference */}
                <div className="absolute inset-0 bg-black/30 "></div>
            </div>

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 w-full h-full flex flex-col">

                {/* Heading */}
                <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-20">
                    Our Story
                </h2>

                <div className="relative w-full flex flex-col md:flex-row items-center">

                    {/* Content - Moved to Right */}
                    {/* Content - Left Aligned */}
                    <div className="w-full md:w-1/2 relative z-10 pr-0 md:pr-10 flex flex-col items-start">
                        <p className="text-gray-300 text-lg md:text-[1.1rem] leading-relaxed mb-10 font-light max-w-2xl text-left">
                            We fuel the growth of purpose driven brands through strategy activation, design empowerment, and market adoption. From cultivating new ideas to connecting the dots for customers or users, these are our core principles. We fuel the growth of purpose driven brands through strategy activation, design empowerment, and market adoption. From cultivating new ideas to connecting the dots for customers or users, these are our core principles.
                        </p>

                        <div className="flex justify-start">
                            <button className="group flex items-center gap-3 border border-gray-400 text-white px-8 py-3 bg-transparent hover:bg-white hover:text-black hover:border-white transition-all duration-300 rounded-sm uppercase text-sm tracking-wider">
                                <span>Learn More</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Watermark & Profile */}
                    <div className="absolute right-[-100px] top-[20%] -translate-y-1/2 z-0 hidden md:block select-none pointer-events-none opacity-100">
                        <img
                            src={styleWatermark}
                            alt=""
                            className="w-[450px] lg:w-[600px] h-auto object-contain mr-20 mb-20"
                        />
                    </div>

                    {/* Profile/Video Circle */}


                </div>
            </div>
        </div>
    );
};

export default OurStory;
