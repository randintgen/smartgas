import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import { PostService } from '../../../services/post.service';

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
    private postService: PostService
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
    console.log(this.shopSelected);
  }

  addPrice(offset: number): void {

  
    var newShop = {...this.shopSelected};
    const newPrice = this.allForms[offset]
                        .controls['1'].value;

    var newDate: any = new Date();
    newDate = newDate.toISOString().split('T')[0];

    if(newPrice === ''){
      return;
    }
    
    if(offset === 0){
      console.log(newDate);
      this.postService.addPost({
        price: newPrice,
        date: newDate,
        shopId: newShop.id,
        productId: 0
      }).subscribe(
        (response) => {
          console.log('dadadada', response);
        },
        (error) => {
          console.log(error);
        }
      )
    }else if(offset === 1){
    }else if(offset === 2){
    }else if(offset === 3){
    }else if(offset === 4){
    }else if(offset === 5){
    }else if(offset === 6){
    }else if(offset === 7){
    }
    console.log(newPrice);
  }

}
