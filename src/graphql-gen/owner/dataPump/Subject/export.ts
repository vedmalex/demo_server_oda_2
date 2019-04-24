export default {
  export: {
    queries: {
      Subject: {
        query: 'Subject/list.graphql',
        /*process: (f) => ({
          Subject: f.viewer.subjects ? f.viewer.subjects.edges.map(e => ({
            ...e.node,
            course : e.node.course ? e.node.course.edges.map(s => ({
              ...s.node,
            })) : [],
          })) : [],
        }),*/
      },
    },
  },
};
