export interface ISocialNetwork {
  id: string;
  account: string;
  url?: string;
  type?: string;
  person?: string;
}

export class SocialNetwork implements ISocialNetwork {
  public __type: 'SocialNetwork' = 'SocialNetwork';
  public id: string;
  public account: string;
  public url?: string;
  public type?: string;
  public person?: string;
  constructor(init: PartialSocialNetwork) {
    this.id = init.id;
    this.account = init.account;
    this.url = init.url;
    this.type = init.type;
    this.person = init.person;
  }
}

export function isSocialNetwork(obj): obj is ISocialNetwork {
  return (
    obj instanceof SocialNetwork ||
    obj.__type === 'SocialNetwork' ||
    (obj.id || obj.account || obj.url || obj.type || obj.person)
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
