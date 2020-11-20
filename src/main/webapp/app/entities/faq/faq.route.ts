import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FAQ } from 'app/shared/model/faq.model';
import { FAQService } from './faq.service';
import { FAQComponent } from './faq.component';
import { FAQDetailComponent } from './faq-detail.component';
import { FAQUpdateComponent } from './faq-update.component';
import { FAQDeletePopupComponent } from './faq-delete-dialog.component';
import { IFAQ } from 'app/shared/model/faq.model';

@Injectable({ providedIn: 'root' })
export class FAQResolve implements Resolve<IFAQ> {
  constructor(private service: FAQService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFAQ> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<FAQ>) => response.ok),
        map((fAQ: HttpResponse<FAQ>) => fAQ.body)
      );
    }
    return of(new FAQ());
  }
}

export const fAQRoute: Routes = [
  {
    path: '',
    component: FAQComponent,
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'FAQS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FAQDetailComponent,
    resolve: {
      fAQ: FAQResolve
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'FAQS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FAQUpdateComponent,
    resolve: {
      fAQ: FAQResolve
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'FAQS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FAQUpdateComponent,
    resolve: {
      fAQ: FAQResolve
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'FAQS'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const fAQPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FAQDeletePopupComponent,
    resolve: {
      fAQ: FAQResolve
    },
    data: {
      authorities: ['ROLE_CUSTOMER'],
      pageTitle: 'FAQS'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
