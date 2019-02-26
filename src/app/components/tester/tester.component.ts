import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../../services/products.service';
import { UserService } from '../../services/user.service';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.css']
})
export class TesterComponent implements OnInit {

  constructor(
    private productsService: ProductsService,
    private shopsService: ShopService,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

}
