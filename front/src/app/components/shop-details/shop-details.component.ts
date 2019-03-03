import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { SearchService } from '../../services/search.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }


  private selectedShopId;
  private selectedShop;
  private shopPrices;
  private taken = false;
  panelOpenState = false;
  
  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.shopService.getShop(parseInt(id)).subscribe(
      (response) => {
        console.log(response);
        this.selectedShop = response.shops;
        this.selectedShopId = id;
        console.log(response);
      },
      (error) => {
        console.log(error.error.message);
      });
  }

}
