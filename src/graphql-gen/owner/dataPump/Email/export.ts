export default {
  export: {
    queries: {
      Email: {
        query: 'Email/list.graphql',
        /*process: (f) => ({
          Email: f.viewer.emails ? f.viewer.emails.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      },
    },
  },
};
