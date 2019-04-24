export default {
  export: {
    queries: {
      Curator: {
        query: 'Curator/list.graphql',
        /*process: (f) => ({
          Curator: f.viewer.curators ? f.viewer.curators.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      },
    },
  },
};
