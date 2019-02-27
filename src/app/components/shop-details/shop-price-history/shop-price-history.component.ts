import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';


@Component({
  selector: 'app-shop-price-history',
  templateUrl: './shop-price-history.component.html',
  styleUrls: ['./shop-price-history.component.css']
})
export class ShopPriceHistoryComponent implements OnInit {

private allProducts; 

  constructor(
    private form: FormBuilder,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.allProducts = response.products;
      }
    );
  }

}


