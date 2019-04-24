import gql from 'graphql-tag';

export default async function linkPersonToUser({ context, user, person }) {
  if (user) {
    await context.userGQL({
      query: gql`
        mutation addToPersonBelongsToUser(
          $input: addToPersonBelongsToUserInput!
        ) {
          addToPersonBelongsToUser(input: $input) {
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
