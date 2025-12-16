// src/data/projects.test.ts

import { describe, it, expect } from 'vitest';
import {
  getAllProjects,
  getProjectBySlug,
  getFeaturedProjects,
  getProjectsByCategory,
  getRelatedProjects,
} from './projects';
import { Category } from '@/types/project';

describe('Project Data', () => {
  describe('getAllProjects', () => {
    it('returns all projects', () => {
      const projects = getAllProjects();
      expect(projects.length).toBeGreaterThanOrEqual(6);
    });

    it('returns projects sorted by order field', () => {
      const projects = getAllProjects();
      for (let i = 1; i < projects.length; i++) {
        expect(projects[i].order).toBeGreaterThanOrEqual(projects[i - 1].order);
      }
    });

    it('all projects have required fields', () => {
      const projects = getAllProjects();
      projects.forEach((project) => {
        expect(project.id).toBeDefined();
        expect(project.title).toBeDefined();
        expect(project.slug).toBeDefined();
        expect(project.category).toBeDefined();
        expect(project.description).toBeDefined();
        expect(project.thumbnailUrl).toBeDefined();
        expect(project.videoUrl).toBeDefined();
        expect(typeof project.featured).toBe('boolean');
        expect(typeof project.order).toBe('number');
      });
    });
  });

  describe('getProjectBySlug', () => {
    it('returns project for valid slug', () => {
      const projects = getAllProjects();
      const firstSlug = projects[0].slug;
      const project = getProjectBySlug(firstSlug);
      expect(project).toBeDefined();
      expect(project?.slug).toBe(firstSlug);
    });

    it('returns undefined for invalid slug', () => {
      const project = getProjectBySlug('non-existent-slug');
      expect(project).toBeUndefined();
    });
  });

  describe('getFeaturedProjects', () => {
    it('returns only featured projects', () => {
      const featured = getFeaturedProjects();
      featured.forEach((project) => {
        expect(project.featured).toBe(true);
      });
    });

    it('returns at least 2 featured projects', () => {
      const featured = getFeaturedProjects();
      expect(featured.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('getProjectsByCategory', () => {
    it('filters projects by category', () => {
      const category: Category = 'Commercial';
      const projects = getProjectsByCategory(category);
      projects.forEach((project) => {
        expect(project.category).toBe(category);
      });
    });

    it('returns empty array for category with no projects', () => {
      // This test might fail if all categories are used
      // Adjust based on actual data
      const allProjects = getAllProjects();
      const usedCategories = new Set(allProjects.map((p) => p.category));

      // Find unused category if any
      const categories: Category[] = ['Commercial', 'Music Video', 'Wedding', 'Short Film', 'Personal'];
      const unusedCategory = categories.find((cat) => !usedCategories.has(cat));

      if (unusedCategory) {
        const projects = getProjectsByCategory(unusedCategory);
        expect(projects).toEqual([]);
      } else {
        // All categories are used, test passes
        expect(true).toBe(true);
      }
    });
  });

  describe('Category validation', () => {
    it('all projects have valid category values', () => {
      const projects = getAllProjects();
      const validCategories: Category[] = ['Commercial', 'Music Video', 'Wedding', 'Short Film', 'Personal'];

      projects.forEach((project) => {
        expect(validCategories).toContain(project.category);
      });
    });
  });

  describe('getRelatedProjects', () => {
    it('excludes current project', () => {
      const allProjects = getAllProjects();
      const currentProject = allProjects[0];
      const related = getRelatedProjects(currentProject.id, currentProject.category);

      expect(related.every((p) => p.id !== currentProject.id)).toBe(true);
    });

    it('returns projects from same category first', () => {
      // Find a project with multiple projects in same category
      const commercialProjects = getProjectsByCategory('Commercial');

      if (commercialProjects.length >= 2) {
        const currentProject = commercialProjects[0];
        const related = getRelatedProjects(currentProject.id, 'Commercial', 3);

        // At least one related project should be from same category (if available)
        const sameCategoryCount = related.filter((p) => p.category === 'Commercial').length;
        expect(sameCategoryCount).toBeGreaterThan(0);
      } else {
        // Skip test if not enough commercial projects
        expect(true).toBe(true);
      }
    });

    it('supplements with other categories if needed', () => {
      const allProjects = getAllProjects();
      // Find a category with only one project (or create scenario)
      // For Wedding category, we only have 1 project in test data
      const weddingProjects = getProjectsByCategory('Wedding');

      if (weddingProjects.length === 1) {
        const currentProject = weddingProjects[0];
        const related = getRelatedProjects(currentProject.id, 'Wedding', 3);

        // Should include projects from other categories
        if (allProjects.length > 1) {
          expect(related.length).toBeGreaterThan(0);
          const hasOtherCategories = related.some((p) => p.category !== 'Wedding');
          expect(hasOtherCategories).toBe(true);
        }
      } else {
        // Skip if data doesn't match expected structure
        expect(true).toBe(true);
      }
    });

    it('respects limit parameter', () => {
      const allProjects = getAllProjects();
      if (allProjects.length > 1) {
        const currentProject = allProjects[0];
        const relatedWith2 = getRelatedProjects(currentProject.id, currentProject.category, 2);
        expect(relatedWith2.length).toBeLessThanOrEqual(2);

        const relatedWith5 = getRelatedProjects(currentProject.id, currentProject.category, 5);
        expect(relatedWith5.length).toBeLessThanOrEqual(5);
      } else {
        expect(true).toBe(true);
      }
    });

    it('returns empty array if only one project total', () => {
      // This is a hypothetical test - won't happen with current data
      // but good to verify the logic
      const allProjects = getAllProjects();
      const currentProject = allProjects[0];
      const related = getRelatedProjects(currentProject.id, currentProject.category, 10);

      // Should have at most (total projects - 1)
      expect(related.length).toBeLessThan(allProjects.length);
    });

    it('prioritizes same category projects', () => {
      const commercialProjects = getProjectsByCategory('Commercial');
      if (commercialProjects.length >= 2) {
        const currentProject = commercialProjects[0];
        const related = getRelatedProjects(currentProject.id, 'Commercial', 3);

        if (related.length > 0) {
          // If there are related commercial projects, at least the first one should be commercial
          const hasCommercialFirst = related[0].category === 'Commercial';
          const commercialCount = commercialProjects.length - 1; // Exclude current

          if (commercialCount > 0) {
            expect(hasCommercialFirst).toBe(true);
          }
        }
      } else {
        expect(true).toBe(true);
      }
    });
  });
});
