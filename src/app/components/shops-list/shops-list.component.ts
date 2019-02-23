import { Component, OnInit } from '@angular/core';

import { ShopService } from '../../services/shop.service';
@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.css']
})
export class ShopsListComponent implements OnInit {

  constructor(
    private shopService: ShopService
  ) { }

  private allShops;

  ngOnInit() {
    this.shopService.getShops().subscribe(
      (response) => {
        console.log(response);
        // should change!
        this.allShops = response.products;
      }
    )
  }

}
