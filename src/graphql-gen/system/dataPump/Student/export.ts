export default {
  export: {
    queries: {
      Student: {
        query: 'Student/list.graphql',
        /*process: (f) => ({
          Student: f.viewer.students ? f.viewer.students.edges.map(e => ({
            ...e.node,
            meetings : e.node.meetings ? e.node.meetings.edges.map(s => ({
              ...s.node,
            })) : [],
          })) : [],
        }),*/
      },
    },
  },
};
