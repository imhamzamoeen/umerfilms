'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsChevronDown } from 'react-icons/bs';
import { TimelineEntry } from '@/data/timeline';

interface TimelineItemProps {
    entry: TimelineEntry;
    index: number;
}

export default function TimelineItem({ entry, index }: TimelineItemProps) {
    const [isExpanded, setIsExpanded] = useState(index === 0); // First item open by default

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpand();
        }
    };

    return (
        <div className="timeline-item relative pl-8 md:pl-12 pb-8">
            {/* Timeline Marker */}
            <div className="timeline-marker absolute left-[-0.6rem] md:left-[-0.75rem] top-2 h-5 w-5 md:h-6 md:w-6 rounded-full border-2 md:border-4 border-black bg-gradient-to-br from-[#450E93] to-[#D5007F] z-10" />

            {/* Timeline Content */}
            <div className="timeline-content">
                {/* Header (Always Visible) */}
                <div
                    className="cursor-pointer py-2 md:py-4 group"
                    onClick={toggleExpand}
                    onKeyDown={handleKeyPress}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-controls={`timeline-${entry.id}`}
                >
                    <div className="flex items-start md:items-center justify-between gap-4">
                        <div className="flex-1">
                            <p className="text-xs md:text-sm uppercase tracking-wider text-gray-400 font-medium">
                                {entry.year}
                            </p>
                            <h3 className="mt-1 text-lg md:text-xl font-bold text-white group-hover:text-[#D5007F] transition-colors">
                                {entry.position}
                            </h3>
                            <p className="mt-1 text-sm md:text-base text-gray-300">{entry.company}</p>
                        </div>
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-1 md:mt-0"
                        >
                            <BsChevronDown className="text-xl md:text-2xl text-white group-hover:text-[#D5007F] transition-colors" />
                        </motion.div>
                    </div>
                </div>

                {/* Description (Expandable) */}
                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            id={`timeline-${entry.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="overflow-hidden"
                        >
                            <p className="pb-2 md:pb-6 text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl">
                                {entry.description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
