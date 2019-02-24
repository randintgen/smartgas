import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ReactiveFormsModule } from '@angular/forms';


import { HttpClientModule } from '@angular/common/http';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { LogoutUserComponent } from './components/logout-user/logout-user.component';
import { ShopsListComponent } from './components/shops-list/shops-list.component';
import { AddShopComponent } from './components/add-shop/add-shop.component';
import { ShopDetailsComponent } from './components/shop-details/shop-details.component';
import { TesterComponent } from './components/tester/tester.component';
import { FiltersSearchComponent } from './components/filters-search/filters-search.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginUserComponent,
    LogoutUserComponent,
    ShopsListComponent,
    AddShopComponent,
    ShopDetailsComponent,
    TesterComponent,
    FiltersSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
