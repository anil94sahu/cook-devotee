import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { IDevoteeModel } from '../shared/models/devotee.model';
import { IAddress } from '../shared/models/cook.model';
import { DevoteeRegistrationService } from '../shared/services/devotee.registration.service';
import { LoaderService } from '../shared/services/loader.service';
import { AuthService } from '../shared/services/auth.service';
import * as firebase from 'firebase';
import { EmailPasswordCredentials } from '../shared/models/credentials.model';
import { WindowService } from '../shared/services/window.service';
import { PhoneNumber } from '../shared/models/phone.model';
import { Recaptcha, PasswordRegEx, MobileRegEx } from '../shared/constants/utility.constant';
import { Message, RegistrationMessage } from '../shared/constants/message.constant';

@Component({
  selector: 'app-register-devotee',
  templateUrl: './register-devotee.component.html',
  styleUrls: ['./register-devotee.component.css','../registration/registration.component.css', '../shared/css/global.css']
})
export class RegisterDevoteeComponent implements OnInit {
  // phone verification
  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;
  devoteeRegistrationForm: FormGroup;
  devotees: any;
  RegistrationMessage = RegistrationMessage;
  isSubmit = false;
  constructor(private fb: FormBuilder,
              private devoteeRegistrationService: DevoteeRegistrationService,
              private loaderService: LoaderService, private auth: AuthService,
              private win: WindowService, private toastr: ToastrService) {
               }

  ngOnInit() {
    this.getDevotee();
    this.createForm();
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(Recaptcha);
    this.windowRef.recaptchaVerifier.render();
  }

 /*  ngAfterContentInit() {
    this.recapctcha();
  } */

  createForm() {
    this.devoteeRegistrationForm  = this.fb.group(this.initForm());
    console.log(this.devoteeRegistrationForm.value);
  }

  initForm(): IDevoteeModel {
    const devoteeModel: IDevoteeModel = {
    name: new FormControl('', Validators.compose([Validators.required])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(PasswordRegEx)])),
    mobileNo: new FormControl(1, Validators.compose([Validators.required, Validators.minLength(10),
      Validators.maxLength(10), Validators.pattern(MobileRegEx)])),
    centerName: new FormControl(''),
    PMName: new FormControl(''),
    role: new FormControl(2),
    emailId: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    description: new FormControl(''),
    address: this.fb.group(this.initAddress()),
    photo: new FormControl('') 
    };
    return devoteeModel;
  }

  initAddress(): IAddress {
    const devoteeAddress: IAddress =  {
      houseNo: new FormControl(''),
      address1: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pincode: new FormControl(1)
    };
    return devoteeAddress;
  }

  getDevotee() {
    this.loaderService.show();
    this.devoteeRegistrationService.getDevotees()
      .subscribe(arg => {
        this.loaderService.hide();
        this.devotees = arg.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
        console.log(this.devotees);
      },
      () => this.loaderService.hide());
  }

  get form() {
    return this.devoteeRegistrationForm.controls;
  }

  profileImage(imageUrl) {
    this.devoteeRegistrationForm.controls.photo.setValue(imageUrl);
  }

  onSubmit(devoteeDetail: IDevoteeModel) {
    this.isSubmit = true;
    const devotee = devoteeDetail;
    console.log(devotee);
    if (this.devoteeRegistrationForm.valid) {
      this.loaderService.show();
      this.devoteeRegistrationService.createDevotee(devotee)
      .then(
        () => {
              this.toastr.success(Message.success_registered, 'success');
          }
      ).catch(
        e => this.toastr.error(e, 'error')
      );

    } else {}
    this.loaderService.hide();
    }

  onReset() {
      this.createForm();
      this.isSubmit = false;
    }

  verifyEmail() {
    const email  = this.devoteeRegistrationForm.controls.emailId.value;
    const password = this.devoteeRegistrationForm.controls.password.value;
    const credentials: EmailPasswordCredentials = {email, password};
    this.signupWithEmail(credentials);
  }

  signupWithEmail(credentials: EmailPasswordCredentials): void {
      this.auth.signUp(credentials)
      .then(() => {
       this.auth.SendVerificationMail().then(() => {
        this.toastr.warning('verification mail send to your mail ID.', 'Alert');
        }); // Sending email verification notification, when new user registers
     }).
     catch((error) => {
      this.toastr.error(error.message, 'error');
     });
    }

  sendLoginCode() {
      const appVerifier = this.windowRef.recaptchaVerifier;
      // const num = this.phoneNumber.e164;
      const mob = this.devoteeRegistrationForm.controls.mobileNo.value;
      const num = '+91' + mob;
      firebase.auth().signInWithPhoneNumber(num, appVerifier)
        .then(result => {
          this.windowRef.confirmationResult = result;
        })
        .catch(error => console.log(error));
    }

  verifyLoginCode() {
      this.windowRef.confirmationResult
        .confirm(this.verificationCode)
        .then(result => {
          this.user = result.user;
        })
        .catch(error => console.log(error, 'Incorrect code entered?'));
    }


}
