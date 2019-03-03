import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-add-prices-ofshop',
  templateUrl: './add-prices-ofshop.component.html',
  styleUrls: ['./add-prices-ofshop.component.css']
})
export class AddPricesOfshopComponent implements OnInit {

  constructor(
    private form: FormBuilder,
    private productService: ProductsService
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

  private allForms = [
    this.fuel1,
    this.fuel2,
    this.fuel3,
    this.fuel4,
    this.fuel5,
    this.fuel6
  ];

  ngOnInit() {
  }

  addPrice(offset: number): void {

    const newPrice = this.allForms[offset]
                        .controls['1'].value;


    if(newPrice === ''){
      return;
    }
    
    if(offset === 0){
    }else if(offset === 1){
    }else if(offset === 2){
    }else if(offset === 3){
    }else if(offset === 4){
    }else if(offset === 5){
    }else if(offset === 6){
    }

    console.log(newPrice);
  }

}
