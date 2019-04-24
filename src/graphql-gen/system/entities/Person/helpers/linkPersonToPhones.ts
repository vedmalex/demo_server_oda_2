import gql from 'graphql-tag';

export default async function linkPersonToPhones({ context, phones, person }) {
  if (phones) {
    await context.userGQL({
      query: gql`
        mutation addToPersonHasManyPhones(
          $input: addToPersonHasManyPhonesInput!
        ) {
          addToPersonHasManyPhones(input: $input) {
            person {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          person: person.id,
          phone: phones.id,
        },
      },
    });
  }
}
