/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IcecreamTestModule } from '../../../test.module';
import { ReferenceDetailComponent } from 'app/entities/reference/reference-detail.component';
import { Reference } from 'app/shared/model/reference.model';

describe('Component Tests', () => {
  describe('Reference Management Detail Component', () => {
    let comp: ReferenceDetailComponent;
    let fixture: ComponentFixture<ReferenceDetailComponent>;
    const route = ({ data: of({ reference: new Reference(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcecreamTestModule],
        declarations: [ReferenceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ReferenceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReferenceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.reference).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
