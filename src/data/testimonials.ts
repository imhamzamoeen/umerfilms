export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  photo: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'Tech Innovations Inc.',
    photo: '/images/testimonials/sarah-johnson.svg',
    quote:
      'Working with Umer was an absolute pleasure. His attention to detail and creative vision brought our brand story to life in ways we never imagined.',
  },
  {
    id: 'testimonial-2',
    name: 'Michael Chen',
    role: 'CEO',
    company: 'StartupVision',
    photo: '/images/testimonials/michael-chen.svg',
    quote:
      'The commercial video exceeded all our expectations. Umer captured the essence of our brand perfectly and delivered a stunning final product.',
  },
  {
    id: 'testimonial-3',
    name: 'Emily Rodriguez',
    role: 'Creative Director',
    company: 'Artisan Media',
    photo: '/images/testimonials/emily-rodriguez.svg',
    quote:
      'Umer has an incredible eye for storytelling. Our documentary project was handled with professionalism and artistic excellence from start to finish.',
  },
  {
    id: 'testimonial-4',
    name: 'David Thompson',
    role: 'Event Coordinator',
    company: 'Elite Events Co.',
    photo: '/images/testimonials/david-thompson.svg',
    quote:
      'The wedding films Umer creates are nothing short of magical. Every couple he works with receives a timeless piece of art they will cherish forever.',
  },
  {
    id: 'testimonial-5',
    name: 'Jessica Park',
    role: 'Brand Manager',
    company: 'Luxe Lifestyle',
    photo: '/images/testimonials/jessica-park.svg',
    quote:
      'From concept to final cut, the process was seamless. Umer understood our vision immediately and delivered content that truly resonates with our audience.',
  },
  {
    id: 'testimonial-6',
    name: 'Robert Williams',
    role: 'Founder',
    company: 'Wellness Studio',
    photo: '/images/testimonials/robert-williams.svg',
    quote:
      'The promotional video Umer created helped us increase our client base by 40%. His work speaks for itself - absolutely exceptional quality.',
  },
];
