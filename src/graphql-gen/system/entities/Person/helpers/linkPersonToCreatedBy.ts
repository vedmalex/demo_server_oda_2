import gql from 'graphql-tag';

export default async function linkPersonToCreatedBy({
  context,
  createdBy,
  person,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation addToPersonBelongsToCreatedBy(
          $input: addToPersonBelongsToCreatedByInput!
        ) {
          addToPersonBelongsToCreatedBy(input: $input) {
            person {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          person: person.id,
          user: createdBy.id,
        },
      },
    });
  }
}
