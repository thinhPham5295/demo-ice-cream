/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IcecreamTestModule } from '../../../test.module';
import { ReferenceDeleteDialogComponent } from 'app/entities/reference/reference-delete-dialog.component';
import { ReferenceService } from 'app/entities/reference/reference.service';

describe('Component Tests', () => {
  describe('Reference Management Delete Component', () => {
    let comp: ReferenceDeleteDialogComponent;
    let fixture: ComponentFixture<ReferenceDeleteDialogComponent>;
    let service: ReferenceService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcecreamTestModule],
        declarations: [ReferenceDeleteDialogComponent]
      })
        .overrideTemplate(ReferenceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ReferenceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReferenceService);
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
