import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { ICustomer, Customer } from 'app/shared/model/customer.model';
import { CustomerService } from './customer.service';

@Component({
  selector: 'jhi-customer-update',
  templateUrl: './customer-update.component.html'
})
export class CustomerUpdateComponent implements OnInit {
  isSaving: boolean;
  birthdayDp: any;
  expiredDateDp: any;

  editForm = this.fb.group({
    id: [],
    fullName: [],
    address: [],
    phoneNumber: [],
    email: [],
    gender: [],
    birthday: [],
    avatar: [],
    expiredDate: [],
    enableStatus: []
  });

  constructor(protected customerService: CustomerService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ customer }) => {
      this.updateForm(customer);
    });
  }

  updateForm(customer: ICustomer) {
    this.editForm.patchValue({
      id: customer.id,
      fullName: customer.fullName,
      address: customer.address,
      phoneNumber: customer.phoneNumber,
      email: customer.email,
      gender: customer.gender,
      birthday: customer.birthday,
      avatar: customer.avatar,
      expiredDate: customer.expiredDate,
      enableStatus: customer.enableStatus
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const customer = this.createFromForm();
    if (customer.id !== undefined) {
      this.subscribeToSaveResponse(this.customerService.update(customer));
    } else {
      this.subscribeToSaveResponse(this.customerService.create(customer));
    }
  }

  private createFromForm(): ICustomer {
    return {
      ...new Customer(),
      id: this.editForm.get(['id']).value,
      fullName: this.editForm.get(['fullName']).value,
      address: this.editForm.get(['address']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      email: this.editForm.get(['email']).value,
      gender: this.editForm.get(['gender']).value,
      birthday: this.editForm.get(['birthday']).value,
      avatar: this.editForm.get(['avatar']).value,
      expiredDate: this.editForm.get(['expiredDate']).value,
      enableStatus: this.editForm.get(['enableStatus']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICustomer>>) {
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
