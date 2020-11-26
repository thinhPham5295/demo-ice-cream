import { Moment } from 'moment';
import { Gender } from 'app/shared/model/customer.model';
import { ExpiredStatus } from 'app/shared/model/enumeration/expired-status.model';

export interface IUser {
  id?: any;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: any[];
  createdBy?: string;
  createdDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  password?: string;
  fullName?: string;
  address?: string;
  phoneNumber?: string;
  gender?: Gender;
  birthday?: Moment;
  avatar?: string;
  expiredDate?: Moment;
  expiredDateStatus?: ExpiredStatus;
}

export class User implements IUser {
  constructor(
    public id?: any,
    public login?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public activated?: boolean,
    public langKey?: string,
    public authorities?: any[],
    public createdBy?: string,
    public createdDate?: Date,
    public lastModifiedBy?: string,
    public lastModifiedDate?: Date,
    public password?: string,
    public fullName?: string,
    public address?: string,
    public phoneNumber?: string,
    public gender?: Gender,
    public birthday?: Moment,
    public avatar?: string,
    public expiredDate?: Moment,
    public expiredDateStatus?: ExpiredStatus
  ) {
    this.id = id ? id : null;
    this.login = login ? login : null;
    this.firstName = firstName ? firstName : null;
    this.lastName = lastName ? lastName : null;
    this.email = email ? email : null;
    this.activated = activated ? activated : false;
    this.langKey = langKey ? langKey : null;
    this.authorities = authorities ? authorities : null;
    this.createdBy = createdBy ? createdBy : null;
    this.createdDate = createdDate ? createdDate : null;
    this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
    this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
    this.password = password ? password : null;
  }
}
