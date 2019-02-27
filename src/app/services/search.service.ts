import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private baseUrl: string = 'https://localhost:8765/observatory/api/';

  constructor(
    private http: HttpClient
  ) { }

  searchShops(searchObj: any): Observable<any> {

    var searchUrl = this.baseUrl + 'prices';
    var counter: number = 0;

    console.log(JSON.stringify(searchObj));
    if(searchObj.geoDist){
      if(counter == 0){
        searchUrl += '?';
      }else{
        searchUrl += '&';
      }
      searchUrl += 'geoDist=' + searchObj.geoDist;
      counter++;
    }

    if(searchObj.geoLat){
      if(counter == 0){
        searchUrl += '?';
      }else{
        searchUrl += '&';
      }
      searchUrl += 'geoLat=' + searchObj.geoLat;
      counter++;
    }

    if(searchObj.geoLng){
      if(counter == 0){
        searchUrl += '?';
      }else{
        searchUrl += '&';
      }
      searchUrl += 'geoLng=' + searchObj.geoLng;
      counter++;
    }

    if(searchObj.dateFrom){
      console.log('dateFrom', searchObj.dateFrom);
      if(counter == 0){
        searchUrl += '?';
      }else{
        searchUrl += '&';
      }
      searchUrl += 'dateFrom=' + searchObj.dateFrom;
      counter++;
    }

    if(searchObj.dateTo){
      console.log('dateTo', searchObj.dateTo);
      if(counter == 0){
        searchUrl += '?';
      }else{
        searchUrl += '&';
      }
      searchUrl += 'dateTo=' + searchObj.dateTo;
      counter++;
    }

    if(searchObj.shops){
      console.log('shops', searchObj.shops);
      if(counter == 0){
        searchUrl += '?';
      }
      for(let id of searchObj.shops){
        searchUrl += '&shops[]=' + id;
      }
      counter++;
    }

    if(searchObj.products){
      console.log('products', searchObj.products);
      if(counter == 0){
        searchUrl += '?';
      }
      for(let id of searchObj.products){
        searchUrl += '&products[]=' + id;
      }
      counter++;
    }

    if(searchObj.tags){
      console.log('tags', searchObj.tags);
      if(counter == 0){
        searchUrl += '?';
      }
      for(let id of searchObj.tags){
        searchUrl += '&tags[]=' + id;
      }
      counter++;
    }

    if(searchObj.sort){
      console.log('sort', searchObj.sort);
      if(counter == 0){
        searchUrl += '?';
      }else{
        searchUrl += '&';
      }
      searchUrl += 'sort=' + searchObj.sort;
      counter++;
    }else{ 
      if(counter == 0){
        searchUrl += '?';
      }else{
        searchUrl += '&';
      }
      searchUrl += 'sort=price|ASC';
    }

    var result = this.http.get(searchUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'json/application'
      })
    });
    return result;
  };
}
