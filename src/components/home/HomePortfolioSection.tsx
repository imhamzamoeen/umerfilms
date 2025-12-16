'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import PortfolioSlider from './PortfolioSlider';
import { getAllProjects } from '@/data/projects';
import { Project } from '@/types/project';

// Dynamically import Lightbox - only loads when opened
const Lightbox = dynamic(() => import('@/components/shared/Lightbox'), {
  ssr: false,
});

const projects = getAllProjects();

export default function HomePortfolioSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const handleProjectClick = useCallback((projectId: string) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setCurrentProject(project);
      setLightboxOpen(true);
    }
  }, []);

  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    if (!currentProject) return;

    const currentIndex = projects.findIndex((p) => p.id === currentProject.id);
    const nextIndex =
      direction === 'next'
        ? Math.min(currentIndex + 1, projects.length - 1)
        : Math.max(currentIndex - 1, 0);

    setCurrentProject(projects[nextIndex]);
  }, [currentProject]);

  const handleClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  return (
    <>
      <PortfolioSlider onProjectClick={handleProjectClick} />
      <Lightbox
        isOpen={lightboxOpen}
        project={currentProject}
        projects={projects}
        onClose={handleClose}
        onNavigate={handleNavigate}
      />
    </>
  );
}
