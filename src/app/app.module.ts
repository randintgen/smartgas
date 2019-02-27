import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { LogoutUserComponent } from './components/logout-user/logout-user.component';
import { ShopsListComponent } from './components/shops-list/shops-list.component';
import { AddShopComponent } from './components/add-shop/add-shop.component';
import { ShopDetailsComponent } from './components/shop-details/shop-details.component';
import { TesterComponent } from './components/tester/tester.component';
import { FiltersSearchComponent, Types } from './components/filters-search/filters-search.component';
import { MaterialModule } from './modules/material/material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { LocalStorageService } from './services/local-storage.service';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { AddressesListComponent } from './components/addresses-list/addresses-list.component';

import { ShopPriceHistoryComponent } from './components/shop-details/shop-price-history/shop-price-history.component';
import { ShopPricesComponent } from './components/shop-details/shop-prices/shop-prices.component';

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
    FiltersSearchComponent,
    NavBarComponent,
    SearchFormComponent,
    AddressesListComponent
    ShopPriceHistoryComponent,
    ShopPricesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    StorageServiceModule
  ],
  providers: [
    LocalStorageService
  ],
  entryComponents: [
    LoginUserComponent,
    RegisterUserComponent,
    AddressesListComponent
  ],
  exports: [
    LoginUserComponent,
    RegisterUserComponent,
    AddressesListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
