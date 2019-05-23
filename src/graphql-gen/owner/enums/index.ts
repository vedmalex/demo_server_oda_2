import CommunicationType from './CommunicationType';
import WhereCommunicationType from './WhereCommunicationType';

import SocialNetworkType from './SocialNetworkType';
import WhereSocialNetworkType from './WhereSocialNetworkType';

import { Schema } from '../common';

export default new Schema({
  name: 'Owner.enums',
  items: [
    CommunicationType,
    WhereCommunicationType,

    SocialNetworkType,
    WhereSocialNetworkType,
  ],
});
