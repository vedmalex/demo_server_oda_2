import { logger } from '../../../common';
import gql from 'graphql-tag';

export default async function unlinkPhoneFromAll(
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
      fragment UnlinkPhone on Phone {
        id
      }
    `;
    const input = await context
      .userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: phone(${pArgs}){
            ...UnlinkPhone
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
          mutation unlink($input: updatePhoneInput!) {
            updatePhone(input: $input) {
              phone {
                ...UnlinkPhone
              }
            }
          }
          ${unlinkFragment}
        `,
        variables: { input },
      });
    } else {
      const err = `connector for 'Phone': can't unlink from not existing item`;
      logger.error(err);
      throw new Error(err);
    }
  }
}
