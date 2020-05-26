import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { SearchCookModule } from './search-cook/search-cook.module';
import { RegisterDevoteeComponent } from './register-devotee/register-devotee.component';
import { CanActivateTeam } from './shared/components/reusable-component/canActivateTeam/canActivateTeam';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path : 'register', component: RegistrationComponent},
  {path : 'register-devotee', component: RegisterDevoteeComponent},
  {path : 'edit/cook/:id', component: RegistrationComponent},
  {path : 'edit/devotee/:id', component: RegisterDevoteeComponent},
  {path : 'search-cook', loadChildren: './search-cook/search-cook.module#SearchCookModule', canActivate: [CanActivateTeam]},
  {path : 'view-profile', loadChildren: './view-profile/view-profile.module#ViewProfileModule'},
  {path : 'admin', component: AdminComponent, canActivate: [CanActivateTeam]},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Add options right here
  }), SearchCookModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
