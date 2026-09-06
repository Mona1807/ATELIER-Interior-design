import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import projectService from '../services/projectService';
import ProjectFormModal from '../components/ProjectFormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { formatDate } from '../utils/projectConstants';
import '../components/ProjectCard.css'; // reuses .project-card__type / __status badge styles
import './ProjectDetailsPage.css';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [actionError, setActionError] = useState('');

  async function loadProject() {
    setLoading(true);
    setError('');
    try {
      const data = await projectService.getProjectById(id);
      setProject(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load this project.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleUpdate(projectData) {
    const updated = await projectService.updateProject(id, projectData);
    setProject(updated);
    setShowEditModal(false);
  }

  async function handleToggleArchive() {
    setActionError('');
    try {
      const updated = await projectService.toggleArchiveProject(id);
      setProject(updated);
    } catch (err) {
      setActionError(err.response?.data?.message || 'Could not update this project.');
    }
  }

  async function handleDelete() {
    setActionError('');
    try {
      await projectService.deleteProject(id);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setActionError(err.response?.data?.message || 'Could not delete this project.');
      setShowDeleteConfirm(false);
    }
  }

  if (loading) {
    return <div className="project-details-loading">Loading project…</div>;
  }

  if (error) {
    return (
      <div className="project-details">
        <Link to="/dashboard" className="project-details__back">
          ← Back to dashboard
        </Link>
        <div className="project-details-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="project-details">
      <Link to="/dashboard" className="project-details__back">
        ← Back to dashboard
      </Link>

      <div className="project-details__header">
        <div>
          <div className="project-details__badges">
            <span className="project-card__type">{project.type}</span>
            {project.status === 'archived' && (
              <span className="project-card__status archived">Archived</span>
            )}
          </div>
          <h1>{project.name}</h1>
        </div>

        <div className="project-details__actions">
          <button className="btn-secondary" onClick={() => setShowEditModal(true)}>
            Edit
          </button>
          <button className="btn-secondary" onClick={handleToggleArchive}>
            {project.status === 'active' ? 'Archive' : 'Restore'}
          </button>
          <button className="btn-danger" onClick={() => setShowDeleteConfirm(true)}>
            Delete
          </button>
        </div>
      </div>

      {actionError && <div className="form-banner error">{actionError}</div>}

      <p className="project-details__desc">{project.description || 'No description yet.'}</p>

      <div className="detail-grid">
        <div className="detail-item">
          <span>Plot dimensions</span>
          <strong>
            {project.plotDimensions?.width} × {project.plotDimensions?.length}{' '}
            {project.plotDimensions?.unit}
          </strong>
        </div>
        <div className="detail-item">
          <span>Floors</span>
          <strong>{project.numberOfFloors}</strong>
        </div>
        <div className="detail-item">
          <span>Created</span>
          <strong>{formatDate(project.createdAt)}</strong>
        </div>
        <div className="detail-item">
          <span>Last updated</span>
          <strong>{formatDate(project.updatedAt)}</strong>
        </div>
      </div>

      {showEditModal && (
        <ProjectFormModal
          initialProject={project}
          onSubmit={handleUpdate}
          onCancel={() => setShowEditModal(false)}
        />
      )}

      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete this project?"
          message={`"${project.name}" and all of its data will be permanently deleted. This can't be undone.`}
          confirmLabel="Delete permanently"
          danger
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
}
