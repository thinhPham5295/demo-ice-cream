/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { IcecreamTestModule } from '../../../test.module';
import { PrizeHistoryUpdateComponent } from 'app/entities/prize-history/prize-history-update.component';
import { PrizeHistoryService } from 'app/entities/prize-history/prize-history.service';
import { PrizeHistory } from 'app/shared/model/prize-history.model';

describe('Component Tests', () => {
  describe('PrizeHistory Management Update Component', () => {
    let comp: PrizeHistoryUpdateComponent;
    let fixture: ComponentFixture<PrizeHistoryUpdateComponent>;
    let service: PrizeHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcecreamTestModule],
        declarations: [PrizeHistoryUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PrizeHistoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PrizeHistoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrizeHistoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PrizeHistory(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new PrizeHistory();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
