import { useState } from 'react';
import { Play, X, ArrowRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { testimonials } from '../data/mockData';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState('');

    const openModal = (videoUrl) => {
        setCurrentVideo(videoUrl);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentVideo('');
    };

    return (
        <section className="bg-[#111] text-white pt-12 pb-20 px-4 sm:px-6 relative">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-6 md:mb-10 -ml-6">
                    What Our Clients Say
                </h2>

                {/* Testimonials Carousel */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={32}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 }
                    }}
                    className="testimonials-swiper mb-12"
                >
                    {testimonials.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div
                                className="cursor-pointer group relative max-w-[540px] mx-auto"
                                onClick={() => openModal(item.videoUrl)}
                            >
                                <div className="relative overflow-hidden aspect-[422/590] bg-gray-900 border border-gray-700">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">

                                        {/* Name and Role */}
                                        <div className="mb-2">
                                            <h3 className="text-white font-semibold text-base mb-0.5">
                                                {item.name}
                                            </h3>
                                            <p className="text-gray-300 text-xs">
                                                {item.role}
                                            </p>
                                        </div>

                                        {/* Play Button - Bottom Right */}
                                        <div className="absolute bottom-5 right-5">
                                            <div className="bg-white rounded-full p-2.5 group-hover:bg-gray-200 transition-colors">
                                                <Play fill="black" className="text-black w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* View All Testimonials Link */}
                <div className="flex justify-center mt-12">
                    <button className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors group">
                        <span className="text-sm font-medium group-hover:text-gray-300 underline underline-offset-4">
                            View All Testimonials
                        </span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Video Modal - Clean, focused video viewing */}
                {modalOpen && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                        onClick={closeModal}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 text-white hover:text-gray-400 transition-colors z-10"
                            aria-label="Close video"
                        >
                            <X size={40} />
                        </button>

                        {/* Video Player Only */}
                        <div
                            className="w-full max-w-6xl aspect-video rounded-lg overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={currentVideo}
                                title="Client Testimonial"
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>

            {/* Custom Swiper Styles */}
            <style>{`
                .testimonials-swiper .swiper-button-next,
                .testimonials-swiper .swiper-button-prev {
                    color: white;
                    background: rgba(255, 255, 255, 0.1);
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    backdrop-filter: blur(10px);
                }
                
                .testimonials-swiper .swiper-button-next:after,
                .testimonials-swiper .swiper-button-prev:after {
                    font-size: 20px;
                }
                
                .testimonials-swiper .swiper-button-next:hover,
                .testimonials-swiper .swiper-button-prev:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
                
                .testimonials-swiper .swiper-pagination-bullet {
                    background: white;
                    opacity: 0.5;
                }
                
                .testimonials-swiper .swiper-pagination-bullet-active {
                    opacity: 1;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;