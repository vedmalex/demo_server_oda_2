export default {
  export: {
    queries: {
      Course: {
        query: 'Course/list.graphql',
        /*process: (f) => ({
          Course: f.viewer.courses ? f.viewer.courses.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      },
    },
  },
};
