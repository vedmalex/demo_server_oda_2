import gql from 'graphql-tag';

export default async function unlinkPersonFromAsStudents({
  context,
  asStudents,
  person,
}) {
  if (asStudents) {
    await context.userGQL({
      query: gql`
        mutation removeFromPersonHasManyAsStudents(
          $input: removeFromPersonHasManyAsStudentsInput!
        ) {
          removeFromPersonHasManyAsStudents(input: $input) {
            person {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          person: person.id,
          student: asStudents.id,
        },
      },
    });
  }
}
