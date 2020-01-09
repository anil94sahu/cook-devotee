import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterDevoteeComponent } from './register-devotee.component';


const routes: Routes = [
  {path : 'register-devotee', component: RegisterDevoteeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
