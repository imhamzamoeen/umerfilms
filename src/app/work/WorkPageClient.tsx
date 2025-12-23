// src/app/work/WorkPageClient.tsx

'use client';

import { useState, useMemo } from 'react';
import { CategoryFilter, ProjectGrid } from '@/components/portfolio';
import { Project, Category } from '@/types/project';

const categories: string[] = ['All', 'Commercial', 'Music Video', 'Wedding', 'Short Film', 'Personal'];

interface WorkPageClientProps {
  initialProjects: Project[];
}

export function WorkPageClient({ initialProjects }: WorkPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') {
      return initialProjects;
    }
    return initialProjects.filter(p => p.category === selectedCategory);
  }, [initialProjects, selectedCategory]);

  return (
    <>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No projects found in this category.</p>
        </div>
      ) : (
        <ProjectGrid projects={filteredProjects} />
      )}
    </>
  );
}
