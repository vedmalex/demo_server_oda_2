import { logger } from '../../../common';
import gql from 'graphql-tag';

export default async function unlinkStudentAttendanceFromAll(
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
      fragment UnlinkStudentAttendance on StudentAttendance {
        id
        meetingLinkUnlink: meetingLink {
          id
        }
        studentLinkUnlink: studentLink {
          id
        }
      }
    `;
    const input = await context
      .userGQL({
        query: gql`
          query getUnlink(${qArgs}) {
          input: studentAttendance(${pArgs}){
            ...UnlinkStudentAttendance
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
          mutation unlink($input: updateStudentAttendanceInput!) {
            updateStudentAttendance(input: $input) {
              studentAttendance {
                ...UnlinkStudentAttendance
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
