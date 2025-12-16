import Image from 'next/image';
import { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="testimonial-card relative flex flex-col items-center bg-black px-6 py-16 md:flex-row md:items-center md:justify-center md:gap-16 md:px-16 lg:gap-24 lg:px-24">
      {/* Profile Image */}
      <div className="mb-8 flex-shrink-0 md:mb-0">
        <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-[#D4A574] md:h-36 md:w-36 lg:h-40 lg:w-40">
          <Image
            src={testimonial.photo}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-xl text-center md:text-left">
        {/* Quote Icon - positioned top right */}
        <div className="pointer-events-none absolute -right-16 -top-4 hidden text-7xl font-serif text-gray-600 md:block lg:-right-20 lg:text-8xl">
          &#8221;&#8221;
        </div>

        {/* Author Info */}
        <div className="mb-6">
          <h3 className="text-2xl font-medium text-white md:text-3xl lg:text-4xl">
            {testimonial.name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-gray-500">
            {testimonial.role}
          </p>
        </div>

        {/* Quote */}
        <blockquote className="mb-10">
          <p className="text-base italic leading-relaxed text-gray-400 md:text-lg">
            {testimonial.quote}
          </p>
        </blockquote>

        {/* Gradient underline */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#06B6D4]" />
      </div>
    </div>
  );
}
