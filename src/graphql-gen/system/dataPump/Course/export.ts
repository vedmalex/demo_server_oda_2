export default {
  export: {
    queries: {
      Course: {
        query: 'Course/list.graphql',
        /*process: (f) => ({
          Course: f.viewer.courses ? f.viewer.courses.edges.map(e => ({
            ...e.node,
            subjects : e.node.subjects ? e.node.subjects.edges.map(s => ({
              ...s.node,
            })) : [],
            groups : e.node.groups ? e.node.groups.edges.map(s => ({
              ...s.node,
            })) : [],
          })) : [],
        }),*/
      },
    },
  },
};
