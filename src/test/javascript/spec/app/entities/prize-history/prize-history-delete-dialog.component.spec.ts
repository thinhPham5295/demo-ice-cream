/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IcecreamTestModule } from '../../../test.module';
import { PrizeHistoryDeleteDialogComponent } from 'app/entities/prize-history/prize-history-delete-dialog.component';
import { PrizeHistoryService } from 'app/entities/prize-history/prize-history.service';

describe('Component Tests', () => {
  describe('PrizeHistory Management Delete Component', () => {
    let comp: PrizeHistoryDeleteDialogComponent;
    let fixture: ComponentFixture<PrizeHistoryDeleteDialogComponent>;
    let service: PrizeHistoryService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcecreamTestModule],
        declarations: [PrizeHistoryDeleteDialogComponent]
      })
        .overrideTemplate(PrizeHistoryDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PrizeHistoryDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PrizeHistoryService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
