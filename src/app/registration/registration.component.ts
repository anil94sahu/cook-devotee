import { UtilityService } from './../shared/services/utility.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IStateModel, defaultState } from './../shared/models/state.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegistrationService } from '../shared/services/registration.service';
import { ICookModel } from '../shared/models/cook.model';
import { FormGroup } from '@angular/forms';
import { LoaderService } from '../shared/services/loader.service';
import { EmailPasswordCredentials } from '../shared/models/credentials.model';
import * as firebase from 'firebase';
import { AuthService } from '../shared/services/auth.service';
import { WindowService } from '../shared/services/window.service';
import { PhoneNumber } from '../shared/models/phone.model';
import { Recaptcha } from '../shared/constants/utility.constant';
import { Message } from '../shared/constants/message.constant';
import { Label } from '../shared/constants/label.constant';
import { ViewProfileService } from '../shared/services/view-profile.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  // phone verification
  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;
  Label = Label;
  Message = Message;
  cookRegistrationForm: FormGroup;
  state: IStateModel;
  constructor(private registrationService: RegistrationService,
              private loaderService: LoaderService,
              private auth: AuthService,
              private win: WindowService,
              private viewProfileService: ViewProfileService,
              private toastr: ToastrService,
              private router: Router,
              private utilityService: UtilityService
) { }

  ngOnInit() {
    this.viewProfileService.getState().subscribe(state => {
      this.state = state;
      });

    // this.getRecaptcha();
  }

  response($event) {
    const {url, cookDetail, userId}  = $event;
    const {emailId, password} = cookDetail;
    if (url === 'edit') {
      this.update(userId, cookDetail);
    } else {
      this.verifyEmail(emailId, password, cookDetail);
    }
  }

  profileImage(imageUrl) {
    this.cookRegistrationForm.controls.photo.setValue(imageUrl);
  }

  onSubmit(cook) {
    this.loaderService.show();
    this.registrationService.createCook(cook).then(
      e => {console.log(e),
        this.toastr.success(Message.success_registered, 'success');
            this.toastr.info('kindly login with your credential', 'info');
            this.router.navigateByUrl('');
      }
    ).catch(
      () => {
        this.loaderService.hide();
      }
    );
    this.loaderService.hide();
  }

  update(Id, cook) {
    this.loaderService.show();
    this.registrationService.updateCook(Id, cook);
    this.toastr.success('successfully updated', 'success');
    const {token, routePage} = this.utilityService.getLocalStorage();
    this.router.navigateByUrl(`view-profile/${routePage}/${token}`);
    this.loaderService.hide();
  }

  onReset() {
  }


  verifyEmail(email, password, cookDetail?) {
    const credentials: EmailPasswordCredentials = {email, password};
    this.signupWithEmail(credentials, cookDetail);
  }

  signupWithEmail(credentials: EmailPasswordCredentials, cookDetail?): void {
      this.auth.signUp(credentials)
      .then(() => {
        this.auth.SendVerificationMail().then(() => {
          this.toastr.warning('verification mail send to your mail ID.', 'Alert');
          this.onSubmit(cookDetail);
          }); // Sending email verification notification, when new user registers
      }).
      catch((error) => {
        this.toastr.error(error.message, 'error');
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
    this.viewProfileService.setState(defaultState);
  }

}


