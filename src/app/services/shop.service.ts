import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ShopResponse } from '../interfaces/shop-response';
import { CreateShopResponse } from '../interfaces/create-shop-response';

import { StandardResponse } from '../interfaces/standard-response';

import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ShopService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'https://localhost:8765/observatory/api/';

  getShops(start?: number, count?: number, status?: string, sort?: string): Observable<ShopResponse>{
    
    var shopsUrl = this.baseUrl + 'shops';

    if(start == undefined){
      shopsUrl += '?start=0';
    }else{
      shopsUrl += '?start=' + start;
    }

    if(count == undefined){
      shopsUrl += '&count=20';
    }else{
      shopsUrl += '&count=' + count;
    }

    if(status == undefined) {
      shopsUrl += '&status=ACTIVE';
    }else{
      shopsUrl += '&status=' + status;
    }

    if(sort == undefined) {
      shopsUrl += '&sort=id|ASC';
    }else{
      shopsUrl += '&sort=' + sort;
    }
    
    var shopsResponse = this.http.get<ShopResponse>(shopsUrl, httpOptions);

    return shopsResponse;
  };

  createShop(name: string, address: string, tags?: string[], lng?: number, lat?: number): Observable<CreateShopResponse>{
    
    var createUrl = this.baseUrl + 'shops';
    
    var newHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': localStorage.getItem('token')
      })
    };

    if(lat == undefined){
      var lat = 0.23;
    }

    if(lng == undefined){
      var lng = 0.54;
    }

    var createResponse = this.http.post<CreateShopResponse>(createUrl,
      JSON.stringify({
        name: name,
        address: address,
        lng: lng,
        lat: lat,
        tags: tags,
        withdrawn: false
      }), newHeaders);

    return createResponse;
  };

  getShop(id: number): Observable<ShopResponse>{
    
    var getShopUrl = this.baseUrl + 'shops/' + id;

    var shopTaken = this.http.get<ShopResponse>(
      getShopUrl,
      httpOptions
    );

    return shopTaken;
  };

  deleteShop(id: number): Observable<StandardResponse> {

    var deleteShopUrl = this.baseUrl + 'shops/' + id;

    var deleteShopRequest = this.http.delete<StandardResponse>(
      deleteShopUrl,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-OBSERVATORY-AUTH': localStorage.getItem('token')
        })
      });

    return deleteShopRequest;
  };
}
