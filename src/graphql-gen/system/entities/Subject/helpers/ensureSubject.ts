import gql from 'graphql-tag';

export default async function ensureSubject({ args, context, create }) {
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
  let subject;
  if (filter) {
    subject = await context
      .userGQL({
        query: gql`query findSubject(${fArgs}){
            subject(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.subject);
  }

  if (!subject) {
    if (create) {
      subject = await context
        .userGQL({
          query: gql`
            mutation createSubject($subject: createSubjectInput!) {
              createSubject(input: $subject) {
                subject {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            subject: {
              createdBy: args.createdBy,
              updateBy: args.updateBy,
              createdAt: args.createdAt,
              updatedAt: args.updatedAt,
              removed: args.removed,
              owner: args.owner,
            },
          },
        })
        .then(r => r.data.createSubject.subject.node);
    }
  } else {
    // update
    subject = await context
      .userGQL({
        query: gql`
          mutation updateSubject($subject: updateSubjectInput!) {
            updateSubject(input: $subject) {
              subject {
                id
              }
            }
          }
        `,
        variables: {
          subject: {
            createdBy: args.createdBy,
            updateBy: args.updateBy,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            removed: args.removed,
            owner: args.owner,
          },
        },
      })
      .then(r => r.data.updateSubject.subject);
  }
  return subject;
}
