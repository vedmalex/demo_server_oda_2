import FixupPasswordHook from './api-hooks/fixupPassword';
import LoginUserMutation from './mutations/loginUser';
import GetProfileQuery from './queries/getProfileQuery';
import RegisterUserMutation from './mutations/registerUserMutation';
import _acl from './_acl';

import { LodashSchema } from 'oda-lodash';
import { Schema } from '../../graphql-gen/system/common';

export default new Schema({
  name: 'Common.overrides',
  items: [
    LodashSchema,
    FixupPasswordHook,
    LoginUserMutation,
    GetProfileQuery,
    RegisterUserMutation,
    _acl,
  ],
});
