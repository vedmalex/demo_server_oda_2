import gql from 'graphql-tag';

export default async function unlinkCourseFromSubjects({
  context,
  subjects,
  course,
}) {
  if (subjects) {
    await context.userGQL({
      query: gql`
        mutation removeFromCourseBelongsToManySubjects(
          $input: removeFromCourseBelongsToManySubjectsInput!
        ) {
          removeFromCourseBelongsToManySubjects(input: $input) {
            course {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          course: course.id,
          subject: subjects.id,
        },
      },
    });
  }
}
