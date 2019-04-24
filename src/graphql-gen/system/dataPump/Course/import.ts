export default {
  import: {
    queries: {
      Course: {
        filter: `
          id
          name`,
        uploader: {
          findQuery: {
            id: 'Course/findById.graphql',
            name: 'Course/findByName.graphql',
          },
          // createQuery: 'Course/create.graphql',
          // updateQuery: 'Course/update.graphql',
          // dataPropName: 'course',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            name: f => (f.hasOwnProperty('name') ? { name: f.name } : null),
          },
        },
      },
    },
    relate: {
      Course: {
        filter: `
          id
          subjects
          groups`,
        uploader: {
          findQuery: {
            id: 'Course/findById.graphql',
            name: 'Course/findByName.graphql',
          },
          // createQuery: 'Course/create.graphql',
          // updateQuery: 'Course/update.graphql',
          // dataPropName: 'course',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            name: f => (f.hasOwnProperty('name') ? { name: f.name } : null),
          },
        },
      },
    },
  },
};
