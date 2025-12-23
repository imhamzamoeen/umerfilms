// src/app/contact/page.tsx

import { Metadata } from 'next';

export const revalidate = 604800; // Revalidate every week (7 days)
import { PageWrapper } from '@/components/layout';
import { ContactForm } from '@/components/contact';

export const metadata: Metadata = {
  title: 'Work With Me - UmerFilms',
  description: 'Ready to bring your vision to life? Explore video production services including commercials, music videos, weddings, and creative projects. Get in touch for a custom quote.',
  openGraph: {
    title: 'Work With Me - UmerFilms',
    description: 'Professional video production services',
    type: 'website',
  },
};

const services = [
  {
    title: 'Commercial & Brand Content',
    description: 'Elevate your brand with cinematic commercials and promotional videos that capture attention and drive engagement.',
  },
  {
    title: 'Music Videos',
    description: 'Bring your music to life with creative visuals that complement your sound and connect with your audience.',
  },
  {
    title: 'Wedding & Event Coverage',
    description: 'Preserve your special moments with elegant, emotive storytelling that you&apos;ll treasure for years to come.',
  },
  {
    title: 'Short Films & Creative Projects',
    description: 'Collaborate on narrative-driven films and passion projects that push creative boundaries.',
  },
];

export default function ContactPage() {
  return (
    <PageWrapper>
      <div className="py-16 md:py-20">
        {/* Page Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-center">
          Let&apos;s Create Together
        </h1>

        {/* Intro Paragraph */}
        <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16">
          Every project is unique, and I provide custom quotes tailored to your vision
          and goals. Share your project details below, and I&apos;ll get back to you within
          24-48 hours to discuss how we can bring your ideas to life.
        </p>

        {/* Services Section */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center">
            Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-gray-800 rounded-lg p-6 md:p-8"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-16 md:mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-12 text-center">
            Get in Touch
          </h2>

          <ContactForm />
        </div>
      </div>
    </PageWrapper>
  );
}
