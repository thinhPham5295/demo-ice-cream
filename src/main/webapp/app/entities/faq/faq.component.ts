import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFAQ } from 'app/shared/model/faq.model';
import { AccountService } from 'app/core';
import { FAQService } from './faq.service';

@Component({
  selector: 'jhi-faq',
  templateUrl: './faq.component.html'
})
export class FAQComponent implements OnInit, OnDestroy {
  fAQS: IFAQ[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected fAQService: FAQService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.fAQService
      .query()
      .pipe(
        filter((res: HttpResponse<IFAQ[]>) => res.ok),
        map((res: HttpResponse<IFAQ[]>) => res.body)
      )
      .subscribe(
        (res: IFAQ[]) => {
          this.fAQS = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFAQS();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFAQ) {
    return item.id;
  }

  registerChangeInFAQS() {
    this.eventSubscriber = this.eventManager.subscribe('fAQListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
