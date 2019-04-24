import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  unlinkSubjectCourseFromCreatedBy,
  linkSubjectCourseToCreatedBy,
  unlinkSubjectCourseFromUpdateBy,
  linkSubjectCourseToUpdateBy,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateSubjectCourse(
        input: updateSubjectCourseInput!
      ): updateSubjectCoursePayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        createdAt?: Date;
        updatedAt?: Date;
        removed?: boolean;
        owner?: string;
        createdBy?: object /*User*/;
        createdByUnlink?: object /*User*/;
        createdByCreate?: object /*User*/;
        updateBy?: object /*User*/;
        updateByUnlink?: object /*User*/;
        updateByCreate?: object /*User*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateSubjectCourse');
      let payload = context.connectors.SubjectCourse.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.SubjectCourse.findOneById(args.id);
        result = await context.connectors.SubjectCourse.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type SubjectCourse is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('SubjectCourse', {
          SubjectCourse: {
            mutation: 'UPDATE',
            node: result,
            previous,
            updatedFields: Object.keys(payload).filter(
              f => payload[f] !== undefined,
            ),
            payload: args,
          },
        });
      }

      if (args.createdByUnlink) {
        let $item = args.createdByUnlink;
        if ($item) {
          let createdBy = await ensureUser({
            args: $item,
            context,
            create: false,
          });
          await unlinkSubjectCourseFromCreatedBy({
            context,
            createdBy,
            subjectCourse: result,
          });
        }
      }

      if (args.createdByCreate) {
        let $item = args.createdByCreate as { id };
        if ($item) {
          let createdBy = await ensureUser({
            args: $item,
            context,
            create: true,
          });

          await linkSubjectCourseToCreatedBy({
            context,
            createdBy,
            subjectCourse: result,
          });
        }
      }

      if (args.createdBy) {
        let $item = args.createdBy as { id };
        if ($item) {
          let createdBy = await ensureUser({
            args: $item,
            context,
            create: false,
          });

          await linkSubjectCourseToCreatedBy({
            context,
            createdBy,
            subjectCourse: result,
          });
        }
      }

      if (args.updateByUnlink) {
        let $item = args.updateByUnlink;
        if ($item) {
          let updateBy = await ensureUser({
            args: $item,
            context,
            create: false,
          });
          await unlinkSubjectCourseFromUpdateBy({
            context,
            updateBy,
            subjectCourse: result,
          });
        }
      }

      if (args.updateByCreate) {
        let $item = args.updateByCreate as { id };
        if ($item) {
          let updateBy = await ensureUser({
            args: $item,
            context,
            create: true,
          });

          await linkSubjectCourseToUpdateBy({
            context,
            updateBy,
            subjectCourse: result,
          });
        }
      }

      if (args.updateBy) {
        let $item = args.updateBy as { id };
        if ($item) {
          let updateBy = await ensureUser({
            args: $item,
            context,
            create: false,
          });

          await linkSubjectCourseToUpdateBy({
            context,
            updateBy,
            subjectCourse: result,
          });
        }
      }

      return {
        subjectCourse: result,
      };
    },
  ),
});
