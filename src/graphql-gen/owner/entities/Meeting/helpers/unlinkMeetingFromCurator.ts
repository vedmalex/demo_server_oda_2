import gql from 'graphql-tag';

export default async function unlinkMeetingFromCurator({
  context,
  curator,
  meeting,
}) {
  if (curator) {
    await context.userGQL({
      query: gql`
        mutation removeFromMeetingBelongsToCurator(
          $input: removeFromMeetingBelongsToCuratorInput!
        ) {
          removeFromMeetingBelongsToCurator(input: $input) {
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
