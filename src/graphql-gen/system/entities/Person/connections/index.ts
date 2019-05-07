import { Schema } from '../../../common';

import addToPersonBelongsToUser from './addToPersonBelongsToUser';
import removeFromPersonBelongsToUser from './removeFromPersonBelongsToUser';
import addToPersonHasManyAsStudents from './addToPersonHasManyAsStudents';
import removeFromPersonHasManyAsStudents from './removeFromPersonHasManyAsStudents';
import addToPersonHasOneAsCurator from './addToPersonHasOneAsCurator';
import removeFromPersonHasOneAsCurator from './removeFromPersonHasOneAsCurator';
import addToPersonBelongsToUserInput from './addToPersonBelongsToUserInput';
import addToPersonBelongsToUserPayload from './addToPersonBelongsToUserPayload';
import removeFromPersonBelongsToUserInput from './removeFromPersonBelongsToUserInput';
import removeFromPersonBelongsToUserPayload from './removeFromPersonBelongsToUserPayload';
import addToPersonHasManyAsStudentsInput from './addToPersonHasManyAsStudentsInput';
import addToPersonHasManyAsStudentsPayload from './addToPersonHasManyAsStudentsPayload';
import removeFromPersonHasManyAsStudentsInput from './removeFromPersonHasManyAsStudentsInput';
import removeFromPersonHasManyAsStudentsPayload from './removeFromPersonHasManyAsStudentsPayload';
import addToPersonHasOneAsCuratorInput from './addToPersonHasOneAsCuratorInput';
import addToPersonHasOneAsCuratorPayload from './addToPersonHasOneAsCuratorPayload';
import removeFromPersonHasOneAsCuratorInput from './removeFromPersonHasOneAsCuratorInput';
import removeFromPersonHasOneAsCuratorPayload from './removeFromPersonHasOneAsCuratorPayload';

export default new Schema({
  name: 'Person.connections',
  items: [
    addToPersonBelongsToUser,
    removeFromPersonBelongsToUser,
    addToPersonHasManyAsStudents,
    removeFromPersonHasManyAsStudents,
    addToPersonHasOneAsCurator,
    removeFromPersonHasOneAsCurator,
    addToPersonBelongsToUserInput,
    addToPersonBelongsToUserPayload,
    removeFromPersonBelongsToUserInput,
    removeFromPersonBelongsToUserPayload,
    addToPersonHasManyAsStudentsInput,
    addToPersonHasManyAsStudentsPayload,
    removeFromPersonHasManyAsStudentsInput,
    removeFromPersonHasManyAsStudentsPayload,
    addToPersonHasOneAsCuratorInput,
    addToPersonHasOneAsCuratorPayload,
    removeFromPersonHasOneAsCuratorInput,
    removeFromPersonHasOneAsCuratorPayload,
  ],
});
