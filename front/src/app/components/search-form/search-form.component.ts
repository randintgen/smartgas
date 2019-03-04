import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { SearchPrices } from '../../interfaces/search-prices';
import { DatePipe } from '@angular/common';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShopService } from '../../services/shop.service';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { LocalStorageService } from '../../services/local-storage.service';
import { SearchService } from '../../services/search.service';


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output() searchOutput: EventEmitter<any> = new EventEmitter();

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
    const dialogRef = this.dialog.open(PickAdressComponent, {
      width: '600px',
      data : {
        list: this.addressedFound,
        chosen: ''
      }
    });

    dialogRef.afterClosed().subscribe(
      (chosen) => {
        console.log(this.addressedFound[chosen.chosen]);
        this.objSearch['geoLat'] = this.addressedFound[chosen.chosen].y;
        this.objSearch['geoLng'] = this.addressedFound[chosen.chosen].x;
        this.searchService.searchShops(this.objSearch).subscribe(
          (response) => {
            console.log('I send', response);
            this.searchOutput.emit(response.prices);
          }
        )
      }
    );
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
      this.objSearch['geoDist'] = 10;
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
          console.log('here:', this.objSearch);
          this.searchService.searchShops(this.objSearch).subscribe(
            (response) => {
              this.searchResults = response.prices;
              this.searchOutput.emit(this.searchResults);
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
          console.log('none', this.objSearch);
          console.error('No results!');
        }else if(results.length === 1){
          this.objSearch['geoLat'] = results[0].y;
          this.objSearch['geoLng'] = results[0].x;
          console.log('one', this.objSearch);
          this.searchService.searchShops(this.objSearch).subscribe(
            (response) => {
              this.searchResults = response.prices;
              this.searchOutput.emit(this.searchResults);
            }
          )
        }else {
          console.log('many', this.objSearch);
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

@Component({
  selector: 'app-pick-address',
  templateUrl: 'pick-address.component.html',
  styleUrls: ['./pick-address.component.css']
})

export class PickAdressComponent implements OnInit{

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ){}
  
  private dataSource;
  private displayedColumns;

  ngOnInit(){

    var addresses = [];
    var temp = '';
    var counter = 0;
    for(let add of this.data.list){
      var broken = add.label.split(',');
      temp += broken[0] + broken[1] + broken[2] + broken[3];
      addresses.push({'add': temp, 'id': counter});
      counter += 1;
      temp = '';
    }

    console.log(addresses);
    this.displayedColumns = ['add', 'button'];
    this.dataSource = addresses;
  }
}