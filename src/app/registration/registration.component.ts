import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../shared/services/registration.service';
import { ICookModel, initialCook, IWorkExperience, IAddress } from '../shared/models/cook.model';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { LoaderService } from '../shared/services/loader.service';
import { EmailPasswordCredentials } from '../shared/models/credentials.model';
import * as firebase from 'firebase';
import { AuthService } from '../shared/services/auth.service';
import { WindowService } from '../shared/services/window.service';
import { PhoneNumber } from '../shared/models/phone.model';
import { Recaptcha } from '../shared/constants/utility.constant';
import { Message } from '../shared/constants/message.constant';
import { Label } from '../shared/constants/label.constant';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // phone verification
  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;
  Label = Label;
  Message = Message;

  cooks: any;
  workExperience: IWorkExperience[];
  constructor(private registrationService: RegistrationService,
              private fb: FormBuilder,
              private loaderService: LoaderService,
              private auth: AuthService,
              private win: WindowService) { }

  cookRegistrationForm: FormGroup;
  ngOnInit() {
    this.getCook();
    this.workExperience = [];
    this.createForm();
    console.log(this.cookRegistrationForm.value);
    this.getRecaptcha();
  }

  createForm() {
    this.cookRegistrationForm  = this.fb.group(this.initForm());
  }

  initForm(): ICookModel {
    const cookModel: ICookModel = {
    userId: new FormControl(''),
    name: new FormControl(''),
    address: this.fb.group(this.initAddress()),
    password: new FormControl(''),
    mobileNo: new FormControl(1),
    altMobileNO: new FormControl(1),
    photo: new FormControl(''),
    married: new FormControl(''),
    specialist: new FormControl(''),
    description: new FormControl(''),
    salary: new FormControl(1),
    age: new FormControl(1),
    study: new FormControl(''),
    emailId: new FormControl(''),
    availibility: new FormControl(new Date()),
    role: new FormControl(1),
    workExperience: new FormArray([this.fb.group(this.initWorkExperience())])
    };
    return cookModel;
  }

  initAddress(): IAddress {
    const cookAddress: IAddress =  {
      houseNo: new FormControl(''),
      address1: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pincode: new FormControl(1)
    };
    return cookAddress;
  }

  initWorkExperience(): IWorkExperience {
    const cookExperience =  {
      centerName: new FormControl(''),
      address: new FormControl(''),
      periodOfWork: new FormControl(''),
      comment: new FormControl(''),
      PMName: new FormControl(''),
      PMMobile: new FormControl(''),
      KIName: new FormControl(''),
      KIMobile: new FormControl(''),
      salary: new FormControl(''),
      status: new FormControl('')
    };
    return cookExperience;
  }

  getCook() {
    this.loaderService.show();
    this.registrationService.getCooks()
      .subscribe(arg => {
        this.loaderService.hide();
        this.cooks = arg.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      });
        console.log(this.cooks);
      },
      err => {
        this.loaderService.hide();

      });
  }

  onSubmit(cookDetail: ICookModel) {
    const cook = cookDetail;
    console.log(cook);
    this.loaderService.show();
    this.registrationService.createCook(cook);
    alert(Message.success_registered);
    this.loaderService.hide();
    }

    verifyEmail() {
      const email  = this.cookRegistrationForm.controls.emailId.value;
      const password = this.cookRegistrationForm.controls.password.value;
      const credentials: EmailPasswordCredentials = {email, password};
      this.signupWithEmail(credentials);
    }

    signupWithEmail(credentials: EmailPasswordCredentials): void {
        this.auth.signUp(credentials)
        .then((result) => {
         this.auth.SendVerificationMail(); // Sending email verification notification, when new user registers
       }).
       catch((error) => {
         window.alert(error.message);
       });
      }

    sendLoginCode() {
        const appVerifier = this.windowRef.recaptchaVerifier;
        // const num = this.phoneNumber.e164;
        const mob = this.cookRegistrationForm.controls.mobileNo.value;
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

    getRecaptcha() {
      this.windowRef = this.win.windowRef;
      this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(Recaptcha);
      this.windowRef.recaptchaVerifier.render();
    }
  }


