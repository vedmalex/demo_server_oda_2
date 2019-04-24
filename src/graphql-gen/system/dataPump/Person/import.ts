export default {
  import: {
    queries: {
      Person: {
        filter: `
          id
          createdAt
          updatedAt
          removed
          owner`,
        uploader: {
          findQuery: {
            id: 'Person/findById.graphql',
          },
          // createQuery: 'Person/create.graphql',
          // updateQuery: 'Person/update.graphql',
          // dataPropName: 'person',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      Person: {
        filter: `
          id
          createdBy
          updateBy`,
        uploader: {
          findQuery: {
            id: 'Person/findById.graphql',
          },
          // createQuery: 'Person/create.graphql',
          // updateQuery: 'Person/update.graphql',
          // dataPropName: 'person',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
