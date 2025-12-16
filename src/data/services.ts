import { IconType } from 'react-icons';
import { BsPencil, BsCodeSlash, BsDisplay } from 'react-icons/bs';

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: IconType;
    number: string;
}

export const services: Service[] = [
    {
        id: 'design',
        title: 'Design',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut',
        icon: BsPencil,
        number: '01',
    },
    {
        id: 'development',
        title: 'Development',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et',
        icon: BsCodeSlash,
        number: '02',
    },
    {
        id: 'marketing',
        title: 'Marketing',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore',
        icon: BsDisplay,
        number: '03',
    },
];
