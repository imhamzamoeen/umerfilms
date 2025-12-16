// src/app/work/WorkPageClient.tsx

'use client';

import { useState } from 'react';
import { CategoryFilter, ProjectGrid } from '@/components/portfolio';
import { getAllProjects, getProjectsByCategory } from '@/data/projects';
import { Category } from '@/types/project';

const categories: string[] = ['All', 'Commercial', 'Music Video', 'Wedding', 'Short Film', 'Personal'];

export function WorkPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProjects = selectedCategory === 'All'
    ? getAllProjects()
    : getProjectsByCategory(selectedCategory as Category);

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
