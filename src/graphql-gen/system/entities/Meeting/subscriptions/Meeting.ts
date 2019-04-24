import {
  ModelType,
  Subscription,
  Filter,
  filterIt,
  pubsub,
  withFilter,
} from '../../../common';
import gql from 'graphql-tag';

export default new Subscription({
  type: ModelType.type,
  schema: gql`
    extend type RootSubscription {
      Meeting(filter: MeetingFilterSubscriptions): MeetingSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('Meeting'),
        ({ Meeting }, args, context, info) => {
          let allow = context.connectors.Meeting.secure('read', {
            source: Meeting.node,
          });
          if (allow) {
            return filterIt(Meeting, context.queryCheck);
          } else {
            return false;
          }
        },
      ),
      {
        id: 'id',
        createdBy: 'createdBy',
        updateBy: 'updateBy',
      },
    ),
  },
});
