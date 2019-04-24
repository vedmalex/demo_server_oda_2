import gql from 'graphql-tag';

export default async function linkPersonToAsStudents({
  context,
  asStudents,
  person,
}) {
  if (asStudents) {
    await context.userGQL({
      query: gql`
        mutation addToPersonHasManyAsStudents(
          $input: addToPersonHasManyAsStudentsInput!
        ) {
          addToPersonHasManyAsStudents(input: $input) {
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
