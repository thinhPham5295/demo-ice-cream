import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IcecreamSharedModule } from 'app/shared';
import {
  FAQComponent,
  FAQDetailComponent,
  FAQUpdateComponent,
  FAQDeletePopupComponent,
  FAQDeleteDialogComponent,
  fAQRoute,
  fAQPopupRoute
} from './';

const ENTITY_STATES = [...fAQRoute, ...fAQPopupRoute];

@NgModule({
  imports: [IcecreamSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [FAQComponent, FAQDetailComponent, FAQUpdateComponent, FAQDeleteDialogComponent, FAQDeletePopupComponent],
  entryComponents: [FAQComponent, FAQUpdateComponent, FAQDeleteDialogComponent, FAQDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IcecreamFAQModule {}
