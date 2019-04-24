export default {
  import: {
    queries: {
      SubjectCourse: {
        filter: `
          id
          createdAt
          updatedAt
          removed
          owner`,
        uploader: {
          findQuery: {
            id: 'SubjectCourse/findById.graphql',
          },
          // createQuery: 'SubjectCourse/create.graphql',
          // updateQuery: 'SubjectCourse/update.graphql',
          // dataPropName: 'subjectCourse',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      SubjectCourse: {
        filter: `
          id
          createdBy
          updateBy`,
        uploader: {
          findQuery: {
            id: 'SubjectCourse/findById.graphql',
          },
          // createQuery: 'SubjectCourse/create.graphql',
          // updateQuery: 'SubjectCourse/update.graphql',
          // dataPropName: 'subjectCourse',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
