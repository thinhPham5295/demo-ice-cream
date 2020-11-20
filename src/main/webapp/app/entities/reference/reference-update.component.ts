import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IReference, Reference } from 'app/shared/model/reference.model';
import { ReferenceService } from './reference.service';

@Component({
  selector: 'jhi-reference-update',
  templateUrl: './reference-update.component.html'
})
export class ReferenceUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    monthlyFee: [],
    yearlyFee: [],
    bookCost: []
  });

  constructor(protected referenceService: ReferenceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reference }) => {
      this.updateForm(reference);
    });
  }

  updateForm(reference: IReference) {
    this.editForm.patchValue({
      id: reference.id,
      monthlyFee: reference.monthlyFee,
      yearlyFee: reference.yearlyFee,
      bookCost: reference.bookCost
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const reference = this.createFromForm();
    if (reference.id !== undefined) {
      this.subscribeToSaveResponse(this.referenceService.update(reference));
    } else {
      this.subscribeToSaveResponse(this.referenceService.create(reference));
    }
  }

  private createFromForm(): IReference {
    return {
      ...new Reference(),
      id: this.editForm.get(['id']).value,
      monthlyFee: this.editForm.get(['monthlyFee']).value,
      yearlyFee: this.editForm.get(['yearlyFee']).value,
      bookCost: this.editForm.get(['bookCost']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReference>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
