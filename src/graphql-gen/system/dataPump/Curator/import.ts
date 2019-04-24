export default {
  import: {
    queries: {
      Curator: {
        filter: `
          id
          createdAt
          updatedAt
          removed
          owner`,
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
          createdBy
          updateBy`,
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
