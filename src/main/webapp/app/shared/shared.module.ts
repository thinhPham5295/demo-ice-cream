import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IcecreamSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [IcecreamSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [IcecreamSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IcecreamSharedModule {
  static forRoot() {
    return {
      ngModule: IcecreamSharedModule
    };
  }
}
