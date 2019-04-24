import Person from './Person';
import UpdatePersonSubscriptionPayload from './UpdatePersonSubscriptionPayload';
import PersonSubscription from './PersonSubscription';
import PersonBelongsToCreatedByArgsSubscriptionPayload from './PersonBelongsToCreatedByArgsSubscriptionPayload';
import PersonBelongsToCreatedBySubscriptionPayload from './PersonBelongsToCreatedBySubscriptionPayload';
import PersonBelongsToUpdateByArgsSubscriptionPayload from './PersonBelongsToUpdateByArgsSubscriptionPayload';
import PersonBelongsToUpdateBySubscriptionPayload from './PersonBelongsToUpdateBySubscriptionPayload';
import PersonSubscriptionPayload from './PersonSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Person.subscriptions',
  items: [
    Person,
    UpdatePersonSubscriptionPayload,
    PersonSubscription,
    PersonBelongsToCreatedByArgsSubscriptionPayload,
    PersonBelongsToCreatedBySubscriptionPayload,
    PersonBelongsToUpdateByArgsSubscriptionPayload,
    PersonBelongsToUpdateBySubscriptionPayload,
    PersonSubscriptionPayload,
  ],
});
