import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { OpenStreetMapProvider } from 'leaflet-geosearch';



export interface Alysida {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {

  private syntagmaSquareLoc = [23.734837, 37.975655];
  private initLat=37.975655;
  private initLng=23.734837;
  private addressedFound;


  constructor(
    private form: FormBuilder,
    private shopService: ShopService
  ) { }

  private addShopForm = this.form.group({
    'name': [''],
    'address': [''],
    'city': [''],
    'tk': [''],
    'tags': ['']
  });


  alysides: Alysida[] = [
      {value: 'alysida-0', viewValue: 'JETOIL'},
      {value: 'alysida-1', viewValue: 'Shell'},
      {value: 'alysida-2', viewValue: 'ETEKA'},
      {value: 'alysida-3', viewValue: 'AVIN'},
      {value: 'alysida-4', viewValue: 'AEGEAN'},
      {value: 'alysida-5', viewValue: 'EKO'},
      {value: 'alysida-6', viewValue: 'REVOIL'},
      {value: 'alysida-7', viewValue: 'BP'},
      {value: 'alysida-8', viewValue: 'ΕΛΙΝΟΙΛ'},
      {value: 'alysida-9', viewValue: 'DRACOIL'},
      {value: 'alysida-10', viewValue: 'CYCLON'},
      {value: 'alysida-11', viewValue: 'KMOIL'},
      {value: 'alysida-12', viewValue: 'EL-PETROIL'},
      {value: 'alysida-13', viewValue: 'ΑΡΓΩ'},
      {value: 'alysida-14', viewValue: 'KAOIL'},
      {value: 'alysida-15', viewValue: 'MEDOIL'},
      {value: 'alysida-16', viewValue: 'ΤΡΙΑΙΝΑ'},
      {value: 'alysida-17', viewValue: 'CRETA PETROL'},
      {value: 'alysida-18', viewValue: 'WIN'},
      {value: 'alysida-19', viewValue: 'FISIKON'},
      {value: 'alysida-20', viewValue: 'VALIN'},
      {value: 'alysida-21', viewValue: 'Silkoil'},
      {value: 'alysida-22', viewValue: 'Α.Π.'},
      {value: 'alysida-23', viewValue: 'Άλλο'}
    ];

    
  ngOnInit() {
  }

  private find() : void {
    const provider = new OpenStreetMapProvider();

    const nav = provider.search({
      query: location
    }).then((results) => {
      if(results.length === 0){
        console.error('No results!');
      }else if(results.length === 1){
        this.initLat = results[0].y;
        this.initLng = results[0].x;
      }else {
        this.addressedFound = results;
        // kalese thn alli sinartisi 
      }
    })
  }

  private addShopAttempt(): void {

    var shopName = this.addShopForm.controls['name'].value;
    var shopAdd = this.addShopForm.controls['address'].value
                  +", "+this.addShopForm.controls['city'].value
                  +", "+this.addShopForm.controls['tk'].value;
    var shopTags = this.addShopForm.controls['tags'].value;

    var addRequest = this.shopService.createShop(shopName, shopAdd, [shopTags]).subscribe(
      (response) => {
        console.log(response.success);
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
}