export default {
  import: {
    queries: {
      Phone: {
        filter: `
          id
          createdAt
          updatedAt
          removed
          owner`,
        uploader: {
          findQuery: {
            id: 'Phone/findById.graphql',
          },
          // createQuery: 'Phone/create.graphql',
          // updateQuery: 'Phone/update.graphql',
          // dataPropName: 'phone',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      Phone: {
        filter: `
          id
          createdBy
          updateBy`,
        uploader: {
          findQuery: {
            id: 'Phone/findById.graphql',
          },
          // createQuery: 'Phone/create.graphql',
          // updateQuery: 'Phone/update.graphql',
          // dataPropName: 'phone',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
