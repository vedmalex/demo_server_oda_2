import gql from 'graphql-tag';

export default async function linkSubjectCourseToUpdateBy({
  context,
  updateBy,
  subjectCourse,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation addToSubjectCourseBelongsToUpdateBy(
          $input: addToSubjectCourseBelongsToUpdateByInput!
        ) {
          addToSubjectCourseBelongsToUpdateBy(input: $input) {
            subjectCourse {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          subjectCourse: subjectCourse.id,
          user: updateBy.id,
        },
      },
    });
  }
}
