import gql from 'graphql-tag';

export default async function linkEmailToPerson({ context, person, email }) {
  if (person) {
    await context.userGQL({
      query: gql`
        mutation addToEmailBelongsToPerson(
          $input: addToEmailBelongsToPersonInput!
        ) {
          addToEmailBelongsToPerson(input: $input) {
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
