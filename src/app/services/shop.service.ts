import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ShopResponse } from '../interfaces/shop-response';
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
}
