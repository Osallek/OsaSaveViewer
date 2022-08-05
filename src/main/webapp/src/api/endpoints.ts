const endpoints = {
  user: {
    one: (id: string) => `/users/${ id }.json`,
    profile: '/users/profile',
  },
  save: {
    one: (id: string) => `/saves/${ id }.json`,
    delete: (id: string) => `/saves/${ id }`,
    recent: '/saves',
  },
  steam: {
    logout: '/steam/logout',
  },
};

export default endpoints;
