import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreElementsService {

  constructor() { }

  // function to store element in local storage
  storeElement(key: string, value: string): boolean {
    if(localStorage.getItem(key)){
      return false;
    }else{
      localStorage.setItem(key, value);
      return true;
    }
  };

  // function to remove element from local storage
  removeElement(key: string): boolean {
    if(localStorage.getItem(key)) {
      localStorage.removeItem(key);
      return true;
    }else{
      return false;
    }
  };

  // function to retrieve element from local storage
  getElement(key: string): string {
    if(localStorage.getItem(key)){
      return localStorage.getItem(key);
    }else{
      return undefined;
    }
  };
  

}
