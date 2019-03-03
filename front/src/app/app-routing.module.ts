import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiltersSearchComponent } from './components/filters-search/filters-search.component';
import { ShopDetailsComponent } from './components/shop-details/shop-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddShopComponent } from './components/add-shop/add-shop.component';
import { ShopsListComponent } from './components/shops-list/shops-list.component';

const routes: Routes = [
  { path: '', component: FiltersSearchComponent },
  { path: 'shops/:id', component: ShopDetailsComponent},
  { path: 'user/:name', component: ProfileComponent},
  { path: 'add/shops', component: AddShopComponent},
  { path: 'shops/list', component: ShopsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
