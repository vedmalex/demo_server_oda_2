import gql from 'graphql-tag';

export default async function linkPhoneToPerson({ context, person, phone }) {
  if (person) {
    await context.userGQL({
      query: gql`
        mutation addToPhoneBelongsToPerson(
          $input: addToPhoneBelongsToPersonInput!
        ) {
          addToPhoneBelongsToPerson(input: $input) {
            phone {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          phone: phone.id,
          person: person.id,
        },
      },
    });
  }
}
