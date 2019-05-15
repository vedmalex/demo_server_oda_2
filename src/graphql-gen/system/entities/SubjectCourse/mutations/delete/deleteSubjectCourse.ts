import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkSubjectCourseFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deleteSubjectCourse(
        input: deleteSubjectCourseInput!
      ): deleteSubjectCoursePayload
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
      logger.trace('deleteSubjectCourse');
      try {
        let result;
        let deletePromise = [];
        if (args.id) {
          deletePromise.push(
            unlinkSubjectCourseFromAll(
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
            context.connectors.SubjectCourse.findOneByIdAndRemove(args.id).then(
              res => (result = res),
            ),
          );
        }

        await Promise.all(deletePromise);

        if (!result) {
          throw new Error('item of type SubjectCourse is not found for delete');
        }

        if (context.pubsub) {
          context.pubsub.publish('SubjectCourse', {
            SubjectCourse: {
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
            subjectCourse: result,
          }));
        } else {
          return {
            deletedItemId: result.id,
            subjectCourse: result,
          };
        }
      } catch (e) {
        await txn.abort();
        throw e;
      }
    },
  ),
});
