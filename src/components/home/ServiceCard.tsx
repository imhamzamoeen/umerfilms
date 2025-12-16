'use client';

import { Service } from '@/data/services';

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const Icon = service.icon;

    return (
        <div className="service-card group relative overflow-hidden bg-[#1a1a1a] rounded-lg transition-all duration-300 hover:bg-[#222]">
            {/* Card Content */}
            <div className="p-8 flex gap-6">
                {/* Number */}
                <div className="flex-shrink-0">
                    <span className="text-gray-500 text-lg font-light">
                        {service.number}/
                    </span>
                </div>

                {/* Icon and Content */}
                <div className="flex-1">
                    {/* Title Row with Icon */}
                    <div className="flex items-center gap-3 mb-4">
                        <Icon className="w-5 h-5 text-gray-300" aria-hidden="true" />
                        <h3 className="text-xl font-semibold text-white">
                            {service.title}
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed">
                        {service.description}
                    </p>
                </div>
            </div>

            {/* Gradient Bottom Border */}
            <div className="h-[2px] bg-gradient-to-r from-[#450E93] via-[#D5007F] to-[#450E93]" />
        </div>
    );
}
