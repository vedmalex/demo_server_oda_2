export default {
  export: {
    queries: {
      SocialNetwork: {
        query: 'SocialNetwork/list.graphql',
        /*process: (f) => ({
          SocialNetwork: f.viewer.socialNetworks ? f.viewer.socialNetworks.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      },
    },
  },
};
