// src/components/home/Biography.tsx

interface BiographyProps {
  bio?: string;
}

export function Biography({ bio }: BiographyProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm uppercase tracking-widest text-white font-semibold">Biography</h2>
      <p className="text-[#A0A0A0] text-base leading-relaxed">
        {bio || 'Professional videographer and director specializing in cinematic storytelling, commercial productions, and creative visual content.'}
      </p>
    </div>
  );
}
