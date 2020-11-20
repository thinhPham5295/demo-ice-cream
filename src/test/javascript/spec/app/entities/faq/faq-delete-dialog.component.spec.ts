/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IcecreamTestModule } from '../../../test.module';
import { FAQDeleteDialogComponent } from 'app/entities/faq/faq-delete-dialog.component';
import { FAQService } from 'app/entities/faq/faq.service';

describe('Component Tests', () => {
  describe('FAQ Management Delete Component', () => {
    let comp: FAQDeleteDialogComponent;
    let fixture: ComponentFixture<FAQDeleteDialogComponent>;
    let service: FAQService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcecreamTestModule],
        declarations: [FAQDeleteDialogComponent]
      })
        .overrideTemplate(FAQDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FAQDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FAQService);
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
