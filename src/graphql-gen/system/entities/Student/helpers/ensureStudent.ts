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
      .then(r => r.data.student);
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
              createdBy: args.createdBy,
              updateBy: args.updateBy,
              createdAt: args.createdAt,
              updatedAt: args.updatedAt,
              removed: args.removed,
              owner: args.owner,
            },
          },
        })
        .then(r => r.data.createStudent.student.node);
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
            createdBy: args.createdBy,
            updateBy: args.updateBy,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            removed: args.removed,
            owner: args.owner,
          },
        },
      })
      .then(r => r.data.updateStudent.student);
  }
  return student;
}
