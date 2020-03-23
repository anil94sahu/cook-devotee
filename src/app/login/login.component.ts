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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginModal', {static: false}) loginModal: ElementRef;
  @ViewChild('closeLoginModal', {static: false}) closeLoginModal: ElementRef;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router,
              private loaderService: LoaderService,
              private auth: AuthService,
              public ngZone: NgZone,
              private toastr: ToastrService
    ) { }

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
    this.loginModal.nativeElement.click();
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
        if (result.length > 0) {
          // this.closeLoginModal.nativeElement.click();
          const id = result[0].payload.doc.id;
          if (uid) {
          const obj = {userId :  uid};
          this.loginService.updateUserId(userData.role, id, obj );
         }
          localStorage.setItem(token, id);
          localStorage.setItem(userId, id);
          localStorage.setItem(role, userData.role);
          const routePage = (userData.role === 1) ? Routing.Cook : Routing.Devotee;
          const url = Routing.ViewProfile + '/' + routePage + '/' + id;
          this.auth.isAuthenticate = true;
          this.loginModal.nativeElement.click();
          this.router.navigate([url]);
         } else {
                this.toastr.error('Invalid credential', 'Alert');
              }
      },
      () => {
        this.loaderService.hide();
      }
    );
  }

  signInWithEmailAndPassword(): void {
    const email = this.loginForm.controls.emailId.value;
    const password  = this.loginForm.controls.password.value;
    const credential: EmailPasswordCredentials = {email, password};
    this.auth.login(credential)
    .then((result) => {
     if (result.user.emailVerified !== true) {
       this.auth.SendVerificationMail();
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
}
