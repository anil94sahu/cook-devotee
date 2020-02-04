import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterDevoteeComponent } from './register-devotee.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileLoaderModule } from '../profile-loader/profile-loader.module';
import { ProfileLoaderComponent } from '../profile-loader/profile-loader.component';

const routes: Routes = [
  {path : 'devotee', component: RegisterDevoteeComponent},
];

@NgModule({
  declarations: [RegisterDevoteeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
    ProfileLoaderModule
  ],
})
export class RegisterDevoteeModule { }
