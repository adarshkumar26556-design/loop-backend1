import { ArrowRight } from 'lucide-react';
import TiltedCard from './TiltedCard';

const projects = [
    {
        id: 1,
        title: "Partnering with Kairali TMT",
        description: "Partnering a leading innovator in Digital Platforms",
        image: "/images/work-1.png"
    },
    {
        id: 2,
        title: "Partnering with Kairali TMT",
        description: "Partnering a leading innovator in Digital Platforms",
        image: "/images/work-2.png"
    },
    {
        id: 3,
        title: "Partnering with Kairali TMT",
        description: "Partnering a leading innovator in Digital Platforms",
        image: "/images/work-3.png"
    },
    {
        id: 4,
        title: "Partnering with Kairali TMT",
        description: "Partnering a leading innovator in Digital Platforms",
        image: "/images/work-1.png"
    },
    {
        id: 5,
        title: "Partnering with Kairali TMT",
        description: "Partnering a leading innovator in Digital Platforms",
        image: "/images/work-2.png"
    },
    {
        id: 6,
        title: "Partnering with Kairali TMT",
        description: "Partnering a leading innovator in Digital Platforms",
        image: "/images/work-3.png"
    }
];

const WorkSection = () => {
    return (
        <section id="work" className="bg-white text-black">

            {/* ================= MOBILE / TABLET LAYOUT (< 1280px) ================= */}
            <div className="xl:hidden py-2 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto mb-10">
                    {/* Header */}
                    <div className="mt-4 mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-left tracking-tight">
                            See Our Works
                        </h2>
                    </div>

                    {/* Projects Grid - Mobile (1 col) & Tablet (2 cols) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
                        {projects.map((project) => (
                            <div key={project.id} className="group cursor-pointer">
                                <div className="mb-4 aspect-[4/3] bg-gray-100 rounded-lg">
                                    <TiltedCard
                                        imageSrc={project.image}
                                        altText={project.title}
                                        containerHeight="100%"
                                        containerWidth="100%"
                                        imageHeight="100%"
                                        imageWidth="100%"
                                        rotateAmplitude={10}
                                        scaleOnHover={1.05}
                                        showMobileWarning={false}
                                        showTooltip={false}
                                        displayOverlayContent={false}
                                    />
                                </div>
                                <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {project.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Explore All Works Link */}
                    <div className="flex justify-center">
                        <button className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors group">
                            <span className="text-sm font-medium border-b border-black group-hover:border-gray-600">
                                Explore All Works
                            </span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>


            {/* ================= DESKTOP LAYOUT (>= 1280px) ================= */}

            <div className="hidden xl:block py-6 xl:py-8 2xl:py-12 px-8 xl:px-10 2xl:px-12">
                <div className="max-w-[1600px] mx-auto mt-9">
                    {/* Header */}
                    <div className="mb-1">
                        <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-left tracking-tighter mb-8 xl:mb-10">
                            See Our Works
                        </h2>
                    </div>

                    {/* Projects Grid - Desktop (3 cols) */}
                    <div className="grid grid-cols-3 gap-6 xl:gap-8 2xl:gap-10 mb-12 xl:mb-14 2xl:mb-16">
                        {projects.map((project) => (
                            <div key={project.id} className="group cursor-pointer">
                                <div className="mb-6 aspect-[4/3] bg-gray-100 rounded-sm relative z-10">
                                    <TiltedCard
                                        imageSrc={project.image}
                                        altText={project.title}
                                        containerHeight="100%"
                                        containerWidth="100%"
                                        imageHeight="100%"
                                        imageWidth="100%"
                                        rotateAmplitude={12}
                                        scaleOnHover={1.08}
                                        showMobileWarning={false}
                                        showTooltip={false}
                                        displayOverlayContent={true}
                                        overlayContent={
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-[15px]" />
                                        }
                                    />
                                </div>
                                <h3 className="text-xl xl:text-2xl 2xl:text-3xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-gray-500 text-sm xl:text-base 2xl:text-lg">
                                    {project.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Explore All Works Link */}
                    <div className="flex justify-center mb-8 xl:mb-10">
                        <button className="inline-flex items-center gap-2 text-black hover:text-gray-600 transition-colors group transform hover:scale-105 duration-300">
                            <span className="text-base xl:text-lg 2xl:text-xl font-medium border-b border-black group-hover:border-gray-600 pb-1">
                                Explore All Works
                            </span>
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default WorkSection;
