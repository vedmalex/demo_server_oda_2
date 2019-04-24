export default {
  import: {
    queries: {
      Student: {
        filter: `
          id
          createdAt
          updatedAt
          removed
          owner`,
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
          createdBy
          updateBy`,
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
