import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PrizeHistory } from 'app/shared/model/prize-history.model';
import { PrizeHistoryService } from './prize-history.service';
import { PrizeHistoryComponent } from './prize-history.component';
import { PrizeHistoryDetailComponent } from './prize-history-detail.component';
import { PrizeHistoryUpdateComponent } from './prize-history-update.component';
import { PrizeHistoryDeletePopupComponent } from './prize-history-delete-dialog.component';
import { IPrizeHistory } from 'app/shared/model/prize-history.model';

@Injectable({ providedIn: 'root' })
export class PrizeHistoryResolve implements Resolve<IPrizeHistory> {
  constructor(private service: PrizeHistoryService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPrizeHistory> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PrizeHistory>) => response.ok),
        map((prizeHistory: HttpResponse<PrizeHistory>) => prizeHistory.body)
      );
    }
    return of(new PrizeHistory());
  }
}

export const prizeHistoryRoute: Routes = [
  {
    path: '',
    component: PrizeHistoryComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PrizeHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PrizeHistoryDetailComponent,
    resolve: {
      prizeHistory: PrizeHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PrizeHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PrizeHistoryUpdateComponent,
    resolve: {
      prizeHistory: PrizeHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PrizeHistories'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PrizeHistoryUpdateComponent,
    resolve: {
      prizeHistory: PrizeHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PrizeHistories'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const prizeHistoryPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PrizeHistoryDeletePopupComponent,
    resolve: {
      prizeHistory: PrizeHistoryResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PrizeHistories'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
