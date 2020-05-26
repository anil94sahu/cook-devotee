import { allState } from './../../../constants/utility.constant';
import { token } from './../../../constants/local-storage.constant';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { PhoneNumber } from 'src/app/shared/models/phone.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { IWorkExperience, ICookModel, IAddress } from 'src/app/shared/models/cook.model';
import { RegistrationMessage } from 'src/app/shared/constants/message.constant';
import { RegistrationService } from 'src/app/shared/services/registration.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { WindowService } from 'src/app/shared/services/window.service';
import { ActivatedRoute } from '@angular/router';
import { ViewProfileService } from 'src/app/shared/services/view-profile.service';
import { PasswordRegEx, MobileRegEx, SalaryRegEx } from 'src/app/shared/constants/utility.constant';
import { Label } from 'src/app/shared/constants/label.constant';
import { IStateModel } from 'src/app/shared/models/state.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, OnDestroy {

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
  paramsConst = {allStates: allState};
  @Input()state: IStateModel;
  @Output() response = new EventEmitter<{cookDetail, url, userId}>();
  loading = false;

  constructor(private fb: FormBuilder,
              private loaderService: LoaderService) { }

  ngOnInit() {
    console.log(this.state);
    this.workExperience = [];
    this.createForm();
    console.log(this.cookRegistrationForm.value);
    const {url, data} = this.state;
    this.setState(url, data);
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
    mobileNo: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(10),
      Validators.maxLength(10), Validators.pattern(MobileRegEx)])),
    altMobileNO: new FormControl(null),
    photo: new FormControl(''),
    married: new FormControl(''),
    specialist: new FormControl(''),
    description: new FormControl(''),
    salary: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(SalaryRegEx)])),
    age: new FormControl(null),
    study: new FormControl(''),
    centerName: new FormControl(''),
    PMName: new FormControl(''),
    emailId: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    availibility: new FormControl('true'),
    availibilityDate: new FormControl(true),
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
      pincode: new FormControl(null)
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

  onSubmit(cookDetail: ICookModel) {
    this.isSubmit = true;
    const {url} = this.state;
    const userId = localStorage.getItem(token);
    const state = {cookDetail, url, userId};
    this.loaderService.show();
    this.loading = true;
    if (this.cookRegistrationForm.valid) {
      this.response.emit(state);
    } else {
    }
    this.loaderService.hide();
    this.loading = false;
  }

  onReset() {
    this.createForm();
    this.isSubmit = false;
  }

  setValue(res) {
    this.cookRegistrationForm.patchValue(res);
  }

  setState(url, data?) {
    switch (url) {
      case 'cook': { break; }
      case 'edit-cook': {
        if (data) {this.setValue(data); }
        break;
      }
      case 'devotee' : {
        this.cookRegistrationForm.removeControl('salary');
        this.form.role.setValue(2);
        break;
      }
      case 'edit-devotee': {
        this.cookRegistrationForm.removeControl('salary');
        this.form.role.setValue(2);
        if (data) {this.setValue(data); }
        break;
      }
      case 'cookByDevotee': {
        if (data) {this.setValue(data); }
        break;
      }
    }
  }

  profileImage(imageUrl) {
    this.form.photo.setValue(imageUrl);
  }

  ngOnDestroy() {
  }


}
