'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import { getAllProjects } from '@/data/projects';
import { useMemo } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PortfolioSliderProps {
    onProjectClick?: (projectId: string) => void;
}

export default function PortfolioSlider({ onProjectClick }: PortfolioSliderProps) {
    const projects = useMemo(() => getAllProjects(), []);
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <section className="portfolio-slider bg-black py-24" aria-labelledby="portfolio-heading">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#D5007F]"></span>
                        <p className="text-sm uppercase tracking-widest text-gray-400 font-medium">
                            Portfolio
                        </p>
                    </div>
                    <h2 id="portfolio-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                        Recent <span className="text-[#D5007F]">Works</span>
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </p>

                    {/* Custom Navigation Arrows */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="w-11 h-11 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-[#D5007F] hover:text-[#D5007F] transition-all duration-300"
                            aria-label="Previous slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="w-11 h-11 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-[#D5007F] hover:text-[#D5007F] transition-all duration-300"
                            aria-label="Next slide"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Swiper Slider */}
                <Swiper
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    modules={[Navigation, Pagination, Keyboard, A11y]}
                    spaceBetween={20}
                    slidesPerView={1.2}
                    centeredSlides={false}
                    pagination={{ clickable: true }}
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    speed={400}
                    grabCursor={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 2.2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3.5,
                            spaceBetween: 24,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                    }}
                    className="portfolio-swiper !pb-14 !overflow-visible"
                >
                    {projects.map((project) => (
                        <SwiperSlide key={project.id}>
                            <div
                                className="portfolio-slide group cursor-pointer"
                                onClick={() => onProjectClick?.(project.id)}
                                role="button"
                                tabIndex={0}
                                aria-label={`View project: ${project.title}`}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        onProjectClick?.(project.id);
                                    }
                                }}
                            >
                                {/* Project Image */}
                                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-900 mb-4">
                                    <Image
                                        src={project.thumbnailUrl}
                                        alt={`Thumbnail for ${project.title}`}
                                        fill
                                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                                        className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                                    />
                                </div>

                                {/* Project Info - Always Visible */}
                                <div className="space-y-2">
                                    <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                                        {project.category.toUpperCase()} • VISUAL ART • CONCEPT
                                    </p>
                                    <h3 className="text-lg md:text-xl font-semibold text-white leading-tight group-hover:text-[#D5007F] transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
