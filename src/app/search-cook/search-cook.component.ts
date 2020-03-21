import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SearchCookService } from '../shared/services/search-cook.service';
import { LoaderService } from '../shared/services/loader.service';
import { HRManagementService } from '../shared/services/hr-management.service';
import { initialHRData, IHRModel } from '../shared/models/hr.model';
import { token, role } from '../shared/constants/local-storage.constant';
import { RequestStatus, RequestStatusName, offline } from '../shared/constants/utility.constant';
import { UtilityService } from '../shared/services/utility.service';
import { API } from '../shared/constants/apis.constant';
import { profilePics } from '../shared/constants/image.constant';


@Component({
  selector: 'app-search-cook',
  templateUrl: './search-cook.component.html',
  styleUrls: ['./search-cook.component.css']
})
export class SearchCookComponent implements OnInit {
  cooks: any;
  role: number;
  RequestStatusName = RequestStatusName;
  profilePics = profilePics;
  offline = offline;
  params = {searchString: ''};
  constructor(private searchCookService: SearchCookService,
              private loaderService: LoaderService,
              private hrManagementService: HRManagementService,
              public utilityService: UtilityService,
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
    this.role =  parseInt(localStorage.getItem(role), 10);
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
      this.cooks = this.addStatusParams(this.cooks);
      if (this.params.searchString !== '') {this.searchByParams(); }
      },
      err => {
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
          const status = result[0].status;
          if (status === RequestStatus.requestSend) {
            cook.status = RequestStatus.requestSend;
          } else {
            cook.status = RequestStatus.hireMe;
          }

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
    // hr.devoteeId =
    if (cook.status !== RequestStatus.requestSend) {this.hrManagementService.createHireRequst(hr); }
  }

  hiringResponse(status) {

  }

  searchByParams() {
    const arr = [...this.cooks];
    const params = `/${this.params.searchString}/gi`;
    const tempArr = arr.filter(item => {
        item.name.match(params);
    });
    this.cooks = tempArr;
  }

}
