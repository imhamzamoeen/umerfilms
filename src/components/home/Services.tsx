'use client';

import { services } from '@/data/services';
import ServiceCard from './ServiceCard';

export default function Services() {
    return (
        <section
            className="relative py-24 bg-black overflow-hidden"
            aria-labelledby="services-heading"
        >
            <div className="container mx-auto px-6 relative z-10">
                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column - Header */}
                    <div className="lg:sticky lg:top-24">
                        {/* Section Label */}
                        <div className="flex items-center gap-2 mb-6">
                            <span className="w-2 h-2 rounded-full border border-gray-500" />
                            <span className="text-xs uppercase tracking-widest text-gray-400">
                                Services
                            </span>
                        </div>

                        {/* Heading */}
                        <h2
                            id="services-heading"
                            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white"
                        >
                            What I{' '}
                            <span className="text-[#D5007F]">Do</span>
                        </h2>
                    </div>

                    {/* Right Column - Service Cards */}
                    <div className="flex flex-col gap-6">
                        {services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
