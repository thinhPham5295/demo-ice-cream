export interface IReference {
  id?: number;
  monthlyFee?: number;
  yearlyFee?: number;
  bookCost?: number;
}

export class Reference implements IReference {
  constructor(public id?: number, public monthlyFee?: number, public yearlyFee?: number, public bookCost?: number) {}
}
