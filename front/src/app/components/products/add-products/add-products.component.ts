import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { ProductsService } from '../../../services/products.service';


@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'description', 'category', 'withdrawn', 'edit', 'delete'];


  constructor(
    private form: FormBuilder,
    private productService: ProductsService,

  ) { }

  private addProduct = this.form.group({
    'name': [''],
    'description': [''],
    'category': [''],
    'tags': ['']
  });


  ngOnInit() {
  }

  private addProductAttempt(): void {

    var productName = this.addProduct.controls['name'].value;
    var productDescription = this.addProduct.controls['description'].value;
    var productCategory = this.addProduct.controls['category'].value;
    
    var addRequest = this.productService.addProduct(productName, productDescription, productCategory, [""]).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}