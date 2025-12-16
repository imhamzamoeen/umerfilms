// src/components/home/CircularPortrait.tsx

import Image from 'next/image';

export function CircularPortrait() {
  return (
    <div className="relative w-full max-w-[400px] lg:max-w-[500px] aspect-square mx-auto">
      {/* Circular image container */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-white">
        <Image
          src="/images/portrait.svg"
          alt="Umer Khan - Videographer and Director"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#450E93]/40 to-[#D5007F]/40 mix-blend-multiply"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
