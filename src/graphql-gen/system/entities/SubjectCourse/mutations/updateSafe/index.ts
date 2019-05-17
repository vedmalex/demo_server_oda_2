import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'SubjectCourse.mutation.update.safe',
  schema: gql`
    extend type Mutation {
      updateManySubjectCourseSafe(
        input: [updateManySubjectCourseInput!]
      ): [updateManySubjectCoursePayload]
      updateSubjectCourseSafe(
        input: updateSubjectCourseInput!
      ): updateSubjectCoursePayload
    }
  `,
  resolver: {
    Mutation: {
      updateManySubjectCourseSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateManySubjectCourseSafe');
          return context.resolvers.Mutation.updateManySubjectCourse(
            root,
            args,
            context,
            info,
          );
        },
      ),
      updateSubjectCourseSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateSubjectCourseSafe');
          return context.resolvers.Mutation.updateSubjectCourse(
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
