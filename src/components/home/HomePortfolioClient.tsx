'use client';

import PortfolioSlider from './PortfolioSlider';
import { Project } from '@/types/project';

interface HomePortfolioClientProps {
  projects: Project[];
}

export default function HomePortfolioClient({ projects }: HomePortfolioClientProps) {
  return <PortfolioSlider projects={projects} />;
}
