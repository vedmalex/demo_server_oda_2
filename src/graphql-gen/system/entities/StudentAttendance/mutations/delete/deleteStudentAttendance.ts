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
    extend type Mutation {
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
      logger.trace('deleteStudentAttendance');
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

      return {
        deletedItemId: result.id,
        studentAttendance: result,
      };
    },
  ),
});
