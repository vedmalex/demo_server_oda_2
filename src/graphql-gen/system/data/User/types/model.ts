export interface IUserInput {
  id: string;
  userName: string;
  password: string;
  isAdmin?: boolean;
  isSystem?: boolean;
  enabled?: boolean;
}

export interface IUser {
  id: string;
  userName: string;
  password: string;
  isAdmin?: boolean;
  isSystem?: boolean;
  enabled?: boolean;
}

export class UserInput implements IUserInput {
  public __type: 'User' = 'User';
  public id: string;
  public userName: string;
  public password: string;
  public isAdmin?: boolean;
  public isSystem?: boolean;
  public enabled?: boolean;
  constructor(init: PartialUserInput) {
    this.id = init.id;
    this.userName = init.userName;
    this.password = init.password;
    this.isAdmin = init.isAdmin;
    this.isSystem = init.isSystem;
    this.enabled = init.enabled;
  }
}

export class User implements IUser {
  public __type: 'User' = 'User';
  public id: string;
  public userName: string;
  public password: string;
  public isAdmin?: boolean;
  public isSystem?: boolean;
  public enabled?: boolean;
  constructor(init: PartialUser) {
    this.id = init.id;
    this.userName = init.userName;
    this.password = init.password;
    this.isAdmin = init.isAdmin;
    this.isSystem = init.isSystem;
    this.enabled = init.enabled;
  }
}

export function isUser(obj): obj is IUser {
  return (
    obj instanceof User ||
    obj.__type === 'User' ||
    (obj.id ||
      obj.userName ||
      obj.password ||
      obj.isAdmin ||
      obj.isSystem ||
      obj.enabled)
  );
}

export type PartialUser = { [P in keyof IUser]?: IUser[P] };

export type PartialUserInput = { [P in keyof IUserInput]?: IUserInput[P] };

export interface IUserEdge {
  cursor: String;
  node: IUser;
}

export interface IUserConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IUserEdge[];
}
