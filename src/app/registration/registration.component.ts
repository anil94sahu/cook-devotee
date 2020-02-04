import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../shared/services/registration.service';
import { ICookModel, initialCook, IWorkExperience, IAddress } from '../shared/models/cook.model';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { LoaderService } from '../shared/services/loader.service';
import { EmailPasswordCredentials } from '../shared/models/credentials.model';
import * as firebase from 'firebase';
import { AuthService } from '../shared/services/auth.service';
import { WindowService } from '../shared/services/window.service';
import { PhoneNumber } from '../shared/models/phone.model';
import { Recaptcha, MobileRegEx, SalaryRegEx, PasswordRegEx } from '../shared/constants/utility.constant';
import { Message, RegistrationMessage } from '../shared/constants/message.constant';
import { Label } from '../shared/constants/label.constant';
import { ActivatedRoute } from '@angular/router';
import { role } from '../shared/constants/local-storage.constant';
import { ViewProfileService } from '../shared/services/view-profile.service';

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
  cookRegistrationForm: FormGroup;
  cooks: any;
  workExperience: IWorkExperience[];
  RegistrationMessage = RegistrationMessage;
  isSubmit = false;
  isEdit = false;
  constructor(private registrationService: RegistrationService,
              private fb: FormBuilder,
              private loaderService: LoaderService,
              private auth: AuthService,
              private win: WindowService,
              private route: ActivatedRoute,
              private viewProfileService: ViewProfileService
) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.getCook(id);
      this.isEdit = true;
    }
    this.getCooks();
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
    name: new FormControl('', Validators.compose([Validators.required])),
    address: this.fb.group(this.initAddress()),
    password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(PasswordRegEx)])),
    mobileNo: new FormControl(1, Validators.compose([Validators.required, Validators.minLength(10),
      Validators.maxLength(10), Validators.pattern(MobileRegEx)])),
    altMobileNO: new FormControl(1),
    photo: new FormControl(''),
    married: new FormControl(''),
    specialist: new FormControl(''),
    description: new FormControl(''),
    salary: new FormControl(1, Validators.compose([Validators.required, Validators.pattern(SalaryRegEx)])),
    age: new FormControl(1),
    study: new FormControl(''),
    emailId: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    availibility: new FormControl(new Date()),
    role: new FormControl(1, Validators.compose([Validators.required])),
    workExperience: new FormArray([this.fb.group(this.initWorkExperience())])
    };
    return cookModel;
  }

  initAddress(): IAddress {
    const cookAddress: IAddress =  {
      houseNo: new FormControl('', /*  Validators.compose([Validators.required]) */),
      address1: new FormControl(''),
      landmark: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl('', /*  Validators.compose([Validators.required]) */),
      country: new FormControl('india'),
      pincode: new FormControl(1)
    };
    return cookAddress;
  }

  initWorkExperience(): IWorkExperience {
    const cookExperience =  {
      centerName: new FormControl(''/* ,Validators.compose([Validators.required]) */),
      address: new FormControl(''),
      periodOfWork: new FormControl(''/* , Validators.compose([Validators.required]) */),
      comment: new FormControl(''),
      PMName: new FormControl(''/* , Validators.compose([Validators.required]) */),
      PMMobile: new FormControl(''/* , Validators.compose([Validators.required, Validators.minLength(10),
        Validators.maxLength(10), Validators.pattern(MobileRegEx)]) */),
      PMEmailId: new FormControl(''/* , Validators.compose([Validators.required, Validators.email]) */),
      KIName: new FormControl('',  /* Validators.compose([Validators.required]) */),
      KIMobile: new FormControl('',  /* Validators.compose([Validators.required, Validators.minLength(10),
        Validators.maxLength(10), Validators.pattern(MobileRegEx)]) */),
      KIEmailId: new FormControl('', /* Validators.compose([Validators.required, Validators.email]) */),
      salary: new FormControl(''/* ,Validators.compose([Validators.required, Validators.pattern(SalaryRegEx)]) */),
      status: new FormControl('')
    };
    return cookExperience;
  }

  get form() {
    return this.cookRegistrationForm.controls;
  }

  get aform() {
    // tslint:disable-next-line: no-string-literal
    return this.cookRegistrationForm.controls.address['controls'];
  }

  get wiform() {
    // tslint:disable-next-line: no-string-literal
    return this.cookRegistrationForm.controls.workExperience['controls'];
  }

  getCooks() {
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

  getCook(id: string) {
    this.loaderService.show();
    const userrole = parseInt(localStorage.getItem(role), 10);
    this.viewProfileService.getProfileById(userrole, id)
      .subscribe(arg => {
        this.loaderService.hide();
        if (arg) {const data = arg.data(); this.setValue(data); }
        console.log(arg);
      },
      err => {
        this.loaderService.hide();
      });
  }


  profileImage(imageUrl) {
    this.cookRegistrationForm.controls.photo.setValue(imageUrl);
  }

  onSubmit(cookDetail: ICookModel) {
    this.isSubmit = true;
    const cook = cookDetail;
    console.log(cook);
    this.loaderService.show();
    if (this.cookRegistrationForm.valid) {
      this.registrationService.createCook(cook).then(
        e => {console.log(e),
          alert(Message.success_registered); }
      ).catch(
        e => console.log(e)
      );

    } else {

    }
    this.loaderService.hide();
    }

    onReset() {
      this.createForm();
      this.isSubmit = false;
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

    setValue(res) {
      this.cookRegistrationForm.setValue(res);
    }

    setCook(res): ICookModel {
      return {name: res.name,
      userId: res.userId,
      password: res.password,
      address: {
        houseNo: '100, bada gaon',
        address1: 'gate bahar narayan bagh road',
        landmark: 'natraj marriage garden',
        city: 'kolkata',
        state: 'WB',
        country: 'India',
        pincode: 1
},
      mobileNo: 8382049026,
      altMobileNO: 9621100823,
      photo: 'assets/images/about/govinda.jpg',
      married: 'single',
      specialist: 'noodles, manchurain',
      description: 'work in isckon gita life around 2 hours',
      salary: 10000,
      age: 29,
      study: 'B.sc',
      emailId: 'vidhan94@gmail.com',
      availibility: new Date(),
      role: 'cook',
      workExperience: [{
      centerName: 'Voice pune',
      address: '',
      periodOfWork: new Date(),
      comment: '',
      PMName: '',
      PMEmailId: '',
      KIEmailId: '',
      PMMobile: 8382049026,
      KIName: '',
      KIMobile: 8382049026,
      salary: 10000,
      status: 1,
      }],
    };
  }

  ngOnDestroy() {
    this.isEdit = false;
  }

}


