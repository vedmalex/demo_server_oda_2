import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureSubject,
  unlinkCourseFromSubjects,
  linkCourseToSubjects,
  ensureGroup,
  unlinkCourseFromGroups,
  linkCourseToGroups,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateCourse(input: updateCourseInput!): updateCoursePayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        name?: string;
        subjects?: object /*Subject*/[];
        subjectsUnlink?: object /*Subject*/[];
        subjectsCreate?: object /*Subject*/[];
        groups?: object /*Group*/[];
        groupsUnlink?: object /*Group*/[];
        groupsCreate?: object /*Group*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateCourse');
      let payload = context.connectors.Course.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.Course.findOneById(args.id);
        result = await context.connectors.Course.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      } else if (args.name) {
        delete payload.name;
        previous = await context.connectors.Course.findOneByName(args.name);
        result = await context.connectors.Course.findOneByNameAndUpdate(
          args.name,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type Course is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('Course', {
          Course: {
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

      if (
        args.subjectsUnlink &&
        Array.isArray(args.subjectsUnlink) &&
        args.subjectsUnlink.length > 0
      ) {
        for (let i = 0, len = args.subjectsUnlink.length; i < len; i++) {
          let $item = args.subjectsUnlink[i];
          if ($item) {
            let subjects = await ensureSubject({
              args: $item,
              context,
              create: false,
            });
            await unlinkCourseFromSubjects({
              context,
              subjects,
              course: result,
            });
          }
        }
      }

      if (
        args.subjectsCreate &&
        Array.isArray(args.subjectsCreate) &&
        args.subjectsCreate.length > 0
      ) {
        for (let i = 0, len = args.subjectsCreate.length; i < len; i++) {
          let $item = args.subjectsCreate[i] as { id };
          if ($item) {
            let subjects = await ensureSubject({
              args: $item,
              context,
              create: true,
            });

            await linkCourseToSubjects({
              context,
              subjects,
              course: result,
            });
          }
        }
      }

      if (
        args.subjects &&
        Array.isArray(args.subjects) &&
        args.subjects.length > 0
      ) {
        for (let i = 0, len = args.subjects.length; i < len; i++) {
          let $item = args.subjects[i] as { id };
          if ($item) {
            let subjects = await ensureSubject({
              args: $item,
              context,
              create: false,
            });

            await linkCourseToSubjects({
              context,
              subjects,
              course: result,
            });
          }
        }
      }

      if (
        args.groupsUnlink &&
        Array.isArray(args.groupsUnlink) &&
        args.groupsUnlink.length > 0
      ) {
        for (let i = 0, len = args.groupsUnlink.length; i < len; i++) {
          let $item = args.groupsUnlink[i];
          if ($item) {
            let groups = await ensureGroup({
              args: $item,
              context,
              create: false,
            });
            await unlinkCourseFromGroups({
              context,
              groups,
              course: result,
            });
          }
        }
      }

      if (
        args.groupsCreate &&
        Array.isArray(args.groupsCreate) &&
        args.groupsCreate.length > 0
      ) {
        for (let i = 0, len = args.groupsCreate.length; i < len; i++) {
          let $item = args.groupsCreate[i] as { id };
          if ($item) {
            let groups = await ensureGroup({
              args: $item,
              context,
              create: true,
            });

            await linkCourseToGroups({
              context,
              groups,
              course: result,
            });
          }
        }
      }

      if (args.groups && Array.isArray(args.groups) && args.groups.length > 0) {
        for (let i = 0, len = args.groups.length; i < len; i++) {
          let $item = args.groups[i] as { id };
          if ($item) {
            let groups = await ensureGroup({
              args: $item,
              context,
              create: false,
            });

            await linkCourseToGroups({
              context,
              groups,
              course: result,
            });
          }
        }
      }

      return {
        course: result,
      };
    },
  ),
});
