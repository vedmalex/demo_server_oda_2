import gql from 'graphql-tag';

export default async function unlinkGroupFromStudents({
  context,
  students,
  group,
}) {
  if (students) {
    await context.userGQL({
      query: gql`
        mutation removeFromGroupHasManyStudents(
          $input: removeFromGroupHasManyStudentsInput!
        ) {
          removeFromGroupHasManyStudents(input: $input) {
            group {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          group: group.id,
          student: students.id,
        },
      },
    });
  }
}
