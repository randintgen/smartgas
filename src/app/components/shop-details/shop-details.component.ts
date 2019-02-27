import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import { ShopResponse } from '../../interfaces/shop-response';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {

  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute
  ) { }


  private selectedShop: any;
  panelOpenState = false;
  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    var x = this.shopService.getShop(parseInt(id)).subscribe(

      (response) => {
        console.log(id);
        console.log(response);
        this.selectedShop=response.product;
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(id);
  }

}
