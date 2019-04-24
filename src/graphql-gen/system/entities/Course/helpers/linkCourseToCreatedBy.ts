import gql from 'graphql-tag';

export default async function linkCourseToCreatedBy({
  context,
  createdBy,
  course,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation addToCourseBelongsToCreatedBy(
          $input: addToCourseBelongsToCreatedByInput!
        ) {
          addToCourseBelongsToCreatedBy(input: $input) {
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
