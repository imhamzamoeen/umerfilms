// src/components/home/IntroSection.tsx

import { PageWrapper } from '@/components/layout';

export function IntroSection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <PageWrapper>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Visual Storyteller
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Umer creates cinematic experiences that capture authentic moments and compelling narratives.
            With years of experience in commercial and creative videography, he brings your vision to life
            through thoughtful composition and powerful storytelling.
          </p>
        </div>
      </PageWrapper>
    </section>
  );
}
