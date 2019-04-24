export default {
  import: {
    queries: {
      Group: {
        filter: `
          id
          createdAt
          updatedAt
          removed
          owner`,
        uploader: {
          findQuery: {
            id: 'Group/findById.graphql',
          },
          // createQuery: 'Group/create.graphql',
          // updateQuery: 'Group/update.graphql',
          // dataPropName: 'group',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      Group: {
        filter: `
          id
          createdBy
          updateBy`,
        uploader: {
          findQuery: {
            id: 'Group/findById.graphql',
          },
          // createQuery: 'Group/create.graphql',
          // updateQuery: 'Group/update.graphql',
          // dataPropName: 'group',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
