import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IcecreamSharedModule } from 'app/shared';
import {
  ReferenceComponent,
  ReferenceDetailComponent,
  ReferenceUpdateComponent,
  ReferenceDeletePopupComponent,
  ReferenceDeleteDialogComponent,
  referenceRoute,
  referencePopupRoute
} from './';

const ENTITY_STATES = [...referenceRoute, ...referencePopupRoute];

@NgModule({
  imports: [IcecreamSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReferenceComponent,
    ReferenceDetailComponent,
    ReferenceUpdateComponent,
    ReferenceDeleteDialogComponent,
    ReferenceDeletePopupComponent
  ],
  entryComponents: [ReferenceComponent, ReferenceUpdateComponent, ReferenceDeleteDialogComponent, ReferenceDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IcecreamReferenceModule {}
