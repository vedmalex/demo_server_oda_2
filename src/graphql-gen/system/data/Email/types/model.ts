export interface IEmailInput {
  id: string;
  email: string;
  type?: string;
}

export interface IEmail {
  id: string;
  email: string;
  type?: string;
}

export class EmailInput implements IEmailInput {
  public __type: 'Email' = 'Email';
  public id: string;
  public email: string;
  public type?: string;
  constructor(init: PartialEmailInput) {
    this.id = init.id;
    this.email = init.email;
    this.type = init.type;
  }
}

export class Email implements IEmail {
  public __type: 'Email' = 'Email';
  public id: string;
  public email: string;
  public type?: string;
  constructor(init: PartialEmail) {
    this.id = init.id;
    this.email = init.email;
    this.type = init.type;
  }
}

export function isEmail(obj): obj is IEmail {
  return (
    obj instanceof Email ||
    obj.__type === 'Email' ||
    (obj.id || obj.email || obj.type)
  );
}

export type PartialEmail = { [P in keyof IEmail]?: IEmail[P] };

export type PartialEmailInput = { [P in keyof IEmailInput]?: IEmailInput[P] };

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
