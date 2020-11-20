import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IcecreamSharedModule } from 'app/shared';
import {
  PrizeHistoryComponent,
  PrizeHistoryDetailComponent,
  PrizeHistoryUpdateComponent,
  PrizeHistoryDeletePopupComponent,
  PrizeHistoryDeleteDialogComponent,
  prizeHistoryRoute,
  prizeHistoryPopupRoute
} from './';

const ENTITY_STATES = [...prizeHistoryRoute, ...prizeHistoryPopupRoute];

@NgModule({
  imports: [IcecreamSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PrizeHistoryComponent,
    PrizeHistoryDetailComponent,
    PrizeHistoryUpdateComponent,
    PrizeHistoryDeleteDialogComponent,
    PrizeHistoryDeletePopupComponent
  ],
  entryComponents: [
    PrizeHistoryComponent,
    PrizeHistoryUpdateComponent,
    PrizeHistoryDeleteDialogComponent,
    PrizeHistoryDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IcecreamPrizeHistoryModule {}
