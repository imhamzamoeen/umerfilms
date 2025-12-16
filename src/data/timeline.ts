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
        id: 'current',
        year: '2023 - Present',
        position: 'Lead Cinematographer',
        company: 'UmerFilms',
        description:
            'Leading high-end commercial and documentary productions with a focus on cinematic storytelling and visual excellence. Managing full production pipelines from pre-visualization to final color grading.',
        type: 'work',
    },
    {
        id: 'director-2020',
        year: '2020 - 2023',
        position: 'Director of Photography',
        company: 'Creative Vision Studios',
        description:
            'Directed photography for award-winning commercials and music videos. Collaborated with international brands to deliver visually stunning campaigns that drove engagement.',
        type: 'work',
    },
    {
        id: 'award-2022',
        year: '2022',
        position: 'Best Cinematography Award',
        company: 'International Film Festival',
        description:
            'Recognized for outstanding cinematography in documentary filmmaking, specifically for the short film "Shadows of Light" which explored urban architecture.',
        type: 'award',
    },
    {
        id: 'cinematographer-2018',
        year: '2018 - 2020',
        position: 'Freelance Cinematographer',
        company: 'Various Productions',
        description:
            'Worked on diverse projects including commercials, documentaries, and narrative shorts across multiple countries. Specialized in natural light cinematography and handheld camera movement.',
        type: 'work',
    },
    {
        id: 'education-2018',
        year: '2015 - 2018',
        position: 'Film & Media Production',
        company: 'University of Arts',
        description:
            'Bachelor of Arts in Film Production with specialization in cinematography and visual storytelling. Graduated with Honors.',
        type: 'education',
    },
];
