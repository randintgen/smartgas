import { Component, OnInit } from '@angular/core';

import { ShopService } from '../../services/shop.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.css']
})
export class ShopsListComponent implements OnInit {

  constructor(
    private shopService: ShopService,
    private userService: UserService
  ) { }

  private allShops;

  ngOnInit() {   
    /* 
    this.shopService.getShops().subscribe(
      (response) => {
        this.allShops=response.shops;
      }
    )
  };*/
  }
}
