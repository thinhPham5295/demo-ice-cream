/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IcecreamTestModule } from '../../../test.module';
import { PrizeHistoryDetailComponent } from 'app/entities/prize-history/prize-history-detail.component';
import { PrizeHistory } from 'app/shared/model/prize-history.model';

describe('Component Tests', () => {
  describe('PrizeHistory Management Detail Component', () => {
    let comp: PrizeHistoryDetailComponent;
    let fixture: ComponentFixture<PrizeHistoryDetailComponent>;
    const route = ({ data: of({ prizeHistory: new PrizeHistory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcecreamTestModule],
        declarations: [PrizeHistoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PrizeHistoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PrizeHistoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.prizeHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
