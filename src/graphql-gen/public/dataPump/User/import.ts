export default {
  import: {
    queries: {
      User: {
        filter: `
          id
          userName`,
        uploader: {
          findQuery: {
            id: 'User/findById.graphql',
            userName: 'User/findByUserName.graphql',
          },
          // createQuery: 'User/create.graphql',
          // updateQuery: 'User/update.graphql',
          // dataPropName: 'user',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            userName: f =>
              f.hasOwnProperty('userName') ? { userName: f.userName } : null,
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
            userName: 'User/findByUserName.graphql',
          },
          // createQuery: 'User/create.graphql',
          // updateQuery: 'User/update.graphql',
          // dataPropName: 'user',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            userName: f =>
              f.hasOwnProperty('userName') ? { userName: f.userName } : null,
          },
        },
      },
    },
  },
};
