import React from 'react';
import agencyBg from '../assets/agency-desktop-bg.png';

const AgencySection = () => {
    return (
        <div className="flex flex-col items-center bg-black overflow-hidden relative">

            {/* ================= MOBILE / TABLET LAYOUT (< 1280px) ================= */}
            <div className="relative flex flex-col w-full xl:hidden px-4 sm:px-6 py-10 overflow-hidden">
                {/* Mobile Background */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
                    <img
                        src={agencyBg}
                        alt=""
                        className="w-full h-full object-cover object-top"
                    />
                </div>

                <div className="relative z-10 flex flex-col gap-10">
                    {/* Heading */}
                    <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                        Agency Across <br /> Two Nations
                    </h2>

                    {/* Description */}
                    <div className="text-white text-lg font-light leading-relaxed max-w-lg ml-2">
                        From India's creative hub to the heart of Dubai's innovation district, our studios are where ideas turn into impact.
                    </div>

                    {/* Office Cards Stack */}
                    <div className="flex flex-col gap-6 w-full mt-4">
                        {/* India */}
                        <div className="relative w-full h-[350px] bg-[#1a1a1a] rounded-lg overflow-hidden group cursor-pointer transition-transform duration-500 hover:scale-105">
                            <img src="/images/india-office.png" alt="India Office" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-500" />
                            <div className="absolute bottom-6 left-6 text-white z-10">
                                <h3 className="text-2xl font-bold mb-1 group-hover:translate-x-2 transition-transform duration-300">India Office</h3>
                                <p className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">Rooted In Creativity, Serving Clients Across The Nation.</p>
                            </div>
                        </div>

                        {/* Dubai */}
                        <div className="relative w-full h-[350px] bg-[#1a1a1a] rounded-lg overflow-hidden group cursor-pointer transition-transform duration-500 hover:scale-105">
                            <img src="/images/dubai-office.png" alt="Dubai Office" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-500" />
                            <div className="absolute bottom-6 left-6 text-white z-10">
                                <h3 className="text-2xl font-bold mb-1 group-hover:translate-x-2 transition-transform duration-300">Dubai Office</h3>
                                <p className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">Rooted In Creativity, Serving Clients Across The Nation.</p>
                            </div>
                        </div>
                    </div>

                    {/* Clients Logo Mobile */}
                    <div className="w-[calc(100%+3rem)] -mx-6 mt-10">
                        <img src="/images/clients-logos.png" alt="Clients" className="w-full h-auto object-cover" />
                    </div>
                </div>
            </div>


            {/* ================= DESKTOP LAYOUT (>= 1280px) ================= */}
            <section className="hidden xl:flex flex-col justify-center items-center relative w-full py-12 xl:py-16 2xl:py-24 overflow-hidden">
                {/* Background Pattern - Responsive positioning */}
                <div className="absolute inset-0 z-0 opacity-100 pointer-events-none flex justify-center items-start xl:items-center">
                    <img
                        src={agencyBg}
                        alt=""
                        className="w-full max-w-[1800px] h-auto object-contain scale-110 xl:scale-100 -translate-y-32 xl:-translate-y-48 2xl:-translate-y-64"
                    />
                </div>

                <div className="relative z-10 w-full max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 xl:px-8 2xl:px-12 flex flex-col">

                    {/* Top Row: Heading & Description */}
                    <div className="w-full flex justify-between items-start mb-8 xl:mb-10 2xl:mb-12">
                        <h2 className="text-white text-8xl xl:text-9xl 2xl:text-[10rem] font-bold leading-[0.9] tracking-tighter max-w-3xl xl:max-w-5xl">
                            Agency Across <br />
                            Two Nations
                        </h2>

                        <div className="text-white text-base xl:text-lg 2xl:text-xl font-light leading-relaxed max-w-xs xl:max-w-sm 2xl:max-w-md pt-2 xl:pt-4">
                            From India's creative hub to the heart of Dubai's innovation district, our studios are where ideas turn into impact.
                        </div>
                    </div>

                    {/* Offices Row - Grid Layout */}
                    <div className="w-full grid grid-cols-2 gap-6 xl:gap-8 2xl:gap-12">

                        {/* India Office */}
                        <div className="relative w-full aspect-[3/2] bg-[#1a1a1a] rounded-sm overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                            <img src="/images/india-office.png" alt="India Office" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-500" />
                            <div className="absolute bottom-6 xl:bottom-8 2xl:bottom-10 left-6 xl:left-8 2xl:left-10 text-white z-10">
                                <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold mb-1 xl:mb-2 group-hover:translate-x-2 transition-transform duration-300">India Office</h3>
                                <p className="text-gray-300 text-base xl:text-lg 2xl:text-xl group-hover:text-white transition-colors duration-300">Rooted In Creativity, Serving Clients Across The Nation.</p>
                            </div>
                        </div>

                        {/* Dubai Office */}
                        <div className="relative w-full aspect-[3/2] bg-[#1a1a1a] rounded-sm overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                            <img src="/images/dubai-office.png" alt="Dubai Office" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-500" />
                            <div className="absolute bottom-6 xl:bottom-8 2xl:bottom-10 left-6 xl:left-8 2xl:left-10 text-white z-10">
                                <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold mb-1 xl:mb-2 group-hover:translate-x-2 transition-transform duration-300">Dubai Office</h3>
                                <p className="text-gray-300 text-base xl:text-lg 2xl:text-xl group-hover:text-white transition-colors duration-300">Rooted In Creativity, Serving Clients Across The Nation.</p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* Desktop Clients Logo */}
            <div className="hidden xl:flex w-full relative z-10 justify-center mt-6 xl:mt-8 2xl:mt-0">
                <img
                    src="/images/clients-logos.png"
                    alt="Clients"
                    className="w-full max-w-[1920px] h-auto object-contain"
                />
            </div>
        </div>
    );
};

export default AgencySection;