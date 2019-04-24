import gql from 'graphql-tag';

export default async function ensureStudentAttendance({
  args,
  context,
  create,
}) {
  // find
  let filter;
  let fArgs;
  let variables;
  if (args.id) {
    fArgs = '$id: ID';
    filter = 'id: $id';
    variables = {
      id: args.id,
    };
  }
  let studentAttendance;
  if (filter) {
    studentAttendance = await context
      .userGQL({
        query: gql`query findStudentAttendance(${fArgs}){
            studentAttendance(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.studentAttendance);
  }

  if (!studentAttendance) {
    if (create) {
      studentAttendance = await context
        .userGQL({
          query: gql`
            mutation createStudentAttendance(
              $studentAttendance: createStudentAttendanceInput!
            ) {
              createStudentAttendance(input: $studentAttendance) {
                studentAttendance {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            studentAttendance: {
              meeting: args.meeting,
              student: args.student,
              meetingLink: args.meetingLink,
              studentLink: args.studentLink,
              present: args.present,
              specialNotes: args.specialNotes,
              id: args.id,
            },
          },
        })
        .then(r => r.data.createStudentAttendance.studentAttendance.node);
    }
  } else {
    // update
    studentAttendance = await context
      .userGQL({
        query: gql`
          mutation updateStudentAttendance(
            $studentAttendance: updateStudentAttendanceInput!
          ) {
            updateStudentAttendance(input: $studentAttendance) {
              studentAttendance {
                id
              }
            }
          }
        `,
        variables: {
          studentAttendance: {
            meeting: args.meeting,
            student: args.student,
            meetingLink: args.meetingLink,
            studentLink: args.studentLink,
            present: args.present,
            specialNotes: args.specialNotes,
            id: args.id,
          },
        },
      })
      .then(r => r.data.updateStudentAttendance.studentAttendance);
  }
  return studentAttendance;
}
