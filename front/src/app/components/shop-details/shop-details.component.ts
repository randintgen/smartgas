import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { SearchService } from '../../services/search.service';
import { FormBuilder } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private searchService: SearchService,
    private myStorage: LocalStorageService
  ) { }


  private selectedShopId;
  private selectedShop;
  private shopPrices;
  private shopLoaded: boolean = false;
  private taken = false;
  private isConnected;
  panelOpenState = false;
  
  ngOnInit() {

    this.isConnected = this.myStorage.getFromLocal('username');

    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.shopService.getShop(parseInt(id)).subscribe(
      (response) => {
        console.log(response);
        this.shopLoaded = true;
        this.selectedShop = response;
        this.selectedShopId = id;
        console.log(response);
      },
      (error) => {
        console.log(error.error.message);
      });
  }

}
