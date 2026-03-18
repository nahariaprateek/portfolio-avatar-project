import ProjectCard from './ProjectCard';

export default function ProjectGrid({ category, projects }) {
  const filteredProjects = category === 'All'
    ? projects
    : projects.filter((project) => project.category === category);

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
