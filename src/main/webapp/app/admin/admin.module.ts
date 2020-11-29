import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IcecreamSharedModule } from 'app/shared';

import { adminState, UserMgmtComponent, UserMgmtUpdateComponent } from './';
import { RecipeMgmtComponent } from './recipe-management/recipe-management.component';
import { RecipeMgmtPreviewComponent } from './recipe-management/recipe-management-preview/recipe-management-preview.component';

@NgModule({
  imports: [IcecreamSharedModule, RouterModule.forChild(adminState)],
  declarations: [UserMgmtComponent, UserMgmtUpdateComponent, RecipeMgmtComponent, RecipeMgmtPreviewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IcecreamAdminModule {}
