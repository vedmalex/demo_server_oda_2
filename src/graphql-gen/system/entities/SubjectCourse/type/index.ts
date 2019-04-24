import * as _ from 'lodash';
import { get } from 'lodash';

import { RegisterConnectors } from '../../../common';
import { Type, traverse, logger } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type SubjectCourse {
      # # Description
      description: String
      # # Subject
      subject: String
      # # Course
      course: String
      # # Hours
      hours: Float
      # # The Level Of Depth
      level: String
      # # Id
      id: ID!
      # # Subject Link

      subjectLink: Subject

      # # Course Link

      courseLink: Course
    }
  `,
  resolver: {
    id: ({ id }) => id,

    subjectLink: async (
      { id }, // owner id
      args: {
        limit?: number;
        skip?: number;
        first?: number;
        after?: string;
        last?: number;
        before?: string;
        filter?: {
          [k: string]: any;
        };
        orderBy?: string | string[];
      },
      context: { connectors: RegisterConnectors },
      info,
    ) => {
      let result;
      let selectionSet = traverse(info);

      let subjectCourse = await context.connectors.SubjectCourse.findOneById(
        id,
      );
      //BelongsTo
      if (subjectCourse && subjectCourse.subject) {
        result = await context.connectors.Subject.findOneById(
          subjectCourse.subject,
        );
      }

      return result;
    },
    courseLink: async (
      { id }, // owner id
      args: {
        limit?: number;
        skip?: number;
        first?: number;
        after?: string;
        last?: number;
        before?: string;
        filter?: {
          [k: string]: any;
        };
        orderBy?: string | string[];
      },
      context: { connectors: RegisterConnectors },
      info,
    ) => {
      let result;
      let selectionSet = traverse(info);

      let subjectCourse = await context.connectors.SubjectCourse.findOneById(
        id,
      );
      //BelongsTo
      if (subjectCourse && subjectCourse.course) {
        result = await context.connectors.Course.findOneById(
          subjectCourse.course,
        );
      }

      return result;
    },
  },
});
