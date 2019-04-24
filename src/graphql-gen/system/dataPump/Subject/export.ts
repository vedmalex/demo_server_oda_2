export default {
  export: {
    queries: {
      Subject: {
        query: 'Subject/list.graphql',
        /*process: (f) => ({
          Subject: f.viewer.subjects ? f.viewer.subjects.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      },
    },
  },
};
