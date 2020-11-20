export interface IFeedback {
  id?: number;
  fullName?: string;
  title?: string;
  content?: string;
}

export class Feedback implements IFeedback {
  constructor(public id?: number, public fullName?: string, public title?: string, public content?: string) {}
}
