import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { SearchCookModule } from './search-cook/search-cook.module';
import { RegisterDevoteeComponent } from './register-devotee/register-devotee.component';

const routes: Routes = [
  {path : 'register', component: RegistrationComponent},
  {path : 'register-devotee', component: RegisterDevoteeComponent},
  {path : 'edit/cook/:id', component: RegistrationComponent},
  {path : 'edit/devotee/:id', component: RegisterDevoteeComponent},
  {path : 'search-cook', loadChildren: './search-cook/search-cook.module#SearchCookModule'},
  {path : 'view-profile', loadChildren: './view-profile/view-profile.module#ViewProfileModule'},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SearchCookModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
