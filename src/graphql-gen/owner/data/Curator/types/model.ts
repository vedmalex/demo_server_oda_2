export interface ICurator {
  id: string;
  person?: string;
  groups?: string[];
  createdBy?: string;
  updateBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;
  owner?: string;
}

export class Curator implements ICurator {
  public __type: 'Curator' = 'Curator';
  public id: string;
  public person?: string;
  public groups?: string[];
  public createdBy?: string;
  public updateBy?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public removed?: boolean;
  public owner?: string;
  constructor(init: PartialCurator) {
    this.id = init.id;
    this.person = init.person;
    this.groups = init.groups;
    this.createdBy = init.createdBy;
    this.updateBy = init.updateBy;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
    this.removed = init.removed;
    this.owner = init.owner;
  }
}

export function isCurator(obj): obj is ICurator {
  return (
    obj instanceof Curator ||
    obj.__type === 'Curator' ||
    (obj.id ||
      obj.person ||
      obj.groups ||
      obj.createdBy ||
      obj.updateBy ||
      obj.createdAt ||
      obj.updatedAt ||
      obj.removed ||
      obj.owner)
  );
}

export type PartialCurator = { [P in keyof ICurator]?: ICurator[P] };

export interface ICuratorEdge {
  cursor: String;
  node: ICurator;
}

export interface ICuratorConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: ICuratorEdge[];
}
