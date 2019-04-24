export interface IPhone {
  id: string;
  phoneNumber: string;
  type?: string;
  person?: string;
  createdBy?: string;
  updateBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;
  owner?: string;
}

export class Phone implements IPhone {
  public __type: 'Phone' = 'Phone';
  public id: string;
  public phoneNumber: string;
  public type?: string;
  public person?: string;
  public createdBy?: string;
  public updateBy?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public removed?: boolean;
  public owner?: string;
  constructor(init: PartialPhone) {
    this.id = init.id;
    this.phoneNumber = init.phoneNumber;
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

export function isPhone(obj): obj is IPhone {
  return (
    obj instanceof Phone ||
    obj.__type === 'Phone' ||
    (obj.id ||
      obj.phoneNumber ||
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

export type PartialPhone = { [P in keyof IPhone]?: IPhone[P] };

export interface IPhoneEdge {
  cursor: String;
  node: IPhone;
}

export interface IPhoneConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IPhoneEdge[];
}
