import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Course.mutation.delete.safe',
  schema: gql`
    extend type Mutation {
      deleteManyCourseSafe(
        input: [deleteManyCourseInput!]
      ): [deleteManyCoursePayload]
      deleteCourseSafe(input: deleteCourseInput!): deleteCoursePayload
    }
  `,
  resolver: {
    Mutation: {
      deleteManyCourseSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteManyCourseSafe');
          return context.resolvers.Mutation.deleteManyCourse(
            root,
            args,
            context,
            info,
          );
        },
      ),
      deleteCourseSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteCourseSafe');
          return context.resolvers.Mutation.deleteCourse(
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
