import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { LogoutUserComponent } from './components/logout-user/logout-user.component';
import { ShopsListComponent } from './components/shops-list/shops-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginUserComponent,
    LogoutUserComponent,
    ShopsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
