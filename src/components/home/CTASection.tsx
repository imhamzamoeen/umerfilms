// src/components/home/CTASection.tsx

import Link from 'next/link';
import { PageWrapper } from '@/components/layout';

export function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <PageWrapper>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Ready to bring your vision to life? Get in touch to discuss your next project
            and create something extraordinary.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#450E93] to-[#D5007F] rounded-lg transition-all hover:from-[#5a1bb8] hover:to-[#e6009a] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5007F] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Work With Me
          </Link>
        </div>
      </PageWrapper>
    </section>
  );
}
