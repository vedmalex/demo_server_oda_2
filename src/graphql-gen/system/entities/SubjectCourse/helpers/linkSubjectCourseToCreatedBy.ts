import gql from 'graphql-tag';

export default async function linkSubjectCourseToCreatedBy({
  context,
  createdBy,
  subjectCourse,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation addToSubjectCourseBelongsToCreatedBy(
          $input: addToSubjectCourseBelongsToCreatedByInput!
        ) {
          addToSubjectCourseBelongsToCreatedBy(input: $input) {
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
