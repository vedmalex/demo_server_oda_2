export default {
  export: {
    queries: {
      Meeting: {
        query: 'Meeting/list.graphql',
        /*process: (f) => ({
          Meeting: f.viewer.meetings ? f.viewer.meetings.edges.map(e => ({
            ...e.node,
            students : e.node.students ? e.node.students.edges.map(s => ({
              ...s.node,
            })) : [],
          })) : [],
        }),*/
      },
    },
  },
};
