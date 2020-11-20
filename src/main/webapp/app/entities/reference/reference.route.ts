import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Reference } from 'app/shared/model/reference.model';
import { ReferenceService } from './reference.service';
import { ReferenceComponent } from './reference.component';
import { ReferenceDetailComponent } from './reference-detail.component';
import { ReferenceUpdateComponent } from './reference-update.component';
import { ReferenceDeletePopupComponent } from './reference-delete-dialog.component';
import { IReference } from 'app/shared/model/reference.model';

@Injectable({ providedIn: 'root' })
export class ReferenceResolve implements Resolve<IReference> {
  constructor(private service: ReferenceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IReference> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Reference>) => response.ok),
        map((reference: HttpResponse<Reference>) => reference.body)
      );
    }
    return of(new Reference());
  }
}

export const referenceRoute: Routes = [
  {
    path: '',
    component: ReferenceComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'References'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReferenceDetailComponent,
    resolve: {
      reference: ReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'References'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReferenceUpdateComponent,
    resolve: {
      reference: ReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'References'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReferenceUpdateComponent,
    resolve: {
      reference: ReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'References'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const referencePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ReferenceDeletePopupComponent,
    resolve: {
      reference: ReferenceResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'References'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
