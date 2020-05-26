import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { IStateModel } from './../shared/models/state.model';
import { profilePics } from './../shared/constants/image.constant';
import { Component, OnInit } from '@angular/core';
import { ViewProfileService } from '../shared/services/view-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../shared/services/loader.service';
import { HRManagementService } from '../shared/services/hr-management.service';
import { token, role } from '../shared/constants/local-storage.constant';
import { API } from '../shared/constants/apis.constant';
import { Role, RequestStatus, RequestStatusName } from '../shared/constants/utility.constant';
import { UtilityService } from '../shared/services/utility.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./../search-cook/search-cook.component.css', './view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  profile: any;
  defaultProfilePic = profilePics;
  requestDevoteeArr: any = [];
  RequestStatusName = RequestStatusName;
  RequestStatus = RequestStatus;
  role = parseInt(localStorage.getItem(role), 10);
  state: IStateModel;
  isAddCook = false;
  registeredCooks = [];
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private viewProfileService: ViewProfileService,
              private route: ActivatedRoute,
              private loaderService: LoaderService,
              public utilityService: UtilityService,
              private hrManagementService: HRManagementService,
              private router: Router ) {
               const  userRole =  this.utilityService.getRole();
               if (userRole === 'devotee') {this.isAddCook = true; } else {this.isAddCook = false; }
               }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.getCook(id);
    this.getRequestCook();
    this.getListOfRegisteredCook();
  }

  getCook(id: string) {
    this.loaderService.show();
    const userrole = parseInt(localStorage.getItem(role), 10);
    this.viewProfileService.getProfileById(userrole, id)
      .subscribe(arg => {
        this.loaderService.hide();
        if (arg) {this.profile = arg.data(); }
        console.log(arg);
      },
      () => {
        this.loaderService.hide();
      });
  }

  getRequestCook() {
    const devoteeId = localStorage.getItem(token);
    const userrole = parseInt(localStorage.getItem(role), 10);
    const param = (userrole === 1) ? API.CookId : API.DevoteeId;
    this.hrManagementService.getRequestCook(devoteeId, param)
    .subscribe(
      result => {
        const tempParam = (userrole === 2) ? API.CookId : API.DevoteeId;
        const id =  result.map(e =>  {
          return {id: e.payload.doc.id, cookId : e.payload.doc.data()[tempParam], status: e.payload.doc.data()[API.Status]};
        });
        console.log(id);
        const oppRole = (userrole === 2) ? Role.cook : Role.devotee;
        this.requestDevoteeArr = [];
        id.forEach(e => {
          this.viewProfileService.getProfileById(oppRole, e.cookId)
            .subscribe(arg => {
              this.loaderService.hide();
              if (arg && e.status !== 0) {this.requestDevoteeArr.push({user: arg.data(), serviceId : e.id, status: e.status}); }
              console.log(arg);
            },
            () => {
              this.loaderService.hide();
            });
          });
      }
    );

  }

  editProfile() {
    const userRole = parseInt(localStorage.getItem(role), 10);
    const id = localStorage.getItem(token);
    const url = (userRole === 1) ? 'cook' : 'devotee';
    this.setState(url);
    this.router.navigate([`edit/${url}/${id}`]);
  }

  setState(url) {
    const requiredState: IStateModel = {
      name: true,
      address: true,
      mobileNo: 'disable',
      altMobileNO: true,
      password: false,
      photo: true,
      married: true,
      specialist: true,
      description: true,
      salary: true,
      age: true,
      study: true,
      emailId: 'disable',
      availibility: false,
      role: false,
      workExperience: false,
      userId: false,
      data: {...this.profile},
      url: `edit-${url}`
    };
    this.isCookOrDevotee(url, requiredState);
    this.sendValue(requiredState);
  }

  isCookOrDevotee(key, state) {
    switch (key) {
      case 'devotee': {
        state.salary = false;
        state.address = false;
        state.altMobileNO = false;
        state.photo = true;
        state.married = false;
        state.specialist = false;
        state.availibility = false;
        state.centerName = true;
        state.PMName = true;
        break;
      }
      case 'cookByDevotee' : {
        const {emailId, password, address, centerName, name, mobileNo} = this.profile;
        const add1 = this.utilityService.reFrameAddress(address);
        state.emailId = 'disable';
        state.url = 'cookByDevotee';
        state.workExperience = true;
        state.mobileNo = true;
        state.data = {emailId, password, workExperience: [{centerName, address: add1, KIName: name, KIMobile: mobileNo}]};
        break;
      }
      default:
        break;
    }

    return state;
  }

  sendValue(value) {
    this.viewProfileService.setState(value);
    }

  hiringResponse(status, serviceId) {
    const body = {status, valid: true};
    if (status === 0) {
      this.hrManagementService.deleteHireRequest(serviceId);
     } else {
      this.hrManagementService.updateStatus(serviceId, body);
    }
  }

  registerCookByDevotee() {
    this.setState('cookByDevotee');
    this.router.navigate(['register']);
  }

  getListOfRegisteredCook() {
    const {currentUser} = this.utilityService.getLocalStorage();
    this.viewProfileService.getListOfRegisteredCook(currentUser.email)
    .subscribe(res => {
        this.registeredCooks = this.utilityService.response(res);
      });
  }
}
