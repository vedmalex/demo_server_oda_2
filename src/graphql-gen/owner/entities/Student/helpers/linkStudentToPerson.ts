import gql from 'graphql-tag';

export default async function linkStudentToPerson({
  context,
  person,
  student,
}) {
  if (person) {
    await context.userGQL({
      query: gql`
        mutation addToStudentBelongsToPerson(
          $input: addToStudentBelongsToPersonInput!
        ) {
          addToStudentBelongsToPerson(input: $input) {
            student {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          student: student.id,
          person: person.id,
        },
      },
    });
  }
}
