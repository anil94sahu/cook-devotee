import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCookComponent } from './search-cook.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : 'cook', component: SearchCookComponent},
  {path : 'cook/:id', component: SearchCookComponent},
];

@NgModule({
  declarations: [SearchCookComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)

  ]
})
export class SearchCookModule { }
