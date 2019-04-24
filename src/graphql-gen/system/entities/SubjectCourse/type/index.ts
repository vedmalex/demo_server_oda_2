import * as _ from 'lodash';
import { get } from 'lodash';

import { RegisterConnectors } from '../../../common';
import { Type, traverse, logger } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type SubjectCourse {
      # # Created At
      createdAt: Date
      # # Updated At
      updatedAt: Date
      # # Removed
      removed: Boolean
      # # Owner
      owner: String
      # # Created By

      createdBy: User

      # # Update By

      updateBy: User
    }
  `,
  resolver: {
    id: ({ id }) => id,

    createdBy: async (
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
      if (subjectCourse && subjectCourse.createdBy) {
        result = await context.connectors.User.findOneById(
          subjectCourse.createdBy,
        );
      }

      return result;
    },
    updateBy: async (
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
      if (subjectCourse && subjectCourse.updateBy) {
        result = await context.connectors.User.findOneById(
          subjectCourse.updateBy,
        );
      }

      return result;
    },
  },
});
