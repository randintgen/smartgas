import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private fuelTypes;
  private total: number;

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    var findCount = new Promise((resolve, reject) => {
      this.httpService.getProducts(0, 1).subscribe(
        (response) => {
          this.total = response['total'];
          console.log(response);
          var products = new Promise((resolve, reject) => {
            this.httpService.getProducts(0, this.total).subscribe(
              (response) => {
                this.fuelTypes = response['products'];
              }
            )
          })
        }
      )
    });
  }


}
