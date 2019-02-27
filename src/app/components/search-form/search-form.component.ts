import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { SearchPrices } from '../../interfaces/search-prices';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  private allProducts; 
  private please: string;
  private disableDates: boolean;
  private disableLocation: boolean;
  private disableAllLocs: boolean;

  constructor(
    private form: FormBuilder,
    private productService: ProductsService
  ) { }

  private searchForm = this.form.group({
    'fuel': [''],
    'maxDist': [''],
    'here': [''],
    'location': [''],
    'maxPrice': [''],
    'today': [''],
    'dateFrom': [''],
    'dateTo': ['']
  });

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (response) => {
        this.allProducts = response.products;
      }
    );
  }

  submit() {

    var objSearch = {};

    var fuel = this.searchForm.controls['fuel'].value;
    var maxDist = this.searchForm.controls['maxDist'].value;
    var here = this.searchForm.controls['here'].value;
    var location = this.searchForm.controls['location'].value;
    var maxPrice = this.searchForm.controls['maxPrice'].value;
    var today = this.searchForm.controls['today'].value;
    var dateFrom = this.searchForm.controls['dateFrom'].value;
    var dateTo = this.searchForm.controls['dateTo'].value;

    if(this.disableAllLocs){
      objSearch['geoDist'] = maxDist;
    }else if(this.disableLocation){
      objSearch['']
    }
    
  };

  choseMaxDist() {
    this.disableAllLocs = !this.disableAllLocs;
  }
  
  disablerDates() {
    this.disableDates = !this.disableDates;
  };

  disablerLoc() {
    this.disableLocation = !this.disableLocation;
  }

}
