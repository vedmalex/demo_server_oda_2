export default {
  export: {
    queries: {
      Person: {
        query: 'Person/list.graphql',
        /*process: (f) => ({
          Person: f.viewer.people ? f.viewer.people.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      },
    },
  },
};
