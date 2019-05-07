export interface ISocialNetworkInput {
  id: string;
  account: string;
  url?: string;
  type?: string;
}

export interface ISocialNetwork {
  id: string;
  account: string;
  url?: string;
  type?: string;
}

export class SocialNetworkInput implements ISocialNetworkInput {
  public __type: 'SocialNetwork' = 'SocialNetwork';
  public id: string;
  public account: string;
  public url?: string;
  public type?: string;
  constructor(init: PartialSocialNetworkInput) {
    this.id = init.id;
    this.account = init.account;
    this.url = init.url;
    this.type = init.type;
  }
}

export class SocialNetwork implements ISocialNetwork {
  public __type: 'SocialNetwork' = 'SocialNetwork';
  public id: string;
  public account: string;
  public url?: string;
  public type?: string;
  constructor(init: PartialSocialNetwork) {
    this.id = init.id;
    this.account = init.account;
    this.url = init.url;
    this.type = init.type;
  }
}

export function isSocialNetwork(obj): obj is ISocialNetwork {
  return (
    obj instanceof SocialNetwork ||
    obj.__type === 'SocialNetwork' ||
    (obj.id || obj.account || obj.url || obj.type)
  );
}

export type PartialSocialNetwork = {
  [P in keyof ISocialNetwork]?: ISocialNetwork[P]
};

export type PartialSocialNetworkInput = {
  [P in keyof ISocialNetworkInput]?: ISocialNetworkInput[P]
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
