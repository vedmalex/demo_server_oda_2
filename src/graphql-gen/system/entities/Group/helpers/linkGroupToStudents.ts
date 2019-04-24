import gql from 'graphql-tag';

export default async function linkGroupToStudents({
  context,
  students,
  group,
}) {
  if (students) {
    await context.userGQL({
      query: gql`
        mutation addToGroupHasManyStudents(
          $input: addToGroupHasManyStudentsInput!
        ) {
          addToGroupHasManyStudents(input: $input) {
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
