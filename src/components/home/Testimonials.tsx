'use client';

import { useCallback, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { testimonials } from '@/data/testimonials';
import TestimonialCard from './TestimonialCard';

import 'swiper/css';
import 'swiper/css/pagination';

export default function Testimonials() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      if (swiperRef.current?.autoplay) {
        if (isPaused) {
          swiperRef.current.autoplay.start();
          setIsPaused(false);
        } else {
          swiperRef.current.autoplay.stop();
          setIsPaused(true);
        }
      }
    }
  }, [isPaused]);

  return (
    <section
      className="testimonials-section bg-black py-16 md:py-24"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Client testimonials"
    >
      <div className="mx-auto max-w-5xl">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Autoplay, Pagination, Keyboard]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet testimonial-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active testimonial-bullet-active',
          }}
          keyboard={{ enabled: true }}
          speed={500}
          cssMode={false}
          className="testimonials-swiper pb-12"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>

        {isPaused && (
          <p className="mt-4 text-center text-sm text-gray-500">
            Autoplay paused - Press Space to resume
          </p>
        )}
      </div>
    </section>
  );
}
