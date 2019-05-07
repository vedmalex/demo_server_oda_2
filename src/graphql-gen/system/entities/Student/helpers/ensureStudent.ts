import gql from 'graphql-tag';

export default async function ensureStudent({ args, context, create }) {
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
  let student;
  if (filter) {
    student = await context
      .userGQL({
        query: gql`query findStudent(${fArgs}){
            student(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data && r.data.student);
  }

  if (!student) {
    if (create) {
      student = await context
        .userGQL({
          query: gql`
            mutation createStudent($student: createStudentInput!) {
              createStudent(input: $student) {
                student {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            student: {
              person: args.person,
              group: args.group,
              meetings: args.meetings,
              id: args.id,
            },
          },
        })
        .then(
          r =>
            r.data &&
            r.data.createStudent &&
            r.data.createStudent.student &&
            r.data.createStudent.student.node,
        );
    }
  } else {
    // update
    student = await context
      .userGQL({
        query: gql`
          mutation updateStudent($student: updateStudentInput!) {
            updateStudent(input: $student) {
              student {
                id
              }
            }
          }
        `,
        variables: {
          student: {
            person: args.person,
            group: args.group,
            meetings: args.meetings,
            id: args.id,
          },
        },
      })
      .then(
        r => r.data && r.data.updateStudent && r.data.updateStudent.student,
      );
  }
  return student;
}
