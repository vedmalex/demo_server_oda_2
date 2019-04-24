export default {
  import: {
    queries: {
      Subject: {
        filter: `
          id
          name`,
        uploader: {
          findQuery: {
            id: 'Subject/findById.graphql',
            name: 'Subject/findByName.graphql',
          },
          // createQuery: 'Subject/create.graphql',
          // updateQuery: 'Subject/update.graphql',
          // dataPropName: 'subject',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            name: f => (f.hasOwnProperty('name') ? { name: f.name } : null),
          },
        },
      },
    },
    relate: {
      Subject: {
        filter: `
          id
          course`,
        uploader: {
          findQuery: {
            id: 'Subject/findById.graphql',
            name: 'Subject/findByName.graphql',
          },
          // createQuery: 'Subject/create.graphql',
          // updateQuery: 'Subject/update.graphql',
          // dataPropName: 'subject',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            name: f => (f.hasOwnProperty('name') ? { name: f.name } : null),
          },
        },
      },
    },
  },
};
