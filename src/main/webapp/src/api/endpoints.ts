const endpoints = {
  user: {
    one: (id: string) => `/users/${ id }.json`,
    profile: '/users/profile',
  },
  save: {
    one: (id: string) => `/saves/${ id }.json`,
    delete: (id: string) => `/saves/${ id }`,
    recent: '/saves',
    download: (id: string) => `/save/${ id }.eu4`,
  },
  steam: {
    logout: '/steam/logout',
  },
  wiki: {
    versions: '/wiki',
  },
};

export default endpoints;
