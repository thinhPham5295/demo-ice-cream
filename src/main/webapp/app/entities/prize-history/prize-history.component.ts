import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPrizeHistory } from 'app/shared/model/prize-history.model';
import { AccountService } from 'app/core';
import { PrizeHistoryService } from './prize-history.service';

@Component({
  selector: 'jhi-prize-history',
  templateUrl: './prize-history.component.html'
})
export class PrizeHistoryComponent implements OnInit, OnDestroy {
  prizeHistories: IPrizeHistory[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected prizeHistoryService: PrizeHistoryService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.prizeHistoryService
      .query()
      .pipe(
        filter((res: HttpResponse<IPrizeHistory[]>) => res.ok),
        map((res: HttpResponse<IPrizeHistory[]>) => res.body)
      )
      .subscribe(
        (res: IPrizeHistory[]) => {
          this.prizeHistories = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPrizeHistories();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPrizeHistory) {
    return item.id;
  }

  registerChangeInPrizeHistories() {
    this.eventSubscriber = this.eventManager.subscribe('prizeHistoryListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
