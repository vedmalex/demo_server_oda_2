import gql from 'graphql-tag';

export default async function unlinkSubjectCourseFromCreatedBy({
  context,
  createdBy,
  subjectCourse,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromSubjectCourseBelongsToCreatedBy(
          $input: removeFromSubjectCourseBelongsToCreatedByInput!
        ) {
          removeFromSubjectCourseBelongsToCreatedBy(input: $input) {
            subjectCourse {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          subjectCourse: subjectCourse.id,
          user: createdBy.id,
        },
      },
    });
  }
}
