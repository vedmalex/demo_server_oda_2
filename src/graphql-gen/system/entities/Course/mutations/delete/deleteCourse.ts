import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkCourseFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deleteCourse(input: deleteCourseInput!): deleteCoursePayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        name?: string;
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
      logger.trace('deleteCourse');
      try {
        let result;
        let deletePromise = [];
        if (args.id) {
          deletePromise.push(
            unlinkCourseFromAll(
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
            context.connectors.Course.findOneByIdAndRemove(args.id).then(
              res => (result = res),
            ),
          );
        } else if (args.name) {
          deletePromise.push(
            unlinkCourseFromAll(
              [
                {
                  key: 'name',
                  type: 'String',
                  value: args.name,
                },
              ],
              context,
            ),
          );
          deletePromise.push(
            context.connectors.Course.findOneByNameAndRemove(args.name).then(
              res => (result = res),
            ),
          );
        }

        await Promise.all(deletePromise);

        if (!result) {
          throw new Error('item of type Course is not found for delete');
        }

        if (context.pubsub) {
          context.pubsub.publish('Course', {
            Course: {
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
            course: result,
          }));
        } else {
          return {
            deletedItemId: result.id,
            course: result,
          };
        }
      } catch (e) {
        await txn.abort();
        throw e;
      }
    },
  ),
});
