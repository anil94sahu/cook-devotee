import { ModalPopUpComponent } from './../shared/components/reusable-component/modal-pop-up/modal-pop-up.component';
import { UtilityService } from './../shared/services/utility.service';
import { currentUserData } from './../shared/constants/local-storage.constant';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ILoginModel } from '../shared/models/login.model';
import { UserRegEx, PasswordRegEx, RoleRegEx } from '../shared/constants/utility.constant';
import { LoginService } from '../shared/services/login.service';
import { Router } from '@angular/router';
import { Routing } from '../shared/constants/routing.constant';
import { LoaderService } from '../shared/services/loader.service';
import { AuthService } from '../shared/services/auth.service';
import { EmailPasswordCredentials } from '../shared/models/credentials.model';
import { token, userId, role } from '../shared/constants/local-storage.constant';
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginModal', {static: false}) loginModal: ElementRef;
  @ViewChild('content', {static: false}) content: ElementRef;
  loginForm: FormGroup;
  chooseCookModal: NgbModalRef;
  loginModalPopup: NgbModalRef;
  cookUsers = [];
  selectUser: any; // ngmodel for select cook
  loading = false;
  @ViewChild(ModalPopUpComponent, {static: false}) forgorPasswordComponentChild: ModalPopUpComponent;
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router,
              private loaderService: LoaderService,
              private auth: AuthService,
              public ngZone: NgZone,
              private toastr: ToastrService,
              private utilityService: UtilityService,
              config: NgbModalConfig, private modalService: NgbModal
    ) {
      config.backdrop = 'static';
      config.keyboard = false;
     }

  ngOnInit() {
    this.createForm();
    // this.openLoginModal();
  }


  createForm() {
    this.loginForm  = this.fb.group(this.initForm());
    console.log(this.loginForm.value);
  }

  initForm(): ILoginModel {
    const loginModel: ILoginModel = {
    emailId: new FormControl('', Validators.compose([Validators.required, Validators.pattern(UserRegEx)])),
    password: new FormControl('', Validators.compose([Validators.required, Validators.pattern(PasswordRegEx)])),
    mobileNo: new FormControl('', Validators.compose([Validators.required])),
    role: new FormControl('1', Validators.compose([Validators.required, Validators.pattern(RoleRegEx)])),
    };
    return loginModel;
  }

  openLoginModal() {
    this.loginModalPopup = this.modalService.open(this.loginModal);
  }

  login(uid?) {
    const userData = this.loginForm.value;
    userData.mobileNo = parseInt(userData.mobileNo, 10);
    userData.role = parseInt(userData.role, 10);
    this.loaderService.show();
    this.loginService.login(userData)
    .subscribe(
      result => {
        this.loaderService.hide();
        this.closeLoginModal();
        if (result.length > 0) {
          const res  = result.map(e => {
           return  {id : e.payload.doc.id, data: e.payload.doc.data(), uid};
          });
          if (result.length > 1) {
            this.cookUsers = [...res];
            this.open(this.content);
          } else {
            this.loginModalPopup.close();
            this.chooseCook(res[0]);
          }
         } else {
                this.toastr.error('Invalid credential', 'Alert');
              }
      },
      () => {
        this.loaderService.hide();
      }
    );
  }

  chooseCook(result) {
    if (this.chooseCookModal) {this.chooseCookModal.close(); }
    const {id, data, uid} = result;
    const userData = {role: data.role};
    if (uid) {
          const obj = {userId :  uid};
          this.loginService.updateUserId(userData.role, id, obj );
         }
    localStorage.setItem(token, id);
    localStorage.setItem(userId, id);
    localStorage.setItem(role, JSON.stringify(userData.role));
    this.utilityService.setValue(currentUserData, {email : data.emailId});
    const routePage = (userData.role === 1) ? Routing.Cook : Routing.Devotee;
    const url = Routing.ViewProfile + '/' + routePage + '/' + id;
    this.auth.isAuthenticate = true;
    this.router.navigate([url]);
  }

  signInWithEmailAndPassword(): void {
    const email = this.loginForm.controls.emailId.value;
    const password  = this.loginForm.controls.password.value;
    const credential: EmailPasswordCredentials = {email, password};
    this.loading = true;
    this.auth.login(credential)
    .then((result) => {
      this.loading = false;
      if (result.user.emailVerified !== true) {
       this.toastr.info('Please validate your email address. Kindly check your inbox.', 'Alert');
     } else {
      const userId = result.user.uid;
      this.login(userId);
     }
      console.log(result.user);
   }).catch((error) => {
    this.toastr.error(error.message, 'Alert');
   });
  }

  onRoleChange(roleEvent: number) {
    console.log(roleEvent);
  }

  open(content) {
    this.chooseCookModal = this.modalService.open(content);
  }

  closeLoginModal() {
    this.loginModalPopup.close();
    this.createForm();
  }

  openForgotModal() {
    this.closeLoginModal();
    this.forgorPasswordComponentChild.openModal();
  }

  sendVerificationEmail(value) {
    this.auth.SendVerificationMail().then(() => {
      this.toastr.warning('verification mail send to your mail ID.', 'Alert');
      })
      .catch(error => {
      this.toastr.error(error.code, 'Error');
        });
  }

}
