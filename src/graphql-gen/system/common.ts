import * as log4js from 'log4js';
let logger = log4js.getLogger('graphql:query');
import { get } from 'lodash';

import { pubsub } from '../../model/pubsub';

export function filterIt(payload, queryCheck) {
  return queryCheck(payload);
}

import {
  emptyConnection,
  pagination,
  detectCursorDirection,
  consts,
  mutateAndGetPayload,
  Filter,
} from 'oda-api-graphql';
import { lib } from 'oda-gen-common';

import { PubSubEngine, withFilter } from 'graphql-subscriptions';

const { selectionTree: traverse } = lib;

import { utils, getWithType } from 'oda-api-graphql';
import RegisterConnectors from './data/registerConnectors';

const { validId } = utils;

export * from './helpers';

import {
  Enum,
  Input,
  Interface,
  ModelType,
  Mutation,
  ObjectResolver,
  EnumResolver,
  FieldDefinition,
  IGQLInput,
  ModelTypes,
  Query,
  Resolver,
  ResolverFunction,
  Scalar,
  Directive,
  Subscription,
  ScalarResolver,
  Type,
  Union,
  Schema,
  UnionInterfaceResolverFunction,
  // } from '../typedef';
} from 'oda-gen-common';

export {
  Enum,
  Input,
  Interface,
  ModelType,
  Mutation,
  ObjectResolver,
  EnumResolver,
  FieldDefinition,
  IGQLInput,
  ModelTypes,
  Query,
  Resolver,
  ResolverFunction,
  Scalar,
  Directive,
  ScalarResolver,
  Subscription,
  Type,
  Union,
  Schema,
  UnionInterfaceResolverFunction,
  getWithType,
};

export async function fixCount(
  length: number,
  cursor: { skip?: number; limit?: number },
  getCount: () => Promise<Number>,
) {
  const count = await getCount();
  if (count > 0) {
    if (length == cursor.limit) {
      return count;
    }
    if (length < cursor.limit) {
      return cursor.skip + length;
    } else {
      return count;
    }
  }
  return count;
}

export {
  RegisterConnectors,
  validId,
  get,
  traverse,
  pagination,
  detectCursorDirection,
  logger,
  consts,
  emptyConnection,
  PubSubEngine,
  withFilter,
  Filter,
  pubsub,
  mutateAndGetPayload,
};
