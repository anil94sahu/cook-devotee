import { FirebaseService } from './../shared/services/crud.firebase.service';
import { token } from './../shared/constants/local-storage.constant';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  arr = [];
  tempList = [];
  editForm: FormGroup;
  modal: NgbModalRef;
  params = {searchString: '', name: '', emailId: '', salary: 'salary', state: 'state', centerName: '', };


  constructor(private adminService: AdminService, private utilityService: UtilityService, private modalService: NgbModal,
              private fb: FormBuilder,
              private loaderService: LoaderService,
              private fbs: FirebaseService) { }

  ngOnInit() {
    this.getCooks();
    this.build();
  }

  build() {
    this.editForm = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl(''),
      photo: new FormControl(''),
      salary: new FormControl(''),
      availibility: new FormControl('true'),
      availibilityDate: new FormControl(true),
      age: new FormControl(''),
      periodOfWork: new FormControl('')
    });
  }

  initWorkExperience() {
    const cookExperience =  {
      periodOfWork: new FormControl(''/* , Validators.compose([Validators.required]) */),
    };
    return cookExperience;
  }

  get form() {
    return this.editForm.controls;
  }
  getCooks() {
    this.adminService.getCooks().subscribe(cooks => {this.arr = this.utilityService.responsive(cooks); this.tempList = [...this.arr];
                                                     this.searchByParams(); });
  }

  delete(id) {
    confirm('Are you sure you want to delete');
    this.adminService.removeCook(id);
  }

  getDevotees() {
    this.adminService.getDevotees().subscribe(cooks => {this.arr = this.utilityService.responsive(cooks); this.tempList = [...this.arr]; });
  }

  edit(values) {
    this.editForm.patchValue({
      name: values.name,
      photo: values.photo,
      salary: values.salary,
      availibility: values.availibility,
      age: values.age,
      // tslint:disable-next-line: max-line-length
      periodOfWork: values && values.workExperience[0] && values.workExperience[0].periodOfWork ? values.workExperience[0].periodOfWork : null,
      id: values.id
    });

  }

  profileImage(imageUrl) {
    this.form.photo.setValue(imageUrl);
  }

  openScrollableContent(longContent, item) {
    this.modal = this.modalService.open(longContent, { scrollable: true });
    this.edit(item);
  }

  onSubmit(value) {
    const userId = localStorage.getItem(token);
    const body: any = {};
    let id = '';
    if (value.name) {body.name = value.name; }
    if (value.salary) {body.salary = value.salary; }
    if (value.availibility) {body.availibility = value.availibility; }
    if (value.age) {body.age = value.age; }
    if (value.photo) {body.photo = value.photo; }
    if (value.id) {id = value.id; }
    if (value.periodOfWork) {body.periodOfWork = value.periodOfWork; }
    this.loaderService.show();
    // const {body, id} =
    if (this.editForm.valid) {
      console.log(body);
      confirm('Are you sure you want to update');
      this.adminService.editCook(id, body);
      this.modal.close();
    } else {

    }
    this.loaderService.hide();
  }

  searchByParams() {
    const arr = [...this.arr];
    let tempArr = arr;
    const params = {...this.params};
    if (this.params.searchString) {
      tempArr = tempArr.filter(item => {
         return item.name.toLowerCase().includes(params.searchString.toLowerCase());
      });
    }
    this.tempList = tempArr;
  }

}
