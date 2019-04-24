import gql from 'graphql-tag';

export default async function linkPersonToEmails({ context, emails, person }) {
  if (emails) {
    await context.userGQL({
      query: gql`
        mutation addToPersonHasManyEmails(
          $input: addToPersonHasManyEmailsInput!
        ) {
          addToPersonHasManyEmails(input: $input) {
            person {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          person: person.id,
          email: emails.id,
        },
      },
    });
  }
}
