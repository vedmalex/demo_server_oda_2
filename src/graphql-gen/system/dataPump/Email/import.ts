export default {
  import: {
    queries: {
      Email: {
        filter: `
          id
          createdAt
          updatedAt
          removed
          owner`,
        uploader: {
          findQuery: {
            id: 'Email/findById.graphql',
          },
          // createQuery: 'Email/create.graphql',
          // updateQuery: 'Email/update.graphql',
          // dataPropName: 'email',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      Email: {
        filter: `
          id
          createdBy
          updateBy`,
        uploader: {
          findQuery: {
            id: 'Email/findById.graphql',
          },
          // createQuery: 'Email/create.graphql',
          // updateQuery: 'Email/update.graphql',
          // dataPropName: 'email',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
