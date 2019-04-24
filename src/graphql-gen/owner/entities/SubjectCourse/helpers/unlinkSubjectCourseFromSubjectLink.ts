import gql from 'graphql-tag';

export default async function unlinkSubjectCourseFromSubjectLink({
  context,
  subjectLink,
  subjectCourse,
}) {
  if (subjectLink) {
    await context.userGQL({
      query: gql`
        mutation removeFromSubjectCourseBelongsToSubjectLink(
          $input: removeFromSubjectCourseBelongsToSubjectLinkInput!
        ) {
          removeFromSubjectCourseBelongsToSubjectLink(input: $input) {
            subjectCourse {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          subjectCourse: subjectCourse.id,
          subject: subjectLink.id,
        },
      },
    });
  }
}
