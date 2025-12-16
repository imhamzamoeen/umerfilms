// src/components/home/SkillsList.tsx

interface SkillsListProps {
  skills: string[];
}

export function SkillsList({ skills }: SkillsListProps) {
  return (
    <div>
      <h2 className="text-sm uppercase tracking-widest text-white font-semibold mb-3">
        Skills
      </h2>
      <p className="text-[#A0A0A0] text-base leading-relaxed" aria-label="Professional skills">
        {skills.map((skill, index) => (
          <span key={index}>
            {skill}
            {index < skills.length - 1 && <span className="mx-2">•</span>}
          </span>
        ))}
      </p>
    </div>
  );
}
