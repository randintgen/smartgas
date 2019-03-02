import { Injectable } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor() { }

  searchByAddress(address: string): any {

    var provider = new OpenStreetMapProvider();

    var results = provider.search({
      query: address
    });

    return results;
  }
}
