import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OnlineOrder } from 'app/shared/model/online-order.model';
import { OnlineOrderService } from './online-order.service';
import { OnlineOrderComponent } from './online-order.component';
import { OnlineOrderDetailComponent } from './online-order-detail.component';
import { OnlineOrderUpdateComponent } from './online-order-update.component';
import { OnlineOrderDeletePopupComponent } from './online-order-delete-dialog.component';
import { IOnlineOrder } from 'app/shared/model/online-order.model';

@Injectable({ providedIn: 'root' })
export class OnlineOrderResolve implements Resolve<IOnlineOrder> {
  constructor(private service: OnlineOrderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOnlineOrder> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OnlineOrder>) => response.ok),
        map((onlineOrder: HttpResponse<OnlineOrder>) => onlineOrder.body)
      );
    }
    return of(new OnlineOrder());
  }
}

export const onlineOrderRoute: Routes = [
  {
    path: '',
    component: OnlineOrderComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'OnlineOrders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OnlineOrderDetailComponent,
    resolve: {
      onlineOrder: OnlineOrderResolve
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'OnlineOrders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OnlineOrderUpdateComponent,
    resolve: {
      onlineOrder: OnlineOrderResolve
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'OnlineOrders'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OnlineOrderUpdateComponent,
    resolve: {
      onlineOrder: OnlineOrderResolve
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'OnlineOrders'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const onlineOrderPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OnlineOrderDeletePopupComponent,
    resolve: {
      onlineOrder: OnlineOrderResolve
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'OnlineOrders'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
