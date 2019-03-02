import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { SearchPrices } from '../../interfaces/search-prices';
import { DatePipe } from '@angular/common';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShopService } from '../../services/shop.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AddressesListComponent } from './addresses-list/addresses-list.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  private allProducts; 
  private objSearch;
  private disHere: boolean = false;
  private chooseDates: boolean = false;
  private searchResults;
  private addressedFound;
  private disDist: boolean = true;

  constructor(
    private form: FormBuilder,
    private productService: ProductsService,
    private shopService: ShopService,
    private dialog: MatDialog,
    private myStorage: LocalStorageService,
    private searchService: SearchService
  ) { }

  private searchForm = this.form.group({
    'fuel': [''],
    'maxDist': [''],
    'here': [''],
    'location': [''],
    'today': [''],
    'date': ['']
  });

  ngOnInit() {
    this.objSearch = {};

    this.productService.getProducts().subscribe(
      (response) => {
        this.allProducts = response.products;
      }
    );
  }

  openListAdd(): void {
    console.log(this.addressedFound);
    this.myStorage.storeOnLocal('addresses', this.addressedFound);
    const dialogRef = this.dialog.open(AddressesListComponent, {
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(_ => {
      var results = this.myStorage.getFromLocal('addresses');
      this.searchService.searchShops(this.objSearch).subscribe(
        (response) => {
          this.searchResults = response.prices;
        }
      );
    });
  };

  submit() {

    this.objSearch = {}; 
    this.searchResults = {};

    var product = this.searchForm.controls['fuel'].value;
    var geoDist = this.searchForm.controls['maxDist'].value;
    var location = this.searchForm.controls['location'].value;
    var date = this.searchForm.controls['date'].value;

    if(product){
      this.objSearch['product'] = product;
    }

    if(geoDist > 2) {
      this.objSearch['geoDist'] = geoDist;
    }else{
      this.objSearch['geoDist'] = 25;
    }

    if(this.chooseDates){
      var todate = new Date();
      var toDate = todate.toISOString().split('T')[0];
      this.objSearch['when'] = toDate;
    }else if(date){
      var newDate:any = new Date(date);
      newDate = newDate.toISOString().split('T')[0];
      this.objSearch['dateFrom'] = newDate;
      this.objSearch['dateTo'] = newDate;
    }

    if(this.disHere) {
      const nav = navigator.geolocation.getCurrentPosition(
        (result) => {
          this.objSearch['geoLat'] = result.coords.latitude;
          this.objSearch['geoLng'] = result.coords.longitude;
          this.searchService.searchShops(this.objSearch).subscribe(
            (response) => {
              this.searchResults = response.prices;
            }
          )
        },
        (error) => {
          console.log(error);
        }
      );
    }else if(location && location !== '') {
      const provider = new OpenStreetMapProvider();

      const nav = provider.search({
        query: location
      }).then((results) => {
        if(results.length === 0){
          console.error('No results!');
        }else if(results.length === 1){
          this.objSearch['geoLat'] = results[0].y;
          this.objSearch['geoLng'] = results[0].x;
          this.searchService.searchShops(this.objSearch).subscribe(
            (response) => {
              this.searchResults = response.prices;
            }
          )
        }else {
          this.addressedFound = results;
          this.openListAdd();
        }
      });
    }
  }
  

  here(): void {
    this.disHere = !this.disHere;
  }

  today(): void {
    this.chooseDates = !this.chooseDates;
  }

  distance(): void {
    this.disDist = !this.disDist;
  }

}
