import { Schema } from '../../../common';

import addToSubjectCourseBelongsToSubjectLink from './addToSubjectCourseBelongsToSubjectLink';
import removeFromSubjectCourseBelongsToSubjectLink from './removeFromSubjectCourseBelongsToSubjectLink';
import addToSubjectCourseBelongsToCourseLink from './addToSubjectCourseBelongsToCourseLink';
import removeFromSubjectCourseBelongsToCourseLink from './removeFromSubjectCourseBelongsToCourseLink';
import addToSubjectCourseBelongsToSubjectLinkInput from './addToSubjectCourseBelongsToSubjectLinkInput';
import addToSubjectCourseBelongsToSubjectLinkPayload from './addToSubjectCourseBelongsToSubjectLinkPayload';
import removeFromSubjectCourseBelongsToSubjectLinkInput from './removeFromSubjectCourseBelongsToSubjectLinkInput';
import removeFromSubjectCourseBelongsToSubjectLinkPayload from './removeFromSubjectCourseBelongsToSubjectLinkPayload';
import addToSubjectCourseBelongsToCourseLinkInput from './addToSubjectCourseBelongsToCourseLinkInput';
import addToSubjectCourseBelongsToCourseLinkPayload from './addToSubjectCourseBelongsToCourseLinkPayload';
import removeFromSubjectCourseBelongsToCourseLinkInput from './removeFromSubjectCourseBelongsToCourseLinkInput';
import removeFromSubjectCourseBelongsToCourseLinkPayload from './removeFromSubjectCourseBelongsToCourseLinkPayload';

export default new Schema({
  name: 'SubjectCourse.connections',
  items: [
    addToSubjectCourseBelongsToSubjectLink,
    removeFromSubjectCourseBelongsToSubjectLink,
    addToSubjectCourseBelongsToCourseLink,
    removeFromSubjectCourseBelongsToCourseLink,
    addToSubjectCourseBelongsToSubjectLinkInput,
    addToSubjectCourseBelongsToSubjectLinkPayload,
    removeFromSubjectCourseBelongsToSubjectLinkInput,
    removeFromSubjectCourseBelongsToSubjectLinkPayload,
    addToSubjectCourseBelongsToCourseLinkInput,
    addToSubjectCourseBelongsToCourseLinkPayload,
    removeFromSubjectCourseBelongsToCourseLinkInput,
    removeFromSubjectCourseBelongsToCourseLinkPayload,
  ],
});
