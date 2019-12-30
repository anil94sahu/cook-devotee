import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { RegisterDevoteeModule } from './register-devotee/register-devotee.module';
import { SearchCookModule } from './search-cook/search-cook.module';

const routes: Routes = [
  {path : 'register', component: RegistrationComponent},
  {path : 'register-devotee', loadChildren: './register-devotee/register-devotee.module#RegisterDevoteeModule'},
  {path : 'search-cook', loadChildren: './search-cook/search-cook.module#SearchCookModule'},
  {path : 'view-profile', loadChildren: './view-profile/view-profile.module#ViewProfileModule'},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RegisterDevoteeModule, SearchCookModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
