import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPrizeHistory, PrizeHistory } from 'app/shared/model/prize-history.model';
import { PrizeHistoryService } from './prize-history.service';

@Component({
  selector: 'jhi-prize-history-update',
  templateUrl: './prize-history-update.component.html'
})
export class PrizeHistoryUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    enableStatus: []
  });

  constructor(protected prizeHistoryService: PrizeHistoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ prizeHistory }) => {
      this.updateForm(prizeHistory);
    });
  }

  updateForm(prizeHistory: IPrizeHistory) {
    this.editForm.patchValue({
      id: prizeHistory.id,
      enableStatus: prizeHistory.enableStatus
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const prizeHistory = this.createFromForm();
    if (prizeHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.prizeHistoryService.update(prizeHistory));
    } else {
      this.subscribeToSaveResponse(this.prizeHistoryService.create(prizeHistory));
    }
  }

  private createFromForm(): IPrizeHistory {
    return {
      ...new PrizeHistory(),
      id: this.editForm.get(['id']).value,
      enableStatus: this.editForm.get(['enableStatus']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPrizeHistory>>) {
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
