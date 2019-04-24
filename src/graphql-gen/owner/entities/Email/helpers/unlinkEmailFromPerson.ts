import gql from 'graphql-tag';

export default async function unlinkEmailFromPerson({
  context,
  person,
  email,
}) {
  if (person) {
    await context.userGQL({
      query: gql`
        mutation removeFromEmailBelongsToPerson(
          $input: removeFromEmailBelongsToPersonInput!
        ) {
          removeFromEmailBelongsToPerson(input: $input) {
            email {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          email: email.id,
          person: person.id,
        },
      },
    });
  }
}
