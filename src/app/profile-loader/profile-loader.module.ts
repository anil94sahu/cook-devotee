import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ProfileLoaderComponent } from './profile-loader.component';


@NgModule({
    declarations: [
        ProfileLoaderComponent
    ],
    exports: [
        ProfileLoaderComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ProfileLoaderModule { }
