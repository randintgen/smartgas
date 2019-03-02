import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiltersSearchComponent } from './components/filters-search/filters-search.component';
import { ShopDetailsComponent } from './components/shop-details/shop-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddShopComponent } from './components/add-shop/add-shop.component';

const routes: Routes = [
  { path: '', component: FiltersSearchComponent },
  { path: 'shops/:id', component: ShopDetailsComponent},
  { path: 'user/:name', component: ProfileComponent},
  { path: 'add/shops', component: AddShopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
