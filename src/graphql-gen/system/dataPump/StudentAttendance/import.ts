export default {
  import: {
    queries: {
      StudentAttendance: {
        filter: `
          id
          createdAt
          updatedAt
          removed
          owner
          superpuper`,
        uploader: {
          findQuery: {
            id: 'StudentAttendance/findById.graphql',
          },
          // createQuery: 'StudentAttendance/create.graphql',
          // updateQuery: 'StudentAttendance/update.graphql',
          // dataPropName: 'studentAttendance',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      StudentAttendance: {
        filter: `
          id
          createdBy
          updateBy`,
        uploader: {
          findQuery: {
            id: 'StudentAttendance/findById.graphql',
          },
          // createQuery: 'StudentAttendance/create.graphql',
          // updateQuery: 'StudentAttendance/update.graphql',
          // dataPropName: 'studentAttendance',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
