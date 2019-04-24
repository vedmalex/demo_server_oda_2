export default {
  export: {
    queries: {
      Phone: {
        query: 'Phone/list.graphql',
        /*process: (f) => ({
          Phone: f.viewer.phones ? f.viewer.phones.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      },
    },
  },
};
