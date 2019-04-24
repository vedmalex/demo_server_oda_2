export default {
  import: {
    queries: {
      SubjectCourse: {
        filter: `
          id
          description
          subject
          course
          hours
          level`,
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
          subjectLink
          courseLink`,
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
