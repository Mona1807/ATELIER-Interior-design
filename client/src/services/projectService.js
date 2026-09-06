import api from './api';

async function createProject(projectData) {
  const { data } = await api.post('/projects', projectData);
  return data.data.project;
}

async function getProjects(status) {
  const { data } = await api.get('/projects', { params: status ? { status } : {} });
  return data.data.projects;
}

async function getProjectById(id) {
  const { data } = await api.get(`/projects/${id}`);
  return data.data.project;
}

async function updateProject(id, projectData) {
  const { data } = await api.put(`/projects/${id}`, projectData);
  return data.data.project;
}

async function toggleArchiveProject(id) {
  const { data } = await api.patch(`/projects/${id}/archive`);
  return data.data.project;
}

async function deleteProject(id) {
  await api.delete(`/projects/${id}`);
}

export default {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  toggleArchiveProject,
  deleteProject,
};
