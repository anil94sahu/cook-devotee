import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { token, role } from '../shared/constants/local-storage.constant';
import { Routing } from '../shared/constants/routing.constant';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @ViewChild(LoginComponent, {static: false}) loginComponentChild: LoginComponent;

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
  }

  navigateToRegistration() {

  }

  navigateToViewProfile() {
    const id = localStorage.getItem(token);
    const userRole = parseInt(localStorage.getItem(role), 10);
    const routePage = (userRole === 1) ? Routing.Cook : Routing.Devotee;
    const url = Routing.ViewProfile + '/' + routePage + '/' + id;
    this.auth.isAuthenticate = true;
    this.router.navigate([url]);
  }

  login() {
    this.loginComponentChild.openLoginModal();
  }

  logout() {
    localStorage.clear();
    this.auth.isAuthenticate = false;
    const url = '' ;
    this.router.navigate([url]);
  }

}
