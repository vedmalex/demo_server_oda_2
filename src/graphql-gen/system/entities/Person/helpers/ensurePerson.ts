import gql from 'graphql-tag';

export default async function ensurePerson({ args, context, create }) {
  // find
  let filter;
  let fArgs;
  let variables;
  if (args.id) {
    fArgs = '$id: ID';
    filter = 'id: $id';
    variables = {
      id: args.id,
    };
  }
  let person;
  if (filter) {
    person = await context
      .userGQL({
        query: gql`query findPerson(${fArgs}){
            person(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.person);
  }

  if (!person) {
    if (create) {
      person = await context
        .userGQL({
          query: gql`
            mutation createPerson($person: createPersonInput!) {
              createPerson(input: $person) {
                person {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            person: {
              createdBy: args.createdBy,
              updateBy: args.updateBy,
              createdAt: args.createdAt,
              updatedAt: args.updatedAt,
              removed: args.removed,
              owner: args.owner,
            },
          },
        })
        .then(r => r.data.createPerson.person.node);
    }
  } else {
    // update
    person = await context
      .userGQL({
        query: gql`
          mutation updatePerson($person: updatePersonInput!) {
            updatePerson(input: $person) {
              person {
                id
              }
            }
          }
        `,
        variables: {
          person: {
            createdBy: args.createdBy,
            updateBy: args.updateBy,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            removed: args.removed,
            owner: args.owner,
          },
        },
      })
      .then(r => r.data.updatePerson.person);
  }
  return person;
}
