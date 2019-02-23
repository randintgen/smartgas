import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {

  constructor(
    private form: FormBuilder,
    private shopService: ShopService
  ) { }

  private addShopForm = this.form.group({
    'name': [''],
    'address': [''],
    'tags': ['']
  });

  ngOnInit() {
  }

  private addShopAttempt(): void {

    var shopName = this.addShopForm.controls['name'].value;
    var shopAdd = this.addShopForm.controls['address'].value;
    var shopTags = this.addShopForm.controls['tags'].value;

    var addRequest = this.shopService.createShop('aexl', 'fdacdsf', ['csdvcsvc']).subscribe(
      (response) => {
        console.log(response.success);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
}
