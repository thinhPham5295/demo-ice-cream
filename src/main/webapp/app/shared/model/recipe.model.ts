import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';

export interface IRecipe {
  id?: number;
  name?: string;
  image?: string;
  imageData?: string;
  description?: string;
  details?: string;
  author?: string;
  viewNumber?: number;
  uploadDate?: Moment;
  enableStatus?: boolean;
  customer?: ICustomer;
}

export class Recipe implements IRecipe {
  constructor(
    public id?: number,
    public name?: string,
    public image?: string,
    public imageData?: string,
    public description?: string,
    public details?: string,
    public author?: string,
    public viewNumber?: number,
    public uploadDate?: Moment,
    public enableStatus?: boolean,
    public customer?: ICustomer
  ) {
    this.enableStatus = this.enableStatus || false;
  }
}
