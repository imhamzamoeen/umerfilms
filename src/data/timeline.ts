export interface TimelineEntry {
    id: string;
    year: string;
    position: string;
    company: string;
    description: string;
    type: 'work' | 'education' | 'award';
}

export const timeline: TimelineEntry[] = [
    {
        id: 'bewhoop-2025',
        year: '2025',
        position: 'Video Content Creator',
        company: 'BeWhoop App',
        description:
            'Creating engaging video content and posts for the BeWhoop mobile application, delivering high-quality promotional and social media content.',
        type: 'work',
    },
    {
        id: 'ffc-2025',
        year: '2025',
        position: 'Video Coverage',
        company: 'FFC LIMITED',
        description:
            'Providing professional video coverage services for FFC Limited, capturing corporate events, product showcases, and brand content.',
        type: 'work',
    },
    {
        id: 'documentary-2024',
        year: '2024',
        position: 'Documentary Filmmaker',
        company: 'International NGO',
        description:
            'Produced a compelling documentary for an international non-governmental organization, showcasing impactful stories and social initiatives.',
        type: 'work',
    },
    {
        id: 'jewelry-brand-2024',
        year: '2024',
        position: 'Brand Video Production',
        company: 'Online Jewelry Brand',
        description:
            'First major brand collaboration, creating stunning product videos and promotional content for an online jewelry brand.',
        type: 'work',
    },
    {
        id: 'started-2020',
        year: '2020',
        position: 'Started My Page',
        company: 'UmerFilms',
        description:
            'Launched UmerFilms as my personal brand, beginning my journey as a professional video creator specializing in pre-production, video production, and post-production services.',
        type: 'work',
    },
];
