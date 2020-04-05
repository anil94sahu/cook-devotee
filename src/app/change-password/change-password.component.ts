import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PasswordRegEx } from 'src/app/shared/constants/utility.constant';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Output() response = new EventEmitter();
  @Input()state: any = {header: 'Chnage password', body: 'Body', footer: 'Save'};
  changePasswordForm: FormGroup;
  constructor(private toastr: ToastrService, public auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.changePasswordForm  = new FormGroup({
      oldPassword: new FormControl('',  Validators.compose([Validators.required, Validators.pattern(PasswordRegEx)])),
      newPassword: new FormControl('',  Validators.compose([Validators.required, Validators.pattern(PasswordRegEx)])),
      confirmPassword: new FormControl('',  Validators.compose([Validators.required, Validators.pattern(PasswordRegEx)])),
      email: new FormControl(''),
    });
  }

  get form() {
    return this.changePasswordForm.controls;
  }

  onSubmit(changePassword) {
    if (this.changePasswordForm.valid && (changePassword.confirmPassword === changePassword.newPassword)) {
      const credential = {...this.changePasswordForm.value};
      const cpUser = firebase.auth().currentUser;
      this.auth.reauthenticateWithCredential(cpUser, credential).then(
        success => {
          this.auth.changePassword(cpUser, credential);
          this.toastr.success('Your password is updated successfully. Please login again.', 'success');
          this.auth.logout();
          this.response.emit();
        },
        error => {
          console.log(error);
          if (error.code === 'auth/wrong-password') {
          this.toastr.error(error.code, 'failure');
          }
        }
      );
    } else {
      return this.toastr.error('please fill the mandatory fields', 'Alert');
    }
  }

}
