import gql from 'graphql-tag';

export default async function linkCourseToGroups({ context, groups, course }) {
  if (groups) {
    await context.userGQL({
      query: gql`
        mutation addToCourseHasManyGroups(
          $input: addToCourseHasManyGroupsInput!
        ) {
          addToCourseHasManyGroups(input: $input) {
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
