export default {
  export: {
    queries: {
      Student: {
        query: 'Student/list.graphql',
        /*process: (f) => ({
          Student: f.viewer.students ? f.viewer.students.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      },
    },
  },
};
