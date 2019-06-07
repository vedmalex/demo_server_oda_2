// tslint:disable-next-line:max-line-length
export let adapter = {
  name: 'mongoose',
  'entities.*.metadata.storage.adapter': 'mongoose',
};

export let securityFields = {
  name: 'security',
  [`entities.^[User].fields.[createdBy,updateBy]`]: {
    name: 'createdBy',
    indexed: true,
    relation: {
      belongsTo: 'User#',
    },
  },
  [`entities.^[User].fields.[createdAt,updatedAt]`]: {
    indexed: true,
    type: 'Date',
  },
  [`entities.^[User].fields.removed`]: {
    type: 'Boolean',
    indexed: true,
  },
};

export let userPasswordStatus = {
  name: 'userPasswordStatus',
  'entities.User.metadata.acl.read': ['public', 'system'],
  'entities.User.fields.password.metadata.acl.read': ['owner', 'system'],
  'entities.User.fields.[enabled,isSystem,isAdmin].metadata.acl.read': {
    $assign: ['system'],
  },
  'entities.User.fields.[id, userName, todos].metadata.acl.read': ['public', 'system'],
};

export let securityAcl = {
  name: 'security',
  'entities.^[User].fields.[createdBy,updateBy,createdAt, updatedAt].metadata.acl.read':
    ['system'],
};

export let ownerFields = {
  name: 'security',
  [`entities.^[User].fields`]: [
    {
      name: ['owner', 'system'],
      indexed: true,
    },
  ],
};

export let ownerAcl = {
  name: 'security',
  [`entities.^[User].fields.owner.metadata.acl.read`]: ['system'],
};

export let defaultVisibility = {
  name: 'default visibility',
  [`entities.*.metadata.acl.read`]: ['owner', 'system'],
  [`entities.*.fields.*.metadata.acl.read`]: ['owner', 'system'],
};

export const accessFixEntities = {
  name: 'Default Mutation access',
  'entities.*.metadata.acl.create': [],
  'entities.*.fields.*.metadata.acl.create': [],
  'entities.*.metadata.acl.read': [],
  'entities.*.fields.*.metadata.acl.read': [],
  'entities.*.metadata.acl.update': [],
  'entities.*.fields.*.metadata.acl.update': [],
  'entities.*.metadata.acl.delete': [],
  'entities.*.fields.*.metadata.acl.delete': [],
  'entities.*.fields.*.metadata.acl.shape': [],
};

export const accessFixMutations = {
  name: 'Default Mutation access',
  'mutations.*.metadata.acl.execute': [],
};

export let defaultMutationAccess = {
  name: 'Default Mutation access',
  'mutations.*.metadata.acl.execute': ['owner', 'system'],
  'mutations.loginUser.metadata.acl.execute': ['public', 'system'],
};

export let defaultIdVisibility = {
  name: 'default id field visibility',
  'entities.*.fields.id.metadata.acl.read': ['public', 'system'],
};

export let runtimeMutationAcl = {
  '*': false,
  system: {
    '*': true,
  },
  owner: {
    '*': true,
  },
  public: {
    '*': false,
    loginUser: true,
    registerUser: true,
  },
};
