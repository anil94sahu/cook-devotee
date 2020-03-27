import { DevoteeRegistrationService } from './../shared/services/devotee.registration.service';
import { IStateModel, defaultState } from './../shared/models/state.model';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { WindowService } from '../shared/services/window.service';
import { Recaptcha } from '../shared/constants/utility.constant';
import { RegistrationService } from '../shared/services/registration.service';
import { LoaderService } from '../shared/services/loader.service';
import { AuthService } from '../shared/services/auth.service';
import { ViewProfileService } from '../shared/services/view-profile.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilityService } from '../shared/services/utility.service';

@Component({
  selector: 'app-register-devotee',
  templateUrl: './register-devotee.component.html',
  styleUrls: ['./register-devotee.component.css', '../registration/registration.component.css', '../shared/css/global.css']
})
export class RegisterDevoteeComponent implements OnInit {

  state: IStateModel;
  isCook = false;

  constructor(
              private registrationService: DevoteeRegistrationService,
              private loaderService: LoaderService,
              private auth: AuthService,
              private viewProfileService: ViewProfileService,
              private toastr: ToastrService,
              private router: Router,
              private utilityService: UtilityService,
              private route: ActivatedRoute,
  ) {
               }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (!id) {this.setState(); }
  }

  setState() {
    const requiredState: IStateModel = {
      name: true,
      address: true,
      mobileNo: true,
      altMobileNO: false,
      password: true,
      photo: true,
      married: false,
      specialist: false,
      description: true,
      salary: false,
      age: true,
      study: true,
      emailId: true,
      availibility: false,
      role: true,
      workExperience: false,
      userId: false,
      centerName: true,
      PMName :true,
      url: 'devotee'
    };
    this.sendValue(requiredState);
  }

  sendValue(value) {
    this.viewProfileService.setState(value);
  }

  addCook() {
    this.isCook = true;
    this.sendValue(defaultState);
  }

  response($event) {
    const {url, cookDetail, userId}  = $event;
    if (url === 'devotee') {
      this.onSubmit(cookDetail);
    } else if (url === 'edit-devotee') {
      this.update(userId, cookDetail);
    }

  }

  update(Id, devotee) {
    this.loaderService.show();
    this.registrationService.updateDevotee(Id, devotee);
    this.toastr.success('successfully updated', 'success');
    const {token, routePage} = this.utilityService.getLocalStorage();
    this.router.navigateByUrl(`view-profile/${routePage}/${token}`);
    this.loaderService.hide();
  }

  onSubmit(devotee) {
    this.loaderService.show();
    this.registrationService.createDevotee(devotee).then(
      e => {console.log(e),
        this.toastr.success('devotee registered successfully', 'success');
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

}
