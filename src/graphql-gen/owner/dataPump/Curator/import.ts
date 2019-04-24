export default {
  import: {
    queries: {
      Curator: {
        filter: `
          id`,
        uploader: {
          findQuery: {
            id: 'Curator/findById.graphql',
          },
          // createQuery: 'Curator/create.graphql',
          // updateQuery: 'Curator/update.graphql',
          // dataPropName: 'curator',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      Curator: {
        filter: `
          id
          person
          groups`,
        uploader: {
          findQuery: {
            id: 'Curator/findById.graphql',
          },
          // createQuery: 'Curator/create.graphql',
          // updateQuery: 'Curator/update.graphql',
          // dataPropName: 'curator',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
