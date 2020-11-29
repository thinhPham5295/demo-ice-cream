import { Component, OnInit, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { DATE_PATTERN, EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE, PHONE_PATTERN } from 'app/shared';
import { LoginModalService } from 'app/core';
import { Register } from './register.service';
import * as moment from 'moment';
import { Gender } from 'app/shared/model/customer.model';
import { FileService } from 'app/shared/file/file.service';

@Component({
  selector: 'jhi-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {
  doNotMatch: string;
  error: string;
  errorEmailExists: string;
  errorUserExists: string;
  success: boolean;
  modalRef: NgbModalRef;
  phonePattern = PHONE_PATTERN;
  datePattern = DATE_PATTERN;

  registerForm = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50), Validators.pattern('^[_.@A-Za-z0-9-]*$')]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    fullName: [null],
    address: [null],
    phoneNumber: [null],
    birthDay: [null],
    gender: [null],
    avatar: [null]
  });
  today = moment();
  genders = Object.keys(Gender);
  private fileToUpload: File;
  private imageSrc: string;

  constructor(
    private loginModalService: LoginModalService,
    private registerService: Register,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private fb: FormBuilder,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.success = false;
  }

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
  }

  register() {
    if (this.registerForm.get(['password']).value !== this.registerForm.get(['confirmPassword']).value) {
      this.doNotMatch = 'ERROR';
    } else {
      this.doNotMatch = null;
      this.error = null;
      this.errorUserExists = null;
      this.errorEmailExists = null;
      let registerAccount = this.createRegisterAccount();
      this.fileService.uploadImageCommon(this.fileToUpload).subscribe(
        res => {
          if (res && res.body) {
            const imageUrl = res;
            registerAccount = { ...registerAccount, imageUrl };
            this.registerService.save(registerAccount).subscribe(
              () => {
                this.success = true;
              },
              response => this.processError(response)
            );
          }
        },
        () => {}
      );
    }
  }

  createRegisterAccount() {
    let registerAccount = {};
    const login = this.registerForm.get(['login']).value;
    const email = this.registerForm.get(['email']).value;
    const password = this.registerForm.get(['password']).value;
    const fullName = this.registerForm.get(['fullName']).value;
    const address = this.registerForm.get(['address']).value;
    const phoneNumber = this.registerForm.get(['phoneNumber']).value;
    const gender = this.registerForm.get(['gender']).value;
    registerAccount = { ...registerAccount, login, email, password, fullName, address, phoneNumber, gender };
    registerAccount = { ...registerAccount, langKey: 'en' };
    return registerAccount;
  }

  openLogin() {
    this.modalRef = this.loginModalService.open();
  }

  private processError(response: HttpErrorResponse) {
    this.success = null;
    if (response.status === 400 && response.error.type === LOGIN_ALREADY_USED_TYPE) {
      this.errorUserExists = 'ERROR';
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = 'ERROR';
    } else {
      this.error = 'ERROR';
    }
  }

  clearAllFields() {
    this.registerForm.patchValue({
      login: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      address: '',
      phoneNumber: '',
      gender: '',
      avatar: ''
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.onload = e => (this.imageSrc = reader.result.toString());
    reader.readAsDataURL(this.fileToUpload);
  }
}
