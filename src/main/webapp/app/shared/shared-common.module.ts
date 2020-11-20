import { NgModule } from '@angular/core';

import { IcecreamSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [IcecreamSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [IcecreamSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class IcecreamSharedCommonModule {}
