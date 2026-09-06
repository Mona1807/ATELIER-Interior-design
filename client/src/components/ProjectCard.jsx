import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/projectConstants';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <article
      className="project-card"
      onClick={() => navigate(`/projects/${project._id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate(`/projects/${project._id}`);
      }}
    >
      <div className="project-card__top">
        <span className="project-card__type">{project.type}</span>
        {project.status === 'archived' && (
          <span className="project-card__status archived">Archived</span>
        )}
      </div>

      <h3>{project.name}</h3>
      <p className="project-card__desc">{project.description || 'No description yet.'}</p>

      <div className="project-card__meta">
        <span>
          <strong>{project.numberOfFloors}</strong> floor{project.numberOfFloors === 1 ? '' : 's'}
        </span>
        <span>
          <strong>
            {project.plotDimensions?.width} × {project.plotDimensions?.length}
          </strong>{' '}
          {project.plotDimensions?.unit}
        </span>
        <span>Updated {formatDate(project.updatedAt)}</span>
      </div>
    </article>
  );
}
