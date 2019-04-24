import gql from 'graphql-tag';

export default async function linkMeetingToCurator({
  context,
  curator,
  meeting,
}) {
  if (curator) {
    await context.userGQL({
      query: gql`
        mutation addToMeetingBelongsToCurator(
          $input: addToMeetingBelongsToCuratorInput!
        ) {
          addToMeetingBelongsToCurator(input: $input) {
            meeting {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          meeting: meeting.id,
          curator: curator.id,
        },
      },
    });
  }
}
