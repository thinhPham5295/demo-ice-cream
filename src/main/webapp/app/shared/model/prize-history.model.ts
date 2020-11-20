export interface IPrizeHistory {
  id?: number;
  enableStatus?: boolean;
}

export class PrizeHistory implements IPrizeHistory {
  constructor(public id?: number, public enableStatus?: boolean) {
    this.enableStatus = this.enableStatus || false;
  }
}
