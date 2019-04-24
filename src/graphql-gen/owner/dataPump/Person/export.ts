export default {
  export: {
    queries: {
      Person: {
        query: 'Person/list.graphql',
        /*process: (f) => ({
          Person: f.viewer.people ? f.viewer.people.edges.map(e => ({
            ...e.node,
            socialNetworks : e.node.socialNetworks ? e.node.socialNetworks.edges.map(s => ({
              ...s.node,
            })) : [],
            phones : e.node.phones ? e.node.phones.edges.map(s => ({
              ...s.node,
            })) : [],
            emails : e.node.emails ? e.node.emails.edges.map(s => ({
              ...s.node,
            })) : [],
            asStudents : e.node.asStudents ? e.node.asStudents.edges.map(s => ({
              ...s.node,
            })) : [],
          })) : [],
        }),*/
      },
    },
  },
};
