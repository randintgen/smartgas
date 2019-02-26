import { Injectable, Inject } from '@angular/core';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    @Inject(LOCAL_STORAGE)
    private storageService: StorageService
  ) { }

  storeOnLocal(key: any, value: any): void {
    this.storageService.set(key, value);
  }

  getFromLocal(key: any): any {
    return this.storageService.get(key);
  }

  removeFromLocal(key: any): void {
    this.storageService.remove(key);
  }

  clearLocal(): void {
    this.storageService.clear();
  }
}
