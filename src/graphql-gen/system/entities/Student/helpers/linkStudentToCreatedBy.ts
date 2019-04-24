import gql from 'graphql-tag';

export default async function linkStudentToCreatedBy({
  context,
  createdBy,
  student,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation addToStudentBelongsToCreatedBy(
          $input: addToStudentBelongsToCreatedByInput!
        ) {
          addToStudentBelongsToCreatedBy(input: $input) {
            student {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          student: student.id,
          user: createdBy.id,
        },
      },
    });
  }
}
