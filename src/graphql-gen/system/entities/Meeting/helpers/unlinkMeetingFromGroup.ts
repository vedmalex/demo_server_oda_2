import gql from 'graphql-tag';

export default async function unlinkMeetingFromGroup({
  context,
  group,
  meeting,
}) {
  if (group) {
    await context.userGQL({
      query: gql`
        mutation removeFromMeetingBelongsToGroup(
          $input: removeFromMeetingBelongsToGroupInput!
        ) {
          removeFromMeetingBelongsToGroup(input: $input) {
            meeting {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          meeting: meeting.id,
          group: group.id,
        },
      },
    });
  }
}
