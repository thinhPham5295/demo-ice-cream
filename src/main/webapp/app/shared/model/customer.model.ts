import { Moment } from 'moment';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export interface ICustomer {
  id?: number;
  login?: string;
  fullName?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  gender?: Gender;
  birthday?: Moment;
  avatar?: string;
  expiredDate?: Moment;
  activated?: boolean;
}

export class Customer implements ICustomer {
  constructor(
    public id?: number,
    public login?: string,
    public fullName?: string,
    public address?: string,
    public phoneNumber?: string,
    public email?: string,
    public gender?: Gender,
    public birthday?: Moment,
    public avatar?: string,
    public expiredDate?: Moment,
    public activated?: boolean
  ) {
    this.activated = this.activated || false;
  }
}
