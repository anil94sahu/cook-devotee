import { ToastrService } from 'ngx-toastr';
import { Recaptcha } from './../../../constants/utility.constant';
import { WindowService } from './../../../services/window.service';
import { IStateModel } from './../../../models/state.model';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output, OnDestroy, AfterContentInit } from '@angular/core';
import { RegistrationMessage } from 'src/app/shared/constants/message.constant';
import { Label } from 'src/app/shared/constants/label.constant';
import * as firebase from 'firebase';



@Component({
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.component.html',
  styleUrls: ['./mobile-verification.component.css']
})
export class MobileVerificationComponent implements OnInit, OnDestroy, AfterContentInit {

  @Input()mobileForm: FormGroup;
  @Input()state: IStateModel;
  @Output() response = new EventEmitter<{mobileNo, verified}>();
  RegistrationMessage = RegistrationMessage;
  Label = Label;
  verificationCode: string;
  verifyButton = false;
  windowRef: any;
  loading = false;
  verifyLoading = false;

  constructor(private win: WindowService, private toastr: ToastrService) { }

  ngOnInit() {
    const mobileNo = (this.state && this.state.data && this.state.data.mobileNo) ? this.state.data.mobileNo : '';
  }

  ngAfterContentInit() {
    this.getRecaptcha();
  }

  setValue(res) {
    this.form.mobileNo.setValue(res);
  }

  get form() {
    return this.mobileForm.controls;
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    // const num = this.phoneNumber.e164;
    const mob = this.form.mobileNo.value;
    const num = '+91' + mob;
    if (this.form.mobileNo.invalid) {
     return this.toastr.warning('please enter valid mobile number', 'info');
    }
    this.loading = true;
    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.loading = false;
        this.windowRef.confirmationResult = result;
        this.toastr.success('OTP sent successfully', 'success');
      })
      .catch(error => {
        this.loading = false;
        this.toastr.error('Incorrect code entered?', 'error');
      });
  }

  verifyLoginCode() {
    this.verifyLoading = true;
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        this.verifyLoading = false;
        this.toastr.success('verified successfully', 'success');
        this.windowRef.confirmationResult = undefined;
        this.verificationCode = undefined;
      })
      .catch(error => {
        this.verifyLoading = false;
        this.toastr.error('Incorrect code entered?', 'error');
        }
      );
  }

  getRecaptcha() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(Recaptcha);
    this.windowRef.recaptchaVerifier.render();
    this.verifyButton = true;
  }

  ngOnDestroy() {
    this.verifyButton = false;
  }

}
