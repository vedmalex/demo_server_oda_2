export default {
  import: {
    queries: {
      Group: {
        filter: `
          id
          name`,
        uploader: {
          findQuery: {
            id: 'Group/findById.graphql',
            name: 'Group/findByName.graphql',
          },
          // createQuery: 'Group/create.graphql',
          // updateQuery: 'Group/update.graphql',
          // dataPropName: 'group',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            name: f => (f.hasOwnProperty('name') ? { name: f.name } : null),
          },
        },
      },
    },
    relate: {
      Group: {
        filter: `
          id
          course
          students
          curator`,
        uploader: {
          findQuery: {
            id: 'Group/findById.graphql',
            name: 'Group/findByName.graphql',
          },
          // createQuery: 'Group/create.graphql',
          // updateQuery: 'Group/update.graphql',
          // dataPropName: 'group',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            name: f => (f.hasOwnProperty('name') ? { name: f.name } : null),
          },
        },
      },
    },
  },
};
