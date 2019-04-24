export interface IEmail {
  id: string;
  email: string;
  type?: string;
  person?: string;
}

export class Email implements IEmail {
  public __type: 'Email' = 'Email';
  public id: string;
  public email: string;
  public type?: string;
  public person?: string;
  constructor(init: PartialEmail) {
    this.id = init.id;
    this.email = init.email;
    this.type = init.type;
    this.person = init.person;
  }
}

export function isEmail(obj): obj is IEmail {
  return (
    obj instanceof Email ||
    obj.__type === 'Email' ||
    (obj.id || obj.email || obj.type || obj.person)
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
