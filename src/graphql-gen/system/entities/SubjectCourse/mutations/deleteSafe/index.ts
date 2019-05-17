import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'SubjectCourse.mutation.delete.safe',
  schema: gql`
    extend type Mutation {
      deleteManySubjectCourseSafe(
        input: [deleteManySubjectCourseInput!]
      ): [deleteManySubjectCoursePayload]
      deleteSubjectCourseSafe(
        input: deleteSubjectCourseInput!
      ): deleteSubjectCoursePayload
    }
  `,
  resolver: {
    Mutation: {
      deleteManySubjectCourseSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteManySubjectCourseSafe');
          return context.resolvers.Mutation.deleteManySubjectCourse(
            root,
            args,
            context,
            info,
          );
        },
      ),
      deleteSubjectCourseSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteSubjectCourseSafe');
          return context.resolvers.Mutation.deleteSubjectCourse(
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
