import gql from 'graphql-tag';

export default async function unlinkSubjectFromCourse({
  context,
  course,
  subject,
}) {
  if (course) {
    await context.userGQL({
      query: gql`
        mutation removeFromSubjectBelongsToManyCourses(
          $input: removeFromSubjectBelongsToManyCoursesInput!
        ) {
          removeFromSubjectBelongsToManyCourses(input: $input) {
            subject {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          subject: subject.id,
          course: course.id,
        },
      },
    });
  }
}
