import { IconType } from 'react-icons';
import { BsLightbulb, BsCameraVideo, BsFilm } from 'react-icons/bs';

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: IconType;
    number: string;
}

export const services: Service[] = [
    {
        id: 'pre-production',
        title: 'Pre-Production',
        description:
            'Concept development, script writing, storyboarding, location scouting, and planning to ensure your vision is perfectly captured.',
        icon: BsLightbulb,
        number: '01',
    },
    {
        id: 'video-production',
        title: 'Video Production',
        description:
            'Professional filming with high-end equipment, creative direction, and cinematography that brings your story to life.',
        icon: BsCameraVideo,
        number: '02',
    },
    {
        id: 'post-production',
        title: 'Post-Production',
        description:
            'Expert editing, color grading, sound design, motion graphics, and final delivery to create polished, impactful content.',
        icon: BsFilm,
        number: '03',
    },
];
