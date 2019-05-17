import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'SubjectCourse.mutation.create.safe',
  schema: gql`
    extend type Mutation {
      createManySubjectCourseSafe(
        input: [createManySubjectCourseInput!]
      ): [createManySubjectCoursePayload]
      createSubjectCourseSafe(
        input: createSubjectCourseInput!
      ): createSubjectCoursePayload
    }
  `,
  resolver: {
    Mutation: {
      createManySubjectCourseSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createManySubjectCourseSafe');
          return context.resolvers.Mutation.createManySubjectCourse(
            root,
            args,
            context,
            info,
          );
        },
      ),
      createSubjectCourseSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createSubjectCourseSafe');
          return context.resolvers.Mutation.createSubjectCourse(
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
