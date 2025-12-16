// src/data/about.ts

import { Biography, Statistic } from '@/types/about';

export const biography: Biography = {
  name: 'Umer Khan',
  roles: [
    'Videographer',
    'Director',
    'Editor',
    'Cinematographer'
  ],
  skills: [
    'Commercial Video Production',
    'Music Video Direction',
    'Documentary Filmmaking',
    'Color Grading',
    'Motion Graphics'
  ],
  bio: 'Professional videographer and director specializing in cinematic storytelling, commercial productions, and creative visual content.'
};

export const statistics: Statistic[] = [
  { value: '50+', label: 'Projects Done' },
  { value: '10+', label: 'Years of Experience' },
  { value: '25', label: 'Worldwide Clients' }
];
