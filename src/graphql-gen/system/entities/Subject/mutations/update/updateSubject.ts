import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureCourse,
  unlinkSubjectFromCourse,
  linkSubjectToCourse,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      updateSubject(input: updateSubjectInput!): updateSubjectPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        name?: string;
        course?: object /*Course*/[];
        courseUnlink?: object /*Course*/[];
        courseCreate?: object /*Course*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateSubject');
      let payload = context.connectors.Subject.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.Subject.findOneById(args.id);
        result = await context.connectors.Subject.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      } else if (args.name) {
        delete payload.name;
        previous = await context.connectors.Subject.findOneByName(args.name);
        result = await context.connectors.Subject.findOneByNameAndUpdate(
          args.name,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type Subject is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('Subject', {
          Subject: {
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

      let resActions = [];
      if (
        args.courseUnlink &&
        Array.isArray(args.courseUnlink) &&
        args.courseUnlink.length > 0
      ) {
        for (let i = 0, len = args.courseUnlink.length; i < len; i++) {
          let $item = args.courseUnlink[i];
          if ($item) {
            resActions.push(async () => {
              let course = await ensureCourse({
                args: $item,
                context,
                create: false,
              });
              if (course) {
                return unlinkSubjectFromCourse({
                  context,
                  course,
                  subject: result,
                });
              } else {
                const err = `can't unlinkSubjectToCourse item not found`;
                logger.error(err);
                throw new Error(err);
              }
            });
          }
        }
      }

      if (
        args.courseCreate &&
        Array.isArray(args.courseCreate) &&
        args.courseCreate.length > 0
      ) {
        for (let i = 0, len = args.courseCreate.length; i < len; i++) {
          let $item = args.courseCreate[i] as { id; hours; level };
          if ($item) {
            resActions.push(async () => {
              let course = await ensureCourse({
                args: $item,
                context,
                create: true,
              });

              if (course) {
                return linkSubjectToCourse({
                  context,
                  course,
                  subject: result,
                  hours: $item.hours,
                  level: $item.level,
                });
              } else {
                const err = `can't linkSubjectToCourse item not found`;
                logger.error(err);
                throw new Error(err);
              }
            });
          }
        }
      }

      if (args.course && Array.isArray(args.course) && args.course.length > 0) {
        for (let i = 0, len = args.course.length; i < len; i++) {
          let $item = args.course[i] as { id; hours; level };
          if ($item) {
            resActions.push(async () => {
              let course = await ensureCourse({
                args: $item,
                context,
                create: false,
              });

              if (course) {
                return linkSubjectToCourse({
                  context,
                  course,
                  subject: result,
                  hours: $item.hours,
                  level: $item.level,
                });
              } else {
                const err = `can't linkSubjectToCourse item not found`;
                logger.error(err);
                throw new Error(err);
              }
            });
          }
        }
      }

      if (resActions.length > 0) {
        await Promise.all(resActions);
      }
      return {
        subject: result,
      };
    },
  ),
});
