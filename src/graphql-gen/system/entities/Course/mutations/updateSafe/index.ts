import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Course.mutation.update.safe',
  schema: gql`
    extend type Mutation {
      updateManyCourseSafe(
        input: [updateManyCourseInput!]
      ): [updateManyCoursePayload]
      updateCourseSafe(input: updateCourseInput!): updateCoursePayload
    }
  `,
  resolver: {
    Mutation: {
      updateManyCourseSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateManyCourseSafe');
          return context.resolvers.Mutation.updateManyCourse(
            root,
            args,
            context,
            info,
          );
        },
      ),
      updateCourseSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateCourseSafe');
          return context.resolvers.Mutation.updateCourse(
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
