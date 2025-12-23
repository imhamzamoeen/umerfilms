// src/data/about.ts

import { Biography, Statistic } from '@/types/about';

export const biography: Biography = {
  name: 'Umer Naeem',
  roles: [
    'Videographer',
    'Director',
    'Editor',
    'Cinematographer'
  ],
  skills: [
    'Pre-Production',
    'Video Production',
    'Post-Production',
    'Script Writing',
    'Screen Play'
  ],
  bio: 'Professional video creator with 5+ years of experience in writing, directing, and producing compelling visual content for brands, documentaries, and creative projects.'
};

export const statistics: Statistic[] = [
  { value: '80+', label: 'Projects Done' },
  { value: '5+', label: 'Years of Experience' },
  { value: '25', label: 'Worldwide Clients' }
];
