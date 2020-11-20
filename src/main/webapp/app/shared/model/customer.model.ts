import { Moment } from 'moment';

export const enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export interface ICustomer {
  id?: number;
  username?: string;
  fullName?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  gender?: Gender;
  birthday?: Moment;
  avatar?: string;
  expiredDate?: Moment;
  enableStatus?: boolean;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public username?: string,
    public fullName?: string,
    public address?: string,
    public phoneNumber?: string,
    public email?: string,
    public gender?: Gender,
    public birthday?: Moment,
    public avatar?: string,
    public expiredDate?: Moment,
    public enableStatus?: boolean
  ) {
    this.enableStatus = this.enableStatus || false;
  }
}
