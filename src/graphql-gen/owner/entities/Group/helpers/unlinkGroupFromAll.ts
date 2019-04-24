import { logger } from '../../../common';
import gql from 'graphql-tag';

export default async function unlinkGroupFromAll(
  args: {
    key;
    type;
    value;
  }[],
  context: { userGQL: (args: any) => Promise<any> },
) {
  if (args.length > 0 && context) {
    const variables = args.reduce((res, cur) => {
      res[cur.key] = cur.value;
      return res;
    }, {});

    const qArgs = args
      .reduce((res, cur) => {
        res.push(`$${cur.key}: ${cur.type}`);
        return res;
      }, [])
      .join(',');

    const pArgs = args
      .reduce((res, cur) => {
        res.push(`${cur.key}: $${cur.key}`);
        return res;
      }, [])
      .join(',');
    const unlinkFragment = gql`
      fragment UnlinkGroup on Group {
        id
        courseUnlink: course {
          id
        }
        studentsUnlink: students @_(get: "edges") {
          edges @_(map: "node") {
            node {
              id
            }
          }
        }
        curatorUnlink: curator {
          id
        }
      }
    `;
    const input = await context
      .userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: group(${pArgs}){
            ...UnlinkGroup
          }
        }
        ${unlinkFragment}
        `,
        variables,
      })
      .then(r => r.data && r.data.input);

    if (input) {
      await context.userGQL({
        query: gql`
          mutation unlink($input: updateGroupInput!) {
            updateGroup(input: $input) {
              group {
                ...UnlinkGroup
              }
            }
          }
          ${unlinkFragment}
        `,
        variables: { input },
      });
    }
  }
}
