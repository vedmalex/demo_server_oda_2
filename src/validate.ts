// tslint:disable:no-unused-variable
import * as dotenv from 'dotenv';
dotenv.config({ silent: true });
import * as path from 'path';
import { odaGen } from 'oda-gen-graphql';
// import * as schema from './../compiledModel.json';
import schema from './schema';
// import * as modelHooks from './model/hooks';

odaGen.validate({
  schema,
  rootDir: path.join(__dirname, '../src', 'graphql-gen'),
  context: {
    defaultAdapter: 'mongoose',
  },
});
