/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IcecreamTestModule } from '../../../test.module';
import { FAQDetailComponent } from 'app/entities/faq/faq-detail.component';
import { FAQ } from 'app/shared/model/faq.model';

describe('Component Tests', () => {
  describe('FAQ Management Detail Component', () => {
    let comp: FAQDetailComponent;
    let fixture: ComponentFixture<FAQDetailComponent>;
    const route = ({ data: of({ fAQ: new FAQ(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcecreamTestModule],
        declarations: [FAQDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FAQDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FAQDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.fAQ).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
