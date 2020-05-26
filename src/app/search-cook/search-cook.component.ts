import { currentUserData } from './../shared/constants/local-storage.constant';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SearchCookService } from '../shared/services/search-cook.service';
import { LoaderService } from '../shared/services/loader.service';
import { HRManagementService } from '../shared/services/hr-management.service';
import { initialHRData, IHRModel } from '../shared/models/hr.model';
import { token } from '../shared/constants/local-storage.constant';
import { RequestStatus, RequestStatusName, offline, allState, salaries } from '../shared/constants/utility.constant';
import { UtilityService } from '../shared/services/utility.service';
import { API } from '../shared/constants/apis.constant';
import { profilePics } from '../shared/constants/image.constant';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-search-cook',
  templateUrl: './search-cook.component.html',
  styleUrls: ['./search-cook.component.css']
})
export class SearchCookComponent implements OnInit {
  cooks: any;
  role: string;
  RequestStatusName = RequestStatusName;
  profilePics = profilePics;
  offline = offline;
  params = {searchString: '', name: '', emailId: '', salary: 'salary', state: 'state', centerName: '', };
  public search = {name: ''};
  tempCookList = [];
  paramsConst = {allStates: allState, salaries};
  allStates = allState;
  public config: PerfectScrollbarConfigInterface = {};

  constructor(private searchCookService: SearchCookService,
              private loaderService: LoaderService,
              private hrManagementService: HRManagementService,
              public utilityService: UtilityService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {
                this.getContent();
                this.activatedRoute.queryParams.subscribe(params => {
                  const userId = params.id;
                  if (userId) {
                    this.params.searchString = userId;
                  } else {
                    this.params.searchString = '';
                  }
                });
              }

  ngOnInit() {
    this.getCook();
  }

  getCook() {
    this.loaderService.show();
    this.searchCookService.getCooks()
      .subscribe(arg => {
      this.loaderService.hide();
      this.cooks = arg.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        };
      }).filter((e: any) => {
        return e.role === 1;
      });
      // this.cooks = cookJson.data;
      this.cooks = this.cooks.filter(e => {if (e.availibility === 'true') {return true; }});
      this.cooks = this.addStatusParams(this.cooks);
      this.tempCookList = [...this.cooks];
      const roleValue =  this.utilityService.getRole();
      const currentUser = this.utilityService.getValue(currentUserData);
      if (roleValue === 'cook' && currentUser) {this.params.emailId = currentUser.email;
                                                this.searchByParams();
        }
      },
      () => {
        this.loaderService.hide();
      });
  }

  getContent() {
    this.loaderService.show();
    this.searchCookService.getData().then(data => {
      console.log(data);
    });
  }

  addStatusParams(cooks) {
    const devoteeId = localStorage.getItem(token);
    return cooks.map(cook => {

      this.hrManagementService.getHireRequest(cook.id, devoteeId, API.CookId, API.DevoteeId)
      .subscribe(arg => {
        this.loaderService.hide();
        const result: any = arg.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          };
        });
        if (result.length > 0) {
          result.forEach(e => {
            if (e.valid) {
              const status = e.status;
              if (status === RequestStatus.requestSend) {
                cook.status = RequestStatus.requestSend;
              }
            }
          });
        } else { cook.status = RequestStatus.hireMe; }
      },
      err => {
        this.loaderService.hide();
      });

      return cook; });
  }

  hireMe(cook) {
    const hr: IHRModel = initialHRData;
    hr.cookId = cook.id;
    hr.devoteeId = localStorage.getItem(token);
    hr.valid = true;
    // hr.devoteeId =
    if (cook.status !== RequestStatus.requestSend) {this.hrManagementService.createHireRequst(hr);
                                                    this.getCook();
                                                    this.toastr.success('please check your profile for further detail of cook', 'success');
     }
  }

  hiringResponse() {

  }

  searchByParams() {
    const arr = [...this.cooks];
    let tempArr = arr;
    const params = {...this.params};
    if (this.params.searchString) {
      tempArr = tempArr.filter(item => {
         return item.name.toLowerCase().includes(params.searchString.toLowerCase());
      });
    }

    if (this.params.state !== 'state') {
      tempArr = tempArr.filter(item => {
        const add = this.utilityService.reFrameAddress(item.address);
        return add.toLowerCase().includes(params.state.toLowerCase());
     });
    }

    if (this.params.salary !== 'salary') {
      const split = params.salary;
      if (split) {
        const value = split.split('-');
        let min = 0;
        let max = 0;
        if (value.length > 0) {
          min  = parseInt(`${value[0]}000`, 10);
          max = parseInt(`${value[1]}000`, 10);
          tempArr = arr.filter(item => {
            return item.salary >= min && item.salary <= max;
         });
        } else {
          min  = parseInt(`${value[0]}000`, 10);
          tempArr = tempArr.filter(item => {
            return item.salary >= min;
         });
        }
      }
    }

    if (this.params.emailId) {
      tempArr = tempArr.filter(item => {
        return item.emailId.toLowerCase().includes(params.emailId.toLowerCase());
     });
    }

    this.tempCookList = tempArr;
  }

}
