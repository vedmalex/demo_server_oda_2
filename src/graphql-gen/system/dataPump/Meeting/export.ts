export default {
  export: {
    queries: {
      Meeting: {
        query: 'Meeting/list.graphql',
        /*process: (f) => ({
          Meeting: f.viewer.meetings ? f.viewer.meetings.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      },
    },
  },
};
