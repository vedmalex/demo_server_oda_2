import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      subjectCourse(id: ID): SubjectCourse
    }
  `,
  resolver: async (
    owner,
    args: {
      id?: string;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('subjectCourse');
    let result;
    if (args.id) {
      result = await context.connectors.SubjectCourse.findOneById(args.id);
    }
    return result;
  },
});
