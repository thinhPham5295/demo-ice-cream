import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IFAQ, FAQ } from 'app/shared/model/faq.model';
import { FAQService } from './faq.service';

@Component({
  selector: 'jhi-faq-update',
  templateUrl: './faq-update.component.html'
})
export class FAQUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    question: [],
    qnswer: []
  });

  constructor(protected fAQService: FAQService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ fAQ }) => {
      this.updateForm(fAQ);
    });
  }

  updateForm(fAQ: IFAQ) {
    this.editForm.patchValue({
      id: fAQ.id,
      question: fAQ.question,
      qnswer: fAQ.qnswer
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const fAQ = this.createFromForm();
    if (fAQ.id !== undefined) {
      this.subscribeToSaveResponse(this.fAQService.update(fAQ));
    } else {
      this.subscribeToSaveResponse(this.fAQService.create(fAQ));
    }
  }

  private createFromForm(): IFAQ {
    return {
      ...new FAQ(),
      id: this.editForm.get(['id']).value,
      question: this.editForm.get(['question']).value,
      qnswer: this.editForm.get(['qnswer']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFAQ>>) {
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
