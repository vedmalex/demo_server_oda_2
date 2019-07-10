import { logger } from '../../../common';
import gql from 'graphql-tag';

export default async function unlinkPersonFromAll(
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
      fragment UnlinkPerson on Person {
        id
        userUnlink: user {
          id
        }
        asStudentsUnlink: asStudents @_(get: "edges") {
          edges @_(map: "node") {
            node {
              id
            }
          }
        }
        asCuratorUnlink: asCurator {
          id
        }
      }
    `;
    const input = await context
      .userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: person(${pArgs}){
            ...UnlinkPerson
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
          mutation unlink($input: updatePersonInput!) {
            updatePerson(input: $input) {
              person {
                ...UnlinkPerson
              }
            }
          }
          ${unlinkFragment}
        `,
        variables: { input },
      });
    } else {
      const err = `connector for 'Person': can't unlink from not existing item`;
      logger.error(err);
      throw new Error(err);
    }
  }
}
