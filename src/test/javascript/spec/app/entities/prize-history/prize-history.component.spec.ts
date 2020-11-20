/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { IcecreamTestModule } from '../../../test.module';
import { PrizeHistoryComponent } from 'app/entities/prize-history/prize-history.component';
import { PrizeHistoryService } from 'app/entities/prize-history/prize-history.service';
import { PrizeHistory } from 'app/shared/model/prize-history.model';

describe('Component Tests', () => {
  describe('PrizeHistory Management Component', () => {
    let comp: PrizeHistoryComponent;
    let fixture: ComponentFixture<PrizeHistoryComponent>;
    let service: PrizeHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcecreamTestModule],
        declarations: [PrizeHistoryComponent],
        providers: []
      })
        .overrideTemplate(PrizeHistoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrizeHistoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrizeHistoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PrizeHistory(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.prizeHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
