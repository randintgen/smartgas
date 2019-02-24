import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductSearch } from '../interfaces/product-search';
import { ProductResponse } from '../interfaces/product-response';
import { StandardResponse } from '../interfaces/standard-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'https://localhost:8765/observatory/api/';

  getProducts(start?: number, count?: number, status?: string, sort?:string): Observable<ProductSearch>{

    var getProductsUrl = this.baseUrl + 'products';

    if(start == undefined){
      getProductsUrl += '?start=0';
    }else{
      getProductsUrl += '?start=' + start;
    }

    if(count == undefined){
      getProductsUrl += '&count=20';
    }else{
      getProductsUrl += '&count=' + count;
    }

    if(status == undefined){
      getProductsUrl += '&status=ACTIVE';
    }else{
      getProductsUrl += '&status=' + status;
    }

    if(sort == undefined){
      getProductsUrl += '&sort=id|ASC';
    }else{
      getProductsUrl += '&sort=' + sort;
    }

    var prodSearch = this.http.get<ProductSearch>(
      getProductsUrl,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );

    return prodSearch;
  };

  addProduct(name:string, description: string, category: string, tags: string[]): Observable<ProductResponse>{

    var postProductUrl = this.baseUrl + 'products';

    var postResult = this.http.post<ProductResponse>(
      postProductUrl,
      JSON.stringify({
        name: name,
        description: description,
        category: category,
        tags: tags
      }),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-OBSERVATORY-AUTH': localStorage.getItem('token')
        })
      }
    );

    return postResult;
  };

  getProductId(id: number): Observable<ProductResponse> {

    var getProductId = this.baseUrl + 'products/' + id;

    var getRequest = this.http.get<ProductResponse>(
      getProductId,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );

    return getRequest;
  };

  updateProductId(id: number, name?: string, description?: string, category?: string, tags?: string[]): ProductResponse{

    var updateIdUrl = this.baseUrl + 'products/' + id;

    var toReturn: ProductResponse;

    var previousInfo = this.getProductId(id).subscribe(
      (response) => {
        console.log('hi');
        var prevProd = response;
        var newProd = {};
        
        if(name == undefined) {
          newProd['name'] = prevProd.name;
        }else{
          newProd['name'] = name;
        }

        if(description == undefined) {
          newProd['description'] = prevProd.description;
        }else{
          newProd['description'] = description;
        }

        if(category == undefined) {
          newProd['category'] = prevProd.category;
        }else{
          newProd['category'] = category;
        }

        if(tags == undefined) {
          newProd['tags'] = prevProd.tags;
        }else{
          newProd['tags'] = tags;
        }


        var updateResult = this.http.put<ProductResponse>(updateIdUrl,
            JSON.stringify(newProd), {
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-OBSERVATORY-AUTH': localStorage.getItem('token')
              })
            });
            
        updateResult.subscribe(
          (response) => {
            toReturn = response;
          }
        )
      }
    );
    return toReturn;
  };

  deleteProduct(id: number): Observable<StandardResponse> {

    var deleteProductUrl = this.baseUrl + 'products/' + id;

    var deleteResult = this.http.delete<StandardResponse>(
      deleteProductUrl,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-OBSERVATORY-AUTH': localStorage.getItem('token')
        })
      }
    );

    return deleteResult;
  };
}