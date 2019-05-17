import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Course.mutation.create.safe',
  schema: gql`
    extend type Mutation {
      createManyCourseSafe(
        input: [createManyCourseInput!]
      ): [createManyCoursePayload]
      createCourseSafe(input: createCourseInput!): createCoursePayload
    }
  `,
  resolver: {
    Mutation: {
      createManyCourseSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createManyCourseSafe');
          return context.resolvers.Mutation.createManyCourse(
            root,
            args,
            context,
            info,
          );
        },
      ),
      createCourseSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createCourseSafe');
          return context.resolvers.Mutation.createCourse(
            root,
            args,
            context,
            info,
          );
        },
      ),
    },
  },
});
