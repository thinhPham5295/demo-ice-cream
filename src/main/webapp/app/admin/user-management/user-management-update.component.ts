import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User, UserService } from 'app/core';
import { ExpiredStatus } from 'app/shared/model/enumeration/expired-status.model';

@Component({
  selector: 'jhi-user-mgmt-update',
  templateUrl: './user-management-update.component.html'
})
export class UserMgmtUpdateComponent implements OnInit {
  user: User;
  languages: any[];
  authorities: any[];
  isSaving: boolean;

  editForm = this.fb.group({
    login: [],
    email: [],
    fullName: [],
    address: [],
    phoneNumber: [],
    birthDay: [],
    gender: [],
    avatar: [],
    expiredDate: [],
    expiredDateStatus: []
  });
  expiredStatus = Object.keys(ExpiredStatus);

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.route.data.subscribe(({ user }) => {
      this.user = user.body ? user.body : user;
      this.updateForm(this.user);
    });
    this.authorities = [];
    this.userService.authorities().subscribe(authorities => {
      this.authorities = authorities;
    });
  }

  private updateForm(user: User): void {
    this.editForm.patchValue({
      id: user.id,
      login: user.login,
      email: user.email,
      activated: user.activated,
      authorities: user.authorities,
      fullName: user.fullName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      birthDay: user.birthday,
      gender: user.gender,
      avatar: user.avatar,
      expiredDate: user.expiredDate,
      expiredDateStatus: user.expiredDateStatus
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    this.updateUser(this.user);
    if (this.user.id !== null) {
      this.userService.update(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
    } else {
      this.user.langKey = 'en';
      this.userService.create(this.user).subscribe(response => this.onSaveSuccess(response), () => this.onSaveError());
    }
  }

  private updateUser(user: User): void {
    user.activated = this.editForm.get(['activated']) ? this.editForm.get(['activated']).value : user.activated;
    user.expiredDateStatus = this.editForm.get(['expiredDateStatus'])
      ? this.editForm.get(['expiredDateStatus']).value
      : user.expiredDateStatus;
  }

  private onSaveSuccess(result) {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }
}
