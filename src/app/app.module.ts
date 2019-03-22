import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './AppMaterialModule.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HomeComponent } from './_components/homeComponent';
import { LoginComponent } from './_components/userComponent/login';
import { RegisterComponent } from './_components/userComponent/register';
import { ProfileComponent } from './_components/userComponent/profile';
import { AlertComponent } from './_components/alertComponent/alert.component';
import { UserService } from './_services';
import { ErrorInterceptor } from './_helpers/error.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    AlertComponent,
    LoginComponent
  ],
  imports: [
  BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    AppMaterialModule

  ],
  providers: [
    UserService,
   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
