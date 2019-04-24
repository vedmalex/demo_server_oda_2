import gql from 'graphql-tag';

export default async function unlinkStudentFromPerson({
  context,
  person,
  student,
}) {
  if (person) {
    await context.userGQL({
      query: gql`
        mutation removeFromStudentBelongsToPerson(
          $input: removeFromStudentBelongsToPersonInput!
        ) {
          removeFromStudentBelongsToPerson(input: $input) {
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
