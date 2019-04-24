import gql from 'graphql-tag';

export default async function ensureMeeting({ args, context, create }) {
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
  let meeting;
  if (filter) {
    meeting = await context
      .userGQL({
        query: gql`query findMeeting(${fArgs}){
            meeting(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.meeting);
  }

  if (!meeting) {
    if (create) {
      meeting = await context
        .userGQL({
          query: gql`
            mutation createMeeting($meeting: createMeetingInput!) {
              createMeeting(input: $meeting) {
                meeting {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            meeting: {
              createdBy: args.createdBy,
              updateBy: args.updateBy,
              createdAt: args.createdAt,
              updatedAt: args.updatedAt,
              removed: args.removed,
              owner: args.owner,
            },
          },
        })
        .then(r => r.data.createMeeting.meeting.node);
    }
  } else {
    // update
    meeting = await context
      .userGQL({
        query: gql`
          mutation updateMeeting($meeting: updateMeetingInput!) {
            updateMeeting(input: $meeting) {
              meeting {
                id
              }
            }
          }
        `,
        variables: {
          meeting: {
            createdBy: args.createdBy,
            updateBy: args.updateBy,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            removed: args.removed,
            owner: args.owner,
          },
        },
      })
      .then(r => r.data.updateMeeting.meeting);
  }
  return meeting;
}
