export default {
  import: {
    queries: {
      User: {
        filter: `
          id
          isAdmin
          isSystem
          enabled`,
        uploader: {
          findQuery: {
            id: 'User/findById.graphql',
          },
          // createQuery: 'User/create.graphql',
          // updateQuery: 'User/update.graphql',
          // dataPropName: 'user',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      User: {
        filter: `
          id`,
        uploader: {
          findQuery: {
            id: 'User/findById.graphql',
          },
          // createQuery: 'User/create.graphql',
          // updateQuery: 'User/update.graphql',
          // dataPropName: 'user',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
