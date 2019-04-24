import { Schema } from '../../../common';

import addToPersonBelongsToUser from './addToPersonBelongsToUser';
import removeFromPersonBelongsToUser from './removeFromPersonBelongsToUser';
import addToPersonHasManySocialNetworks from './addToPersonHasManySocialNetworks';
import removeFromPersonHasManySocialNetworks from './removeFromPersonHasManySocialNetworks';
import addToPersonHasManyPhones from './addToPersonHasManyPhones';
import removeFromPersonHasManyPhones from './removeFromPersonHasManyPhones';
import addToPersonHasManyEmails from './addToPersonHasManyEmails';
import removeFromPersonHasManyEmails from './removeFromPersonHasManyEmails';
import addToPersonHasManyAsStudents from './addToPersonHasManyAsStudents';
import removeFromPersonHasManyAsStudents from './removeFromPersonHasManyAsStudents';
import addToPersonHasOneAsCurator from './addToPersonHasOneAsCurator';
import removeFromPersonHasOneAsCurator from './removeFromPersonHasOneAsCurator';
import addToPersonBelongsToUserInput from './addToPersonBelongsToUserInput';
import addToPersonBelongsToUserPayload from './addToPersonBelongsToUserPayload';
import removeFromPersonBelongsToUserInput from './removeFromPersonBelongsToUserInput';
import removeFromPersonBelongsToUserPayload from './removeFromPersonBelongsToUserPayload';
import addToPersonHasManySocialNetworksInput from './addToPersonHasManySocialNetworksInput';
import addToPersonHasManySocialNetworksPayload from './addToPersonHasManySocialNetworksPayload';
import removeFromPersonHasManySocialNetworksInput from './removeFromPersonHasManySocialNetworksInput';
import removeFromPersonHasManySocialNetworksPayload from './removeFromPersonHasManySocialNetworksPayload';
import addToPersonHasManyPhonesInput from './addToPersonHasManyPhonesInput';
import addToPersonHasManyPhonesPayload from './addToPersonHasManyPhonesPayload';
import removeFromPersonHasManyPhonesInput from './removeFromPersonHasManyPhonesInput';
import removeFromPersonHasManyPhonesPayload from './removeFromPersonHasManyPhonesPayload';
import addToPersonHasManyEmailsInput from './addToPersonHasManyEmailsInput';
import addToPersonHasManyEmailsPayload from './addToPersonHasManyEmailsPayload';
import removeFromPersonHasManyEmailsInput from './removeFromPersonHasManyEmailsInput';
import removeFromPersonHasManyEmailsPayload from './removeFromPersonHasManyEmailsPayload';
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
    addToPersonHasManySocialNetworks,
    removeFromPersonHasManySocialNetworks,
    addToPersonHasManyPhones,
    removeFromPersonHasManyPhones,
    addToPersonHasManyEmails,
    removeFromPersonHasManyEmails,
    addToPersonHasManyAsStudents,
    removeFromPersonHasManyAsStudents,
    addToPersonHasOneAsCurator,
    removeFromPersonHasOneAsCurator,
    addToPersonBelongsToUserInput,
    addToPersonBelongsToUserPayload,
    removeFromPersonBelongsToUserInput,
    removeFromPersonBelongsToUserPayload,
    addToPersonHasManySocialNetworksInput,
    addToPersonHasManySocialNetworksPayload,
    removeFromPersonHasManySocialNetworksInput,
    removeFromPersonHasManySocialNetworksPayload,
    addToPersonHasManyPhonesInput,
    addToPersonHasManyPhonesPayload,
    removeFromPersonHasManyPhonesInput,
    removeFromPersonHasManyPhonesPayload,
    addToPersonHasManyEmailsInput,
    addToPersonHasManyEmailsPayload,
    removeFromPersonHasManyEmailsInput,
    removeFromPersonHasManyEmailsPayload,
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
