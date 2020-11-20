import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IOnlineOrder } from 'app/shared/model/online-order.model';
import { AccountService } from 'app/core';
import { OnlineOrderService } from './online-order.service';

@Component({
  selector: 'jhi-online-order',
  templateUrl: './online-order.component.html'
})
export class OnlineOrderComponent implements OnInit, OnDestroy {
  onlineOrders: IOnlineOrder[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected onlineOrderService: OnlineOrderService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.onlineOrderService
      .query()
      .pipe(
        filter((res: HttpResponse<IOnlineOrder[]>) => res.ok),
        map((res: HttpResponse<IOnlineOrder[]>) => res.body)
      )
      .subscribe(
        (res: IOnlineOrder[]) => {
          this.onlineOrders = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOnlineOrders();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOnlineOrder) {
    return item.id;
  }

  registerChangeInOnlineOrders() {
    this.eventSubscriber = this.eventManager.subscribe('onlineOrderListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
