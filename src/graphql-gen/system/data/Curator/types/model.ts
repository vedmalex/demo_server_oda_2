import { PersonInput } from './../../Person/types/model';
import { GroupInput } from './../../Group/types/model';

export interface ICuratorInput {
  id: string;
  person?: PersonInput;
  groups?: GroupInput[];
}

export interface ICurator {
  id: string;
  person?: string;
  groups?: string[];
}

export class CuratorInput implements ICuratorInput {
  public __type: 'Curator' = 'Curator';
  public id: string;
  public person?: PersonInput;
  public groups?: GroupInput[];
  constructor(init: PartialCuratorInput) {
    this.id = init.id;
    this.person = init.person;
    this.groups = init.groups;
  }
}

export class Curator implements ICurator {
  public __type: 'Curator' = 'Curator';
  public id: string;
  public person?: string;
  public groups?: string[];
  constructor(init: PartialCurator) {
    this.id = init.id;
    this.person = init.person;
    this.groups = init.groups;
  }
}

export function isCurator(obj): obj is ICurator {
  return (
    obj instanceof Curator ||
    obj.__type === 'Curator' ||
    (obj.id || obj.person || obj.groups)
  );
}

export type PartialCurator = { [P in keyof ICurator]?: ICurator[P] };

export type PartialCuratorInput = {
  [P in keyof ICuratorInput]?: ICuratorInput[P]
};

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
