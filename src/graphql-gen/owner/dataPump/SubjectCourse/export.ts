export default {
  export: {
    queries: {
      SubjectCourse: {
        query: 'SubjectCourse/list.graphql',
        /*process: (f) => ({
          SubjectCourse: f.viewer.subjectCourses ? f.viewer.subjectCourses.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      },
    },
  },
};
