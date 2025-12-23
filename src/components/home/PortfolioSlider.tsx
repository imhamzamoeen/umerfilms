'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Link from 'next/link';
import type { Project } from '@/types/project';
import { ProjectCard } from '@/components/portfolio';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface PortfolioSliderProps {
    projects: Project[];
}

export default function PortfolioSlider({ projects }: PortfolioSliderProps) {
    const swiperRef = useRef<SwiperType | null>(null);

    if (projects.length === 0) {
        return (
            <section className="portfolio-slider bg-black py-24" aria-labelledby="portfolio-heading">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Recent <span className="text-[#D5007F]">Works</span>
                        </h2>
                        <p className="text-gray-400">No projects available yet. Add videos in the admin panel.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="portfolio-slider bg-black py-16 md:py-24" aria-labelledby="portfolio-heading">
            {/* Section Header - Constrained width */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="text-center max-w-2xl mx-auto">
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
                        Explore our latest creative projects showcasing cinematic storytelling and visual excellence
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
            </div>

            {/* Full-width Swiper Container */}
            <div className="w-full">
                <Swiper
                    onSwiper={(swiper) => { swiperRef.current = swiper; }}
                    modules={[Navigation, Pagination, Keyboard, A11y]}
                    spaceBetween={20}
                    slidesPerView={1.1}
                    centeredSlides={false}
                    pagination={{ clickable: true }}
                    keyboard={{ enabled: true, onlyInViewport: true }}
                    speed={400}
                    grabCursor={true}
                    slidesOffsetBefore={16}
                    slidesOffsetAfter={16}
                    breakpoints={{
                        480: {
                            slidesPerView: 1.2,
                            spaceBetween: 20,
                            slidesOffsetBefore: 24,
                            slidesOffsetAfter: 24,
                        },
                        640: {
                            slidesPerView: 1.5,
                            spaceBetween: 24,
                            slidesOffsetBefore: 32,
                            slidesOffsetAfter: 32,
                        },
                        768: {
                            slidesPerView: 1.8,
                            spaceBetween: 28,
                            slidesOffsetBefore: 40,
                            slidesOffsetAfter: 40,
                        },
                        1024: {
                            slidesPerView: 2.2,
                            spaceBetween: 32,
                            slidesOffsetBefore: 48,
                            slidesOffsetAfter: 48,
                        },
                        1280: {
                            slidesPerView: 2.5,
                            spaceBetween: 32,
                            slidesOffsetBefore: 64,
                            slidesOffsetAfter: 64,
                        },
                        1536: {
                            slidesPerView: 3,
                            spaceBetween: 36,
                            slidesOffsetBefore: 80,
                            slidesOffsetAfter: 80,
                        },
                    }}
                    className="portfolio-swiper !pb-14"
                >
                    {projects.map((project, index) => (
                        <SwiperSlide key={project.id}>
                            <ProjectCard
                                project={project}
                                priority={index < 3}
                                showPreview={true}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* View All Link */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
                <Link
                    href="/work"
                    className="inline-flex items-center gap-2 px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
                >
                    View All Work
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}
