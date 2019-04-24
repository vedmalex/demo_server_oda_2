import gql from 'graphql-tag';

export default async function linkMeetingToGroup({ context, group, meeting }) {
  if (group) {
    await context.userGQL({
      query: gql`
        mutation addToMeetingBelongsToGroup(
          $input: addToMeetingBelongsToGroupInput!
        ) {
          addToMeetingBelongsToGroup(input: $input) {
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
