import { Routes, RouterModule } from '@angular/router';


import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

const routes: Routes = [
    {path : 'login', component: LoginComponent},
  ];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      ReactiveFormsModule,
    ],
  })
  export class LoginModule { }
