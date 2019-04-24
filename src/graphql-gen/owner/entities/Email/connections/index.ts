import { Schema } from '../../../common';

import addToEmailBelongsToPerson from './addToEmailBelongsToPerson';
import removeFromEmailBelongsToPerson from './removeFromEmailBelongsToPerson';
import addToEmailBelongsToPersonInput from './addToEmailBelongsToPersonInput';
import addToEmailBelongsToPersonPayload from './addToEmailBelongsToPersonPayload';
import removeFromEmailBelongsToPersonInput from './removeFromEmailBelongsToPersonInput';
import removeFromEmailBelongsToPersonPayload from './removeFromEmailBelongsToPersonPayload';

export default new Schema({
  name: 'Email.connections',
  items: [
    addToEmailBelongsToPerson,
    removeFromEmailBelongsToPerson,
    addToEmailBelongsToPersonInput,
    addToEmailBelongsToPersonPayload,
    removeFromEmailBelongsToPersonInput,
    removeFromEmailBelongsToPersonPayload,
  ],
});
