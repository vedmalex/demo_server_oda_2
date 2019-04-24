export default {
  import: {
    queries: {
      Subject: {
        filter: `
          id
          createdAt
          updatedAt
          removed
          owner`,
        uploader: {
          findQuery: {
            id: 'Subject/findById.graphql',
          },
          // createQuery: 'Subject/create.graphql',
          // updateQuery: 'Subject/update.graphql',
          // dataPropName: 'subject',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      Subject: {
        filter: `
          id
          createdBy
          updateBy`,
        uploader: {
          findQuery: {
            id: 'Subject/findById.graphql',
          },
          // createQuery: 'Subject/create.graphql',
          // updateQuery: 'Subject/update.graphql',
          // dataPropName: 'subject',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
