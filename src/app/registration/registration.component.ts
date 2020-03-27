import { UtilityService } from './../shared/services/utility.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IStateModel, defaultState } from './../shared/models/state.model';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { RegistrationService } from '../shared/services/registration.service';
import { FormGroup } from '@angular/forms';
import { LoaderService } from '../shared/services/loader.service';
import { EmailPasswordCredentials } from '../shared/models/credentials.model';
import { AuthService } from '../shared/services/auth.service';
import { WindowService } from '../shared/services/window.service';
import { Message } from '../shared/constants/message.constant';
import { ViewProfileService } from '../shared/services/view-profile.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  cookRegistrationForm: FormGroup;
  state: IStateModel;
  @Output() emitter = new EventEmitter();

  constructor(private registrationService: RegistrationService,
              private loaderService: LoaderService,
              private auth: AuthService,
              private viewProfileService: ViewProfileService,
              private toastr: ToastrService,
              private router: Router,
              private utilityService: UtilityService
) { }

  ngOnInit() {
    this.viewProfileService.getState().subscribe(state => {
      this.state = state;
      });
  }

  response($event) {
    const {url, cookDetail, userId}  = $event;
    const {emailId, password} = cookDetail;
    if (url === 'edit-cook') {
      this.update(userId, cookDetail);
    } else if (url === 'edit-devotee') {
      this.emitter.emit($event);
    } else if (url === 'cookByDevotee') {
      this.onSubmit(cookDetail);
    } else {
      this.verifyEmail(emailId, password, $event);
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

  verifyEmail(email, password, cookDetail?) {
    const credentials: EmailPasswordCredentials = {email, password};
    this.signupWithEmail(credentials, cookDetail);
  }

  signupWithEmail(credentials: EmailPasswordCredentials, $event?): void {
      this.auth.signUp(credentials)
      .then(() => {
        this.auth.SendVerificationMail().then(() => {
          this.toastr.warning('verification mail send to your mail ID.', 'Alert');
          const {url, cookDetail} = $event;
          if (url === 'cook') {
            this.onSubmit(cookDetail);
          } else if (url === 'devotee') {
            this.emitter.emit($event);
          }
          }); // Sending email verification notification, when new user registers
      }).
      catch((error) => {
        this.toastr.error(error.message, 'error');
      });
  }

  setValue(res) {
    this.cookRegistrationForm.setValue(res);
  }

  ngOnDestroy() {
    this.viewProfileService.setState(defaultState);
  }

}


