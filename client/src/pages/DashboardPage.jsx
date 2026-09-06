import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import projectService from '../services/projectService';
import ProjectCard from '../components/ProjectCard';
import ProjectFormModal from '../components/ProjectFormModal';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('active'); // 'active' | 'archived' | 'all'
  const [showCreateModal, setShowCreateModal] = useState(false);

  async function loadProjects() {
    setLoading(true);
    setError('');
    try {
      const statusParam = filter === 'all' ? undefined : filter;
      const data = await projectService.getProjects(statusParam);
      setProjects(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load projects.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function handleCreate(projectData) {
    await projectService.createProject(projectData);
    setShowCreateModal(false);
    loadProjects();
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1>Welcome back, {user?.name?.split(' ')[0]}.</h1>
          <p>Here's everything you're currently designing.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
          New project
        </button>
      </div>

      <div className="dashboard__filters">
        {['active', 'archived', 'all'].map((option) => (
          <button
            key={option}
            className={`filter-chip ${filter === option ? 'active' : ''}`}
            onClick={() => setFilter(option)}
          >
            {option === 'active' ? 'Active' : option === 'archived' ? 'Archived' : 'All'}
          </button>
        ))}
      </div>

      {loading && <div className="dashboard-loading">Loading your projects…</div>}

      {!loading && error && <div className="dashboard-error">{error}</div>}

      {!loading && !error && projects.length === 0 && (
        <div className="dashboard-empty">
          <h3>No projects here yet</h3>
          <p>Start your first project — a real room to redesign, or a building from scratch.</p>
          <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
            Create your first project
          </button>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      {showCreateModal && (
        <ProjectFormModal onSubmit={handleCreate} onCancel={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
