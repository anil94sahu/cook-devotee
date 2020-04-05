import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfileComponent } from './view-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

const routes: Routes = [
  {path : 'cook/:id', component: ViewProfileComponent},
  {path : 'devotee/:id', component: ViewProfileComponent}
];


@NgModule({
  declarations: [ViewProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerfectScrollbarModule
  ]
})
export class ViewProfileModule { }
