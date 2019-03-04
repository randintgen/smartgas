import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { PostService } from '../../../services/post.service';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-prices-ofshop',
  templateUrl: './add-prices-ofshop.component.html',
  styleUrls: ['./add-prices-ofshop.component.css']
})
export class AddPricesOfshopComponent implements OnInit {

  @Input() shopSelected;

  constructor(
    private form: FormBuilder,
    private productService: ProductsService,
    private postService: PostService,
    private myStorage: LocalStorageService,
    private route: Router
  ) { }

  private fuel1 = this.form.group({
    '1': ['']
  });
  private fuel2 = this.form.group({
    '1': ['']
  });
  private fuel3 = this.form.group({
    '1': ['']
  });
  private fuel4 = this.form.group({
    '1': ['']
  });
  private fuel5 = this.form.group({
    '1': ['']
  });
  private fuel6 = this.form.group({
    '1': ['']
  });
  private fuel7 = this.form.group({
    '1': ['']
  });

  private allForms = [
    this.fuel1,
    this.fuel2,
    this.fuel3,
    this.fuel4,
    this.fuel5,
    this.fuel6,
    this.fuel7
  ];

  ngOnInit() {
    var isConnected = this.myStorage.getFromLocal('username');
    console.log(this.shopSelected);
  }

  addPrice(offset: number): Observable<any> {

  
    var newShop = {...this.shopSelected};
    const newPrice = this.allForms[offset - 1]
                        .controls['1'].value;

    var newDate: any = new Date();
    newDate = newDate.toISOString().split('T')[0];

    if(newPrice === ''){
      return;
    }
    
    console.log(newDate);
    this.postService.addPost({
      price: newPrice,
      date: newDate,
      shopId: newShop.id,
      productId: offset
    }).subscribe(
      (response) => {
        console.log('dadadada', response);
        this.allForms[offset - 1].controls['1'].setValue({'1': ''})
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(newPrice);
  }

}
