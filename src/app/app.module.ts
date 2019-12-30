import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { CouraselComponent } from './courasel/courasel.component';
import { SectionComponent } from './section/section.component';
import { RankComponent } from './rank/rank.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegistrationService } from './shared/services/registration.service';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { StorageFirebaseService } from './shared/services/storage.firebase.service';
import { ProfileLoaderComponent } from './profile-loader/profile-loader.component';
import { DevoteeRegistrationService } from './shared/services/devotee.registration.service';
import { SearchCookService } from './shared/services/search-cook.service';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoaderService } from './shared/services/loader.service';
import { WindowService } from './shared/services/window.service';
import { UtilityService } from './shared/services/utility.service';
@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    CouraselComponent,
    SectionComponent,
    RankComponent,
    AboutComponent,
    ContactComponent,
    ProfileLoaderComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AngularFirestore, RegistrationService, 
    StorageFirebaseService, DevoteeRegistrationService,
  SearchCookService, LoaderService, WindowService, UtilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
