import { Component, OnInit } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import * as equal from 'deep-equal';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';

declare var google: any;

@Component({
  selector: 'app-marker-on-map',
  templateUrl: './marker-on-map.component.html',
  styleUrls: ['./marker-on-map.component.css']
})
export class MarkerOnMapComponent implements OnInit {

  constructor(
    private myStorage: LocalStorageService
  ) { }



  private all: any;
  private idx: number;

  ngOnInit() {
    const provider = new OpenStreetMapProvider();
    const results = provider.search({ query: 'Φλέμινγκ, Αθήνα' }).then(
      (response) => {
        this.all = response;
        this.myStorage.storeOnLocal('addresses', response);
      }
    );
  }

  keep(obj: any) {
    this.idx = this.all.findIndex(x => equal(x, obj));
    this.myStorage.storeOnLocal('selectedMarker', this.idx);
  }
}
