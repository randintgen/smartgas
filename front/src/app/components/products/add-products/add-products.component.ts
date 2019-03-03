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

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags= [ 'tag1' ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
  }

  remove(tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  
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
    var productTags = this.addProduct.controls['tags'].value;

    console.log(productTags);
    
    var addRequest = this.productService.addProduct(productName, productDescription, productCategory, productTags).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}