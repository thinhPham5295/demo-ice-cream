/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IcecreamTestModule } from '../../../test.module';
import { FAQComponent } from 'app/entities/faq/faq.component';
import { FAQService } from 'app/entities/faq/faq.service';
import { FAQ } from 'app/shared/model/faq.model';

describe('Component Tests', () => {
  describe('FAQ Management Component', () => {
    let comp: FAQComponent;
    let fixture: ComponentFixture<FAQComponent>;
    let service: FAQService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcecreamTestModule],
        declarations: [FAQComponent],
        providers: []
      })
        .overrideTemplate(FAQComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FAQComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FAQService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FAQ(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.fAQS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
