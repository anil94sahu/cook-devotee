import { GoogleAnalyticsService } from './../google-analytics.service';
import { ModalPopUpComponent } from './../shared/components/reusable-component/modal-pop-up/modal-pop-up.component';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { token, role } from '../shared/constants/local-storage.constant';
import { Routing } from '../shared/constants/routing.constant';
import { images } from '../shared/constants/image.constant';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceInDown } from 'ng-animate';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('bounce', [transition('* => *', useAnimation(bounceInDown, {
      // Set the duration to 5seconds and delay to 2seconds
      params: { timing: 5, delay: 0 }
    }))])
  ],
})
export class MenuComponent implements OnInit {
  @ViewChild(LoginComponent, {static: false}) loginComponentChild: LoginComponent;
  @ViewChild(ModalPopUpComponent, {static: false}) ModalPopUpComponentChild: ModalPopUpComponent;
  logoImages = images;
  searchParam = '';
  currentEmailId = '';
  bounce: any;

  constructor(private router: Router, public auth: AuthService, public googleAnalyticsService: GoogleAnalyticsService) {
    const currentuserdata = JSON.parse(localStorage.getItem('currentuserdata'));
    if (currentuserdata) {
      this.currentEmailId = currentuserdata.email;
    }
   }

  isAdmin() {
    return this.auth.isAuthenticate && this.currentEmailId === 'anil94sahu@gmail.com';
  }

  ngOnInit() {
  }

  navigateToRegistration() {

  }

  /* search navigation */
  navigateToSearch(params) {
    const url = '/search-cook/cook/' + params;
    this.router.navigateByUrl(url);
  }

  navigateToViewProfile() {
    const id = localStorage.getItem(token);
    const userRole = parseInt(localStorage.getItem(role), 10);
    const routePage = (userRole === 1) ? Routing.Cook : Routing.Devotee;
    const url = Routing.ViewProfile + '/' + routePage + '/' + id;
    this.auth.isAuthenticate = true;
    this.router.navigate([url]);
  }

  openChangePassword() {
    this.ModalPopUpComponentChild.openModal();
  }

  login() {
    this.googleAnalyticsService.eventEmitter('loginPage', 'like', 'login', 1);
    this.loginComponentChild.openLoginModal();
  }

  logout() {
    localStorage.clear();
    this.auth.isAuthenticate = false;
    const url = '' ;
    this.router.navigate([url]);
  }

}
