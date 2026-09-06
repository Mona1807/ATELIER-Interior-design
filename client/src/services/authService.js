import api from './api';

async function register({ name, email, password }) {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data.data.user;
}

async function login({ email, password }) {
  const { data } = await api.post('/auth/login', { email, password });
  return data.data.user;
}

async function logout() {
  await api.post('/auth/logout');
}

async function getCurrentUser() {
  const { data } = await api.get('/auth/me');
  return data.data.user;
}

export default { register, login, logout, getCurrentUser };
