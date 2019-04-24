export default {
  export: {
    queries: {
      StudentAttendance: {
        query: 'StudentAttendance/list.graphql',
        /*process: (f) => ({
          StudentAttendance: f.viewer.studentAttendances ? f.viewer.studentAttendances.edges.map(e => ({
            ...e.node,
          })) : [],
        }),*/
      },
    },
  },
};
