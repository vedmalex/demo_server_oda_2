import _ from 'lodash';
import { get } from 'lodash';

import { RegisterConnectors } from '../../../common';
import { Type, traverse, logger } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type StudentAttendance {
      # # Meeting
      meeting: String
      # # Student
      student: String
      # # Present
      present: Boolean!
      # # Special Notes
      specialNotes: String
      # # Id
      id: ID!
      # # Superpuper
      superpuper: String
      # # Meeting Link

      meetingLink: Meeting

      # # Student Link

      studentLink: Student
    }
  `,
  resolver: {
    id: ({ id }) => id,

    meetingLink: async (
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
      logger.trace('StudentAttendance.meetingLink');
      let result;
      let selectionSet = traverse(info);

      let studentAttendance = await context.connectors.StudentAttendance.findOneById(
        id,
      );
      //BelongsTo
      if (studentAttendance && studentAttendance.meeting) {
        result = await context.connectors.Meeting.findOneById(
          studentAttendance.meeting,
        );
        if (!result) {
          logger.warn(
            'Possibly inconsistent connection for StudentAttendance.meetingLink with id %s to %s',
            id,
            studentAttendance.meeting,
          );
        }
      }

      return result;
    },
    studentLink: async (
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
      logger.trace('StudentAttendance.studentLink');
      let result;
      let selectionSet = traverse(info);

      let studentAttendance = await context.connectors.StudentAttendance.findOneById(
        id,
      );
      //BelongsTo
      if (studentAttendance && studentAttendance.student) {
        result = await context.connectors.Student.findOneById(
          studentAttendance.student,
        );
        if (!result) {
          logger.warn(
            'Possibly inconsistent connection for StudentAttendance.studentLink with id %s to %s',
            id,
            studentAttendance.student,
          );
        }
      }

      return result;
    },
  },
});
