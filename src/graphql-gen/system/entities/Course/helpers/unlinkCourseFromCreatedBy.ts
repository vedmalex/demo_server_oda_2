import gql from 'graphql-tag';

export default async function unlinkCourseFromCreatedBy({
  context,
  createdBy,
  course,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromCourseBelongsToCreatedBy(
          $input: removeFromCourseBelongsToCreatedByInput!
        ) {
          removeFromCourseBelongsToCreatedBy(input: $input) {
            course {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          course: course.id,
          user: createdBy.id,
        },
      },
    });
  }
}
