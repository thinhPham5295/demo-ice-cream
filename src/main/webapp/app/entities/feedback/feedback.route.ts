import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Feedback } from 'app/shared/model/feedback.model';
import { FeedbackService } from './feedback.service';
import { FeedbackComponent } from './feedback.component';
import { FeedbackDetailComponent } from './feedback-detail.component';
import { FeedbackUpdateComponent } from './feedback-update.component';
import { FeedbackDeletePopupComponent } from './feedback-delete-dialog.component';
import { IFeedback } from 'app/shared/model/feedback.model';

@Injectable({ providedIn: 'root' })
export class FeedbackResolve implements Resolve<IFeedback> {
  constructor(private service: FeedbackService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFeedback> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Feedback>) => response.ok),
        map((feedback: HttpResponse<Feedback>) => feedback.body)
      );
    }
    return of(new Feedback());
  }
}

export const feedbackRoute: Routes = [
  {
    path: '',
    component: FeedbackComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Feedbacks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FeedbackDetailComponent,
    resolve: {
      feedback: FeedbackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Feedbacks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FeedbackUpdateComponent,
    resolve: {
      feedback: FeedbackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Feedbacks'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FeedbackUpdateComponent,
    resolve: {
      feedback: FeedbackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Feedbacks'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const feedbackPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: FeedbackDeletePopupComponent,
    resolve: {
      feedback: FeedbackResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Feedbacks'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
