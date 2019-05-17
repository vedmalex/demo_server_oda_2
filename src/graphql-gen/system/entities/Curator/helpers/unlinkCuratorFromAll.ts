import { logger } from '../../../common';
import gql from 'graphql-tag';

export default async function unlinkCuratorFromAll(
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
      fragment UnlinkCurator on Curator {
        id
        personUnlink: person {
          id
        }
        groupsUnlink: groups @_(get: "edges") {
          edges @_(map: "node") {
            node {
              id
            }
          }
        }
      }
    `;
    const input = await context
      .userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: curator(${pArgs}){
            ...UnlinkCurator
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
          mutation unlink($input: updateCuratorInput!) {
            updateCurator(input: $input) {
              curator {
                ...UnlinkCurator
              }
            }
          }
          ${unlinkFragment}
        `,
        variables: { input },
      });
    } else {
      const err = `connector for 'Curator': can't unlink from not existing item`;
      logger.error(err);
      throw new Error(err);
    }
  }
}
