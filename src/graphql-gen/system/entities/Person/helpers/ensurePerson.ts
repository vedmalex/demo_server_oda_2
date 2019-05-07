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
  } else if (args.spiritualName) {
    fArgs = '$spiritualName: String';
    filter = 'spiritualName: $spiritualName';
    variables = {
      spiritualName: args.spiritualName,
    };
  } else if (args.fullName) {
    fArgs = '$fullName: String';
    filter = 'fullName: $fullName';
    variables = {
      fullName: args.fullName,
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
      .then(r => r.data && r.data.person);
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
              spiritualName: args.spiritualName,
              fullName: args.fullName,
              dateOfBirth: args.dateOfBirth,
              user: args.user,
              socialNetworks: args.socialNetworks,
              phones: args.phones,
              emails: args.emails,
              asStudents: args.asStudents,
              asCurator: args.asCurator,
              specialNotes: args.specialNotes,
              id: args.id,
            },
          },
        })
        .then(
          r =>
            r.data &&
            r.data.createPerson &&
            r.data.createPerson.person &&
            r.data.createPerson.person.node,
        );
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
            spiritualName: args.spiritualName,
            fullName: args.fullName,
            dateOfBirth: args.dateOfBirth,
            user: args.user,
            socialNetworks: args.socialNetworks,
            phones: args.phones,
            emails: args.emails,
            asStudents: args.asStudents,
            asCurator: args.asCurator,
            specialNotes: args.specialNotes,
            id: args.id,
          },
        },
      })
      .then(r => r.data && r.data.updatePerson && r.data.updatePerson.person);
  }
  return person;
}
