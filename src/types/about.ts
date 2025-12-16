// types/about.ts

export interface Biography {
  name: string;
  roles: string[];
  skills: string[];
  bio?: string;
}

export interface Statistic {
  value: string;
  label: string;
}
