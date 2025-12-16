import { timeline } from '@/data/timeline';
import TimelineItem from './TimelineItem';

export default function Timeline() {
    return (
        <section className="timeline-section bg-black py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="mb-12 md:mb-16 text-center">
                    <p className="section-label mb-4 text-xs md:text-sm uppercase tracking-widest text-[#D5007F] font-bold">
                        Experience
                    </p>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
                        My Journey
                    </h2>
                </div>

                {/* Timeline */}
                <div className="timeline-wrapper mx-auto max-w-3xl pl-4 md:pl-0">
                    <div className="timeline-line relative border-l-2 border-gray-800 ml-2 md:ml-0 md:pl-8">
                        {/* Gradient Line Overlay */}
                        <div className="absolute left-[-2px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#450E93] to-[#D5007F] opacity-70"></div>

                        {timeline.map((entry, index) => (
                            <TimelineItem key={entry.id} entry={entry} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
