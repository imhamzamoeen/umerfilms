'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { getBlogPosts } from '@/data/blog';
import BlogCard from './BlogCard';

import 'swiper/css';

export default function BlogPreview() {
  const posts = getBlogPosts(6);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="blog-preview bg-[#111111] py-20 md:py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="mb-4 flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-gray-400">
            <span className="inline-block h-2 w-2 rounded-full border border-gray-400" />
            Journal
          </p>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Blog <span className="text-[#8B5CF6]">Posts</span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          </p>

          {/* Navigation Arrows */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2a] text-white transition-colors hover:bg-[#3a3a3a] disabled:opacity-50"
              aria-label="Previous slide"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2a2a2a] text-white transition-colors hover:bg-[#3a3a3a] disabled:opacity-50"
              aria-label="Next slide"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Blog Cards Slider */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="blog-swiper"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <BlogCard post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
