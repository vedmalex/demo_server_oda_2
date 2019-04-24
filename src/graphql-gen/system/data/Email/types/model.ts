export interface IEmail {
  id: string;
  email: string;
  type?: string;
  person?: string;
  createdBy?: string;
  updateBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;
  owner?: string;
}

export class Email implements IEmail {
  public __type: 'Email' = 'Email';
  public id: string;
  public email: string;
  public type?: string;
  public person?: string;
  public createdBy?: string;
  public updateBy?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public removed?: boolean;
  public owner?: string;
  constructor(init: PartialEmail) {
    this.id = init.id;
    this.email = init.email;
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

export function isEmail(obj): obj is IEmail {
  return (
    obj instanceof Email ||
    obj.__type === 'Email' ||
    (obj.id ||
      obj.email ||
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

export type PartialEmail = { [P in keyof IEmail]?: IEmail[P] };

export interface IEmailEdge {
  cursor: String;
  node: IEmail;
}

export interface IEmailConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IEmailEdge[];
}
