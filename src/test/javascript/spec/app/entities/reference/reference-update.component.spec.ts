/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { IcecreamTestModule } from '../../../test.module';
import { ReferenceUpdateComponent } from 'app/entities/reference/reference-update.component';
import { ReferenceService } from 'app/entities/reference/reference.service';
import { Reference } from 'app/shared/model/reference.model';

describe('Component Tests', () => {
  describe('Reference Management Update Component', () => {
    let comp: ReferenceUpdateComponent;
    let fixture: ComponentFixture<ReferenceUpdateComponent>;
    let service: ReferenceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcecreamTestModule],
        declarations: [ReferenceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ReferenceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ReferenceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ReferenceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Reference(123);
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
        const entity = new Reference();
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
