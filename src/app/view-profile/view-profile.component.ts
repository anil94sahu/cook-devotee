import { Component, OnInit } from '@angular/core';
import { ViewProfileService } from '../shared/services/view-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../shared/services/loader.service';
import { HRManagementService } from '../shared/services/hr-management.service';
import { token, role } from '../shared/constants/local-storage.constant';
import { IHRModel } from '../shared/models/hr.model';
import { API } from '../shared/constants/apis.constant';
import { Role, RequestStatus, RequestStatusName } from '../shared/constants/utility.constant';
import { Routing } from '../shared/constants/routing.constant';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  profile: any;
  requestDevoteeArr: any = [];
  RequestStatusName = RequestStatusName;
  RequestStatus = RequestStatus;
  role = parseInt(localStorage.getItem(role), 10);
  constructor(private viewProfileService: ViewProfileService,
              private route: ActivatedRoute,
              private loaderService: LoaderService,
              private hrManagementService: HRManagementService,
              private router: Router ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.getCook(id);
    this.getRequestCook();
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
      err => {
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
        const arr = [];
        const oppRole = (userrole === 2) ? Role.cook : Role.devotee;
        this.requestDevoteeArr = [];
        id.forEach(e => {
          this.viewProfileService.getProfileById(oppRole, e.cookId)
            .subscribe(arg => {
              this.loaderService.hide();
              if (arg) {this.requestDevoteeArr.push({user: arg.data(), serviceId : e.id, status: e.status}); }
              console.log(arg);
            },
            err => {
              this.loaderService.hide();
            });
          });
      }
    );

  }

  editProfile(profile) {
    const userRole = parseInt(localStorage.getItem(role), 10);
    const id = localStorage.getItem(token);
    const url = (userRole === 1) ? Routing.Registration  + '/' + id : Routing.RegistrationDevotee  + '/' + id ;
    this.router.navigate([url]);
  }

  hiringResponse(status, serviceId) {
    this.hrManagementService.updateStatus(serviceId, {status});
  }

  navigateToCookRegistration() {
    const id = localStorage.getItem(token);
    const url = Routing.Registration;
    this.router.navigate([url]);
  }
}
