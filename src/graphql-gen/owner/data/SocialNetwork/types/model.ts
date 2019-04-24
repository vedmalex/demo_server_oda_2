export interface ISocialNetwork {
  id: string;
  account: string;
  url?: string;
  type?: string;
  person?: string;
  createdBy?: string;
  updateBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;
  owner?: string;
}

export class SocialNetwork implements ISocialNetwork {
  public __type: 'SocialNetwork' = 'SocialNetwork';
  public id: string;
  public account: string;
  public url?: string;
  public type?: string;
  public person?: string;
  public createdBy?: string;
  public updateBy?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public removed?: boolean;
  public owner?: string;
  constructor(init: PartialSocialNetwork) {
    this.id = init.id;
    this.account = init.account;
    this.url = init.url;
    this.type = init.type;
    this.person = init.person;
    this.createdBy = init.createdBy;
    this.updateBy = init.updateBy;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
    this.removed = init.removed;
    this.owner = init.owner;
  }
}

export function isSocialNetwork(obj): obj is ISocialNetwork {
  return (
    obj instanceof SocialNetwork ||
    obj.__type === 'SocialNetwork' ||
    (obj.id ||
      obj.account ||
      obj.url ||
      obj.type ||
      obj.person ||
      obj.createdBy ||
      obj.updateBy ||
      obj.createdAt ||
      obj.updatedAt ||
      obj.removed ||
      obj.owner)
  );
}

export type PartialSocialNetwork = {
  [P in keyof ISocialNetwork]?: ISocialNetwork[P]
};

export interface ISocialNetworkEdge {
  cursor: String;
  node: ISocialNetwork;
}

export interface ISocialNetworkConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: ISocialNetworkEdge[];
}
