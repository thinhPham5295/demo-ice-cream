import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IcecreamSharedModule } from 'app/shared';
/* jhipster-needle-add-admin-module-import - JHipster will add admin modules imports here */

import { adminState, UserMgmtComponent, UserMgmtUpdateComponent } from './';

@NgModule({
  imports: [
    IcecreamSharedModule,
    /* jhipster-needle-add-admin-module - JHipster will add admin modules here */
    RouterModule.forChild(adminState)
  ],
  declarations: [UserMgmtComponent, UserMgmtUpdateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IcecreamAdminModule {}
