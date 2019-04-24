// tslint:disable:no-unused-variable
import * as dotenv from 'dotenv';
dotenv.config({ silent: true });
import * as path from 'path';
import { odaGen } from 'oda-gen-graphql';
// import * as schema from './../compiledModel.json';
import schema from './schema';
import acl from './model/acl';

import * as hooks from './model/hooks';

odaGen.generate({
  hooks: [
    hooks.adapter,
    hooks.accessFixEntities,
    hooks.accessFixMutations,

    hooks.defaultVisibility,
    hooks.defaultIdVisibility,

    hooks.defaultMutationAccess,

    hooks.securityFields,
    hooks.securityAcl,

    hooks.ownerFields,
    hooks.ownerAcl,
    hooks.userPasswordStatus,
  ],
  schema,
  rootDir: path.join(__dirname, '../src', 'graphql-gen'),
  acl,
  context: {
    defaultAdapter: 'mongoose',
  },
});
