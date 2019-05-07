import { common } from 'oda-gen-graphql';
import { passport } from 'oda-api-common';

import { Schema } from '../../../graphql-gen/system/common';

const fixupPassword = target => async (
  root: any,
  args: {
    input: any;
  },
  context: any,
  info: any,
) => {

  if (args.input.password) {
    args.input.password = JSON.stringify(
      passport.hashPassword(args.input.password),
    );
  }
  return target(root, args, context, info);
};

export default new Schema({
  name: 'password.hooks',
  hooks: [
    {
      'RootMutation.createUser': fixupPassword,
      'RootMutation.updateUser': fixupPassword,
    },
  ],
});
