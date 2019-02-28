import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { SearchService } from '../../services/search.service';
import { take } from 'rxjs/operators';

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
    this.shopService.getShop(parseInt(id)).subscribe(
      (response) => {
        this.selectedShop = response.product;
        this.selectedShopId = id;
      },
      (error) => {
        if(!this.taken){
          this.taken = !this.taken;
        }else{
          console.log(error.error.message);
        }
      });

  }


}
