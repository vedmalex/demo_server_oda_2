import Person from './Person';
import UpdatePersonSubscriptionPayload from './UpdatePersonSubscriptionPayload';
import PersonSubscription from './PersonSubscription';
import PersonBelongsToUserArgsSubscriptionPayload from './PersonBelongsToUserArgsSubscriptionPayload';
import PersonBelongsToUserSubscriptionPayload from './PersonBelongsToUserSubscriptionPayload';
import PersonHasManySocialNetworksArgsSubscriptionPayload from './PersonHasManySocialNetworksArgsSubscriptionPayload';
import PersonHasManySocialNetworksSubscriptionPayload from './PersonHasManySocialNetworksSubscriptionPayload';
import PersonHasManyPhonesArgsSubscriptionPayload from './PersonHasManyPhonesArgsSubscriptionPayload';
import PersonHasManyPhonesSubscriptionPayload from './PersonHasManyPhonesSubscriptionPayload';
import PersonHasManyEmailsArgsSubscriptionPayload from './PersonHasManyEmailsArgsSubscriptionPayload';
import PersonHasManyEmailsSubscriptionPayload from './PersonHasManyEmailsSubscriptionPayload';
import PersonHasManyAsStudentsArgsSubscriptionPayload from './PersonHasManyAsStudentsArgsSubscriptionPayload';
import PersonHasManyAsStudentsSubscriptionPayload from './PersonHasManyAsStudentsSubscriptionPayload';
import PersonHasOneAsCuratorArgsSubscriptionPayload from './PersonHasOneAsCuratorArgsSubscriptionPayload';
import PersonHasOneAsCuratorSubscriptionPayload from './PersonHasOneAsCuratorSubscriptionPayload';
import PersonSubscriptionPayload from './PersonSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Person.subscriptions',
  items: [
    Person,
    UpdatePersonSubscriptionPayload,
    PersonSubscription,
    PersonBelongsToUserArgsSubscriptionPayload,
    PersonBelongsToUserSubscriptionPayload,
    PersonHasManySocialNetworksArgsSubscriptionPayload,
    PersonHasManySocialNetworksSubscriptionPayload,
    PersonHasManyPhonesArgsSubscriptionPayload,
    PersonHasManyPhonesSubscriptionPayload,
    PersonHasManyEmailsArgsSubscriptionPayload,
    PersonHasManyEmailsSubscriptionPayload,
    PersonHasManyAsStudentsArgsSubscriptionPayload,
    PersonHasManyAsStudentsSubscriptionPayload,
    PersonHasOneAsCuratorArgsSubscriptionPayload,
    PersonHasOneAsCuratorSubscriptionPayload,
    PersonSubscriptionPayload,
  ],
});
