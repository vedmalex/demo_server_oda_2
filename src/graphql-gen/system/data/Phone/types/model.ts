export interface IPhone {
  id: string;
  phoneNumber: string;
  type?: string;
  person?: string;
}

export class Phone implements IPhone {
  public __type: 'Phone' = 'Phone';
  public id: string;
  public phoneNumber: string;
  public type?: string;
  public person?: string;
  constructor(init: PartialPhone) {
    this.id = init.id;
    this.phoneNumber = init.phoneNumber;
    this.type = init.type;
    this.person = init.person;
  }
}

export function isPhone(obj): obj is IPhone {
  return (
    obj instanceof Phone ||
    obj.__type === 'Phone' ||
    (obj.id || obj.phoneNumber || obj.type || obj.person)
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
