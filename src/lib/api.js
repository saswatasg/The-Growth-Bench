const API_URL = import.meta.env.VITE_API_URL || '/api';

const getToken = () => localStorage.getItem('tgb_admin_token');

const request = async (path, options = {}) => {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
};

export const loginRequest = async (password) => {
  const data = await request('/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
  return data.token;
};

export const fetchPosts = async () => {
  return request('/posts');
};

export const savePosts = async (posts) => {
  return request('/posts', {
    method: 'PUT',
    body: JSON.stringify(posts),
  });
};

export const fetchCTAs = async () => {
  return request('/ctas');
};

export const saveCTAs = async (ctas) => {
  return request('/ctas', {
    method: 'PUT',
    body: JSON.stringify(ctas),
  });
};
