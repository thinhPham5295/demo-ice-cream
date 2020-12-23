import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IcecreamSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  imports: [IcecreamSharedCommonModule, CarouselModule.forRoot()],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [IcecreamSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, CarouselModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IcecreamSharedModule {
  static forRoot() {
    return {
      ngModule: IcecreamSharedModule
    };
  }
}
