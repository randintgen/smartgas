import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ShopsListComponent } from './components/shops-list/shops-list.component';
import { AddShopComponent, ResultListComponent } from './components/add-shop/add-shop.component';
import { ShopDetailsComponent } from './components/shop-details/shop-details.component';
import { TesterComponent, DialogDataExampleDialog } from './components/tester/tester.component';
import { FiltersSearchComponent, Types } from './components/home-page/filters-search/filters-search.component';
import { MaterialModule } from './modules/material/material.module';
import { NavBarComponent, LoginUserComponent, RegisterUserComponent } from './components/nav-bar/nav-bar.component';

import { LocalStorageService } from './services/local-storage.service';
import { SearchFormComponent, PickAdressComponent } from './components/search-form/search-form.component';

import { ShopPriceHistoryComponent } from './components/shop-details/shop-price-history/shop-price-history.component';
import { ShopPricesComponent } from './components/shop-details/shop-prices/shop-prices.component';

import { EditShopComponent } from './components/shop-details/edit-shop/edit-shop.component';
import { AddPricesOfshopComponent } from './components/shop-details/add-prices-ofshop/add-prices-ofshop.component';

import { HomePageListComponent } from './components/home-page/home-page-list/home-page-list.component';
import { MapsComponent } from './components/maps/maps.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { ShowOnMapComponent } from './components/shop-details/show-on-map/show-on-map.component';
import { ShownShopsComponent } from './components/home-page/home-page-list/shown-shops/shown-shops.component';
import { MarkerOnMapComponent } from './components/search-form/marker-on-map/marker-on-map.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewUsernameComponent } from './components/profile/new-username/new-username.component';
import { NewPasswordComponent } from './components/profile/new-password/new-password.component';
import { MyhistoryComponent } from './components/profile/myhistory/myhistory.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { UploadPhotoComponent } from './components/profile/upload-photo/upload-photo.component';
import { AddProductsComponent } from './components/products/add-products/add-products.component';
import { ProductsComponent, EditProductModalComponent, DeleteProductComponent } from './components/products/products.component';
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopsListComponent,
    AddShopComponent,
    ShopDetailsComponent,
    DialogDataExampleDialog,
    TesterComponent,
    FiltersSearchComponent,
    SearchFormComponent,
    ShopPriceHistoryComponent,
    ShopPricesComponent,
    EditShopComponent,
    AddPricesOfshopComponent,
    HomePageListComponent,
    MapsComponent,
    ShowOnMapComponent,
    ShownShopsComponent,
    MarkerOnMapComponent,
    ProfileComponent,
    NewUsernameComponent,
    NewPasswordComponent,
    MyhistoryComponent,
    FooterComponent,
    AboutUsComponent,
    UploadPhotoComponent,
    ProductsComponent,
    NavBarComponent,
    LoginUserComponent,
    RegisterUserComponent,
    AddProductsComponent,
    EditProductModalComponent,
    DeleteProductComponent,
    ResultListComponent,
    PickAdressComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    AgmCoreModule.forRoot({apiKey: '********************'}),
    BrowserAnimationsModule,
    FormsModule,
    StorageServiceModule
  ],
  providers: [
    LocalStorageService,
    GoogleMapsAPIWrapper
  ],
  entryComponents: [
    LoginUserComponent,
    RegisterUserComponent,
    EditProductModalComponent,
    DeleteProductComponent,
    ResultListComponent,
    PickAdressComponent
  ],
  exports: [
    ResultListComponent,
    PickAdressComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
