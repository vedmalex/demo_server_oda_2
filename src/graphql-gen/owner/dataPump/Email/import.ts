export default {
  import: {
    queries: {
      Email: {
        filter: `
          id
          email
          type`,
        uploader: {
          findQuery: {
            id: 'Email/findById.graphql',
            email: 'Email/findByEmail.graphql',
          },
          // createQuery: 'Email/create.graphql',
          // updateQuery: 'Email/update.graphql',
          // dataPropName: 'email',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            email: f => (f.hasOwnProperty('email') ? { email: f.email } : null),
          },
        },
      },
    },
    relate: {
      Email: {
        filter: `
          id
          person`,
        uploader: {
          findQuery: {
            id: 'Email/findById.graphql',
            email: 'Email/findByEmail.graphql',
          },
          // createQuery: 'Email/create.graphql',
          // updateQuery: 'Email/update.graphql',
          // dataPropName: 'email',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            email: f => (f.hasOwnProperty('email') ? { email: f.email } : null),
          },
        },
      },
    },
  },
};
