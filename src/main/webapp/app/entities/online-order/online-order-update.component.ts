import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IOnlineOrder, OnlineOrder } from 'app/shared/model/online-order.model';
import { OnlineOrderService } from './online-order.service';

@Component({
  selector: 'jhi-online-order-update',
  templateUrl: './online-order-update.component.html'
})
export class OnlineOrderUpdateComponent implements OnInit {
  isSaving: boolean;
  orderDateDp: any;

  editForm = this.fb.group({
    id: [],
    name: [],
    email: [],
    contact: [],
    address: [],
    bookCost: [],
    payingOption: [],
    orderDate: [],
    status: []
  });

  constructor(protected onlineOrderService: OnlineOrderService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ onlineOrder }) => {
      this.updateForm(onlineOrder);
    });
  }

  updateForm(onlineOrder: IOnlineOrder) {
    this.editForm.patchValue({
      id: onlineOrder.id,
      name: onlineOrder.name,
      email: onlineOrder.email,
      contact: onlineOrder.contact,
      address: onlineOrder.address,
      bookCost: onlineOrder.bookCost,
      payingOption: onlineOrder.payingOption,
      orderDate: onlineOrder.orderDate,
      status: onlineOrder.status
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const onlineOrder = this.createFromForm();
    if (onlineOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.onlineOrderService.update(onlineOrder));
    } else {
      this.subscribeToSaveResponse(this.onlineOrderService.create(onlineOrder));
    }
  }

  private createFromForm(): IOnlineOrder {
    return {
      ...new OnlineOrder(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      email: this.editForm.get(['email']).value,
      contact: this.editForm.get(['contact']).value,
      address: this.editForm.get(['address']).value,
      bookCost: this.editForm.get(['bookCost']).value,
      payingOption: this.editForm.get(['payingOption']).value,
      orderDate: this.editForm.get(['orderDate']).value,
      status: this.editForm.get(['status']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOnlineOrder>>) {
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
