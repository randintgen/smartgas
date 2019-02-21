import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { HttpRequestInterface } from '../interfaces/http-request';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})

export class HttpService {

  private baseUrl = 'http://localhost:8765/observatory/api/';
  constructor(
    private http: HttpClient
  ) { }

  hello(): void {
    console.log("hello");
  };

  // sign in request to server 
  loginRequest(username: string, password: string): Observable<HttpRequestInterface>{
    var loginUrl = this.baseUrl + 'users/login';
    var loginJSON = JSON.stringify(
      {
        username: username,
        psswd: password
      }
    );
    var httpRequest = this.http.post<HttpRequestInterface>(loginUrl, loginJSON, httpOptions);
    return httpRequest;
  };

  // register request to server
  registerRequest(username: string, password: string, email: string): Observable<HttpRequestInterface>{
    var registerUrl = this.baseUrl + 'users/signup';
    var registerJSON = JSON.stringify(
      {
        mail: email,
        username: username,
        psswd: password
      }
    );
    var httpRequest = this.http.post<HttpRequestInterface>(registerUrl, registerJSON, httpOptions);
    return httpRequest;
  };

  // should change to find shops, not products
  getShops(start?: number, count?: number, status?: string, sort?: string): Observable<HttpRequestInterface> {
    var getShopsUrl = this.baseUrl + 'products?';
    if(start == undefined){
      getShopsUrl += 'start=0';
    }else{
      getShopsUrl += 'start=' + start;
    }
    if(count == undefined){
      getShopsUrl += '&count=20';
    }else{
      getShopsUrl += '&count=' + count;
    }
    if(status == undefined){
      getShopsUrl += '&status=ACTIVE';
    }else{
      getShopsUrl += '&status=' + status;
    }
    if(sort == undefined){
      getShopsUrl += '&sort=id|ASC';
    }else{
      getShopsUrl += '&sort=' + 'sort';
    }

    var httpRequest = this.http.get<HttpRequestInterface>(getShopsUrl, httpOptions);
    return httpRequest;
  };


  getProducts(start?: number, count?: number, status?: string, sort?: string): Observable<HttpRequestInterface> {
    var getShopsUrl = this.baseUrl + 'products?';
    if(start == undefined){
      getShopsUrl += 'start=0';
    }else{
      getShopsUrl += 'start=' + start;
    }
    if(count == undefined){
      getShopsUrl += '&count=20';
    }else{
      getShopsUrl += '&count=' + count;
    }
    if(status == undefined){
      getShopsUrl += '&status=ACTIVE';
    }else{
      getShopsUrl += '&status=' + status;
    }
    if(sort == undefined){
      getShopsUrl += '&sort=id|ASC';
    }else{
      getShopsUrl += '&sort=' + 'sort';
    }

    var httpRequest = this.http.get<HttpRequestInterface>(getShopsUrl, httpOptions);
    return httpRequest;
  }
}
