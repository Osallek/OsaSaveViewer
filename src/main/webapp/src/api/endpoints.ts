const endpoints = {
  user: {
    one: (id: string) => `/api/save/user/${ id }`,
  },
  save: {
    one: (id: string) => `/saves/${ id }.json`,
  },
};

export default endpoints;
