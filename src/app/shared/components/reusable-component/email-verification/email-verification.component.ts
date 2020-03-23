import { IStateModel } from 'src/app/shared/models/state.model';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EmailPasswordCredentials } from './../../../models/credentials.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RegistrationMessage } from 'src/app/shared/constants/message.constant';
import { Label } from 'src/app/shared/constants/label.constant';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  @Input()emailForm: FormGroup;
  @Input()state: IStateModel;
  @Output() response = new EventEmitter<{email, verified}>();
  RegistrationMessage = RegistrationMessage;
  Label = Label;

  constructor(private auth: AuthService, private toastr: ToastrService) { }

  ngOnInit() {

    const emailId = (this.state && this.state.data && this.state.data.emailId) ? this.state.data.emailId : '';
    // const emailId = data.email;
    this.setValue(emailId);
  }

  setValue(res) {
    this.form.emailId.setValue(res);
  }

  get form() {
    return this.emailForm.controls;
  }

  verifyEmail() {
    const email  = this.form.emailId.value;
    const password = this.form.password.value;
    const credentials: EmailPasswordCredentials = {email, password};
    this.signupWithEmail(credentials);
  }

  signupWithEmail(credentials: EmailPasswordCredentials): void {
      this.auth.signUp(credentials)
      .then(() => {
        this.auth.SendVerificationMail().then(() => {
          this.toastr.warning('verification mail send to your mail ID.', 'Alert');
          const email = this.form.email.value;
          const verified = true;
          this.response.emit({email, verified});
          }); // Sending email verification notification, when new user registers
      }).
      catch((error) => {
        this.toastr.error(error.message, 'error');
      });
  }

}
