import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkStudentAttendanceFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deleteStudentAttendance(
        input: deleteStudentAttendanceInput!
      ): deleteStudentAttendancePayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
      },
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        userGQL: (args: any) => Promise<any>;
      },
      info,
    ) => {
      const needCommit = await context.connectors.ensureTransaction();
      const txn = await context.connectors.transaction;
      logger.trace('deleteStudentAttendance');
      try {
        let result;
        let deletePromise = [];
        if (args.id) {
          deletePromise.push(
            unlinkStudentAttendanceFromAll(
              [
                {
                  key: 'id',
                  type: 'ID',
                  value: args.id,
                },
              ],
              context,
            ),
          );
          deletePromise.push(
            context.connectors.StudentAttendance.findOneByIdAndRemove(
              args.id,
            ).then(res => (result = res)),
          );
        }

        await Promise.all(deletePromise);

        if (!result) {
          throw new Error(
            'item of type StudentAttendance is not found for delete',
          );
        }

        if (context.pubsub) {
          context.pubsub.publish('StudentAttendance', {
            StudentAttendance: {
              mutation: 'DELETE',
              node: result,
              previous: null,
              updatedFields: [],
              payload: args,
            },
          });
        }

        if (needCommit) {
          return txn.commit().then(() => ({
            deletedItemId: result.id,
            studentAttendance: result,
          }));
        } else {
          return {
            deletedItemId: result.id,
            studentAttendance: result,
          };
        }
      } catch (e) {
        await txn.abort();
        throw e;
      }
    },
  ),
});
