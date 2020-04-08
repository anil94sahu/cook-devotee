import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  @Output() response = new EventEmitter();
  @Input()state: any = {header: 'Reset password', body: 'Body', footer: 'Save'};
  resetPasswordForm: FormGroup;
  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.resetPasswordForm  = new FormGroup({
      email: new FormControl(''),
    });
  }

  get form() {
    return this.resetPasswordForm.controls;
  }

  onSubmit(value) {
    const auth = firebase.auth();
    if (this.resetPasswordForm.valid ) {
      auth.sendPasswordResetEmail(value.email).then(res => {
        this.toastr.warning('verification mail send to your mail ID.', 'Alert');
        this.response.emit();
      },
      error => {
        console.log(error);
        this.toastr.error(error.code, 'failure');
      }
      );
      // Password reset instructions will be sent to this email address.
    } else {
      return this.toastr.error('please fill the valid email Id', 'Alert');
    }
  }
}
