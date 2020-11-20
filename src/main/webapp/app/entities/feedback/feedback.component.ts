import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFeedback } from 'app/shared/model/feedback.model';
import { AccountService } from 'app/core';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'jhi-feedback',
  templateUrl: './feedback.component.html'
})
export class FeedbackComponent implements OnInit, OnDestroy {
  feedbacks: IFeedback[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected feedbackService: FeedbackService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.feedbackService
      .query()
      .pipe(
        filter((res: HttpResponse<IFeedback[]>) => res.ok),
        map((res: HttpResponse<IFeedback[]>) => res.body)
      )
      .subscribe(
        (res: IFeedback[]) => {
          this.feedbacks = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFeedbacks();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFeedback) {
    return item.id;
  }

  registerChangeInFeedbacks() {
    this.eventSubscriber = this.eventManager.subscribe('feedbackListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
