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
      .then(r => r.data && r.data.meeting);
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
              date: args.date,
              curator: args.curator,
              group: args.group,
              students: args.students,
              id: args.id,
            },
          },
        })
        .then(
          r =>
            r.data &&
            r.data.createMeeting &&
            r.data.createMeeting.meeting &&
            r.data.createMeeting.meeting.node,
        );
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
            date: args.date,
            curator: args.curator,
            group: args.group,
            students: args.students,
            id: args.id,
          },
        },
      })
      .then(
        r => r.data && r.data.updateMeeting && r.data.updateMeeting.meeting,
      );
  }
  return meeting;
}
