export default {
  export: {
    queries: {
      Group: {
        query: 'Group/list.graphql',
        /*process: (f) => ({
          Group: f.viewer.groups ? f.viewer.groups.edges.map(e => ({
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
