export interface IPhoneInput {
  id: string;
  phoneNumber: string;
  type?: string;
}

export interface IPhone {
  id: string;
  phoneNumber: string;
  type?: string;
}

export class PhoneInput implements IPhoneInput {
  public __type: 'Phone' = 'Phone';
  public id: string;
  public phoneNumber: string;
  public type?: string;
  constructor(init: PartialPhoneInput) {
    this.id = init.id;
    this.phoneNumber = init.phoneNumber;
    this.type = init.type;
  }
}

export class Phone implements IPhone {
  public __type: 'Phone' = 'Phone';
  public id: string;
  public phoneNumber: string;
  public type?: string;
  constructor(init: PartialPhone) {
    this.id = init.id;
    this.phoneNumber = init.phoneNumber;
    this.type = init.type;
  }
}

export function isPhone(obj): obj is IPhone {
  return (
    obj instanceof Phone ||
    obj.__type === 'Phone' ||
    (obj.id || obj.phoneNumber || obj.type)
  );
}

export type PartialPhone = { [P in keyof IPhone]?: IPhone[P] };

export type PartialPhoneInput = { [P in keyof IPhoneInput]?: IPhoneInput[P] };

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
