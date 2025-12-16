// src/components/home/Statistics.tsx

import { Statistic } from '@/types/about';

interface StatisticsProps {
  stats: Statistic[];
}

export function Statistics({ stats }: StatisticsProps) {
  return (
    <dl className="space-y-10" aria-label="Career statistics">
      {stats.map((stat, index) => (
        <div key={index} className="text-center lg:text-right">
          <dd className="text-sm uppercase tracking-widest text-white font-semibold mb-2">
            {stat.label}
          </dd>
          <dt className="sr-only">{stat.label}</dt>
          <dd className="text-6xl lg:text-7xl font-light text-white tracking-tight">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
