import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopDetailsComponent } from './components/shop-details/shop-details.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: 'shops/:id', component: ShopDetailsComponent},
  { path: 'user/:name', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
