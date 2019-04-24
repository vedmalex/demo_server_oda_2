export default {
  import: {
    queries: {
      Student: {
        filter: `
          id`,
        uploader: {
          findQuery: {
            id: 'Student/findById.graphql',
          },
          // createQuery: 'Student/create.graphql',
          // updateQuery: 'Student/update.graphql',
          // dataPropName: 'student',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      Student: {
        filter: `
          id
          person
          group
          meetings`,
        uploader: {
          findQuery: {
            id: 'Student/findById.graphql',
          },
          // createQuery: 'Student/create.graphql',
          // updateQuery: 'Student/update.graphql',
          // dataPropName: 'student',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
