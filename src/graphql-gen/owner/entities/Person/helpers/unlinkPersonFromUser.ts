import gql from 'graphql-tag';

export default async function unlinkPersonFromUser({ context, user, person }) {
  if (user) {
    await context.userGQL({
      query: gql`
        mutation removeFromPersonBelongsToUser(
          $input: removeFromPersonBelongsToUserInput!
        ) {
          removeFromPersonBelongsToUser(input: $input) {
            person {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          person: person.id,
          user: user.id,
        },
      },
    });
  }
}
