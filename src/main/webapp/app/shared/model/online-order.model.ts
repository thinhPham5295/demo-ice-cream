import { Moment } from 'moment';

export interface IOnlineOrder {
  id?: number;
  name?: string;
  email?: string;
  contact?: string;
  address?: string;
  bookCost?: number;
  payingOption?: string;
  orderDate?: Moment;
  status?: boolean;
}

export class OnlineOrder implements IOnlineOrder {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public contact?: string,
    public address?: string,
    public bookCost?: number,
    public payingOption?: string,
    public orderDate?: Moment,
    public status?: boolean
  ) {
    this.status = this.status || false;
  }
}
