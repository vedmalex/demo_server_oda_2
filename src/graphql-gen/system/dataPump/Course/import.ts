export default {
  import: {
    queries: {
      Course: {
        filter: `
          id
          createdAt
          updatedAt
          removed
          owner`,
        uploader: {
          findQuery: {
            id: 'Course/findById.graphql',
          },
          // createQuery: 'Course/create.graphql',
          // updateQuery: 'Course/update.graphql',
          // dataPropName: 'course',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      Course: {
        filter: `
          id
          createdBy
          updateBy`,
        uploader: {
          findQuery: {
            id: 'Course/findById.graphql',
          },
          // createQuery: 'Course/create.graphql',
          // updateQuery: 'Course/update.graphql',
          // dataPropName: 'course',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
