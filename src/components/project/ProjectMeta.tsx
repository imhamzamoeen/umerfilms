import { Project } from '@/types/project';

interface ProjectMetaProps {
  project: Project;
}

export default function ProjectMeta({ project }: ProjectMetaProps) {
  // Format date if available
  const formattedDate = project.date
    ? new Date(project.date + '-01').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      })
    : null;

  return (
    <aside className="bg-[#1E1E1E] rounded-2xl p-6 lg:sticky lg:top-24">
      <h2 className="text-xl font-bold text-white mb-6">Project Details</h2>

      <dl className="space-y-4">
        <div>
          <dt className="text-sm uppercase tracking-wider text-gray-400 mb-1">
            Category
          </dt>
          <dd className="text-white font-medium">{project.category}</dd>
        </div>

        {project.client && (
          <div>
            <dt className="text-sm uppercase tracking-wider text-gray-400 mb-1">
              Client
            </dt>
            <dd className="text-white">{project.client}</dd>
          </div>
        )}

        {formattedDate && (
          <div>
            <dt className="text-sm uppercase tracking-wider text-gray-400 mb-1">
              Date
            </dt>
            <dd className="text-white">{formattedDate}</dd>
          </div>
        )}

        {project.role && (
          <div>
            <dt className="text-sm uppercase tracking-wider text-gray-400 mb-1">
              Role
            </dt>
            <dd className="text-white">{project.role}</dd>
          </div>
        )}
      </dl>

      {project.tags && project.tags.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-700">
          <h3 className="text-sm uppercase tracking-wider text-gray-400 mb-3">
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-black rounded-full text-sm text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
