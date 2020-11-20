export interface IFAQ {
  id?: number;
  question?: string;
  qnswer?: string;
}

export class FAQ implements IFAQ {
  constructor(public id?: number, public question?: string, public qnswer?: string) {}
}
