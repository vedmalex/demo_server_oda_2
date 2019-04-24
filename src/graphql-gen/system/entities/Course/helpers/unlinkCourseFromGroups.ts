import gql from 'graphql-tag';

export default async function unlinkCourseFromGroups({
  context,
  groups,
  course,
}) {
  if (groups) {
    await context.userGQL({
      query: gql`
        mutation removeFromCourseHasManyGroups(
          $input: removeFromCourseHasManyGroupsInput!
        ) {
          removeFromCourseHasManyGroups(input: $input) {
            course {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          course: course.id,
          group: groups.id,
        },
      },
    });
  }
}
