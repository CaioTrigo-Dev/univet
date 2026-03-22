import { AuthProvider } from 'react-admin';

export const authProvider: AuthProvider = {
  login: ({ username, password }) => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('auth', username);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Login falhou. Tente admin / admin.'));
  },
  logout: () => {
    localStorage.removeItem('auth');
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem('auth') ? Promise.resolve() : Promise.reject();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getIdentity: () => {
    try {
      return Promise.resolve({
        id: 'user',
        fullName: 'Admin UniVet',
      });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: () => Promise.resolve(''),
};
