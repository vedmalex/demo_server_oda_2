export default {
  import: {
    queries: {
      Meeting: {
        filter: `
          id
          date`,
        uploader: {
          findQuery: {
            id: 'Meeting/findById.graphql',
          },
          // createQuery: 'Meeting/create.graphql',
          // updateQuery: 'Meeting/update.graphql',
          // dataPropName: 'meeting',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      Meeting: {
        filter: `
          id
          curator
          group
          students`,
        uploader: {
          findQuery: {
            id: 'Meeting/findById.graphql',
          },
          // createQuery: 'Meeting/create.graphql',
          // updateQuery: 'Meeting/update.graphql',
          // dataPropName: 'meeting',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
