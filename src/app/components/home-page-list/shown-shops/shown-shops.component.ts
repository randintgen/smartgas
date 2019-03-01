import { Component, OnInit, Input, ContentChildren } from '@angular/core';
import { AgmInfoWindow } from '@agm/core/directives/info-window';
import { ShopsListComponent } from '../../shops-list/shops-list.component';

@Component({
  selector: 'app-shown-shops',
  templateUrl: './shown-shops.component.html',
  styleUrls: ['./shown-shops.component.css']
})
export class ShownShopsComponent implements OnInit {

  @Input() shopsToShow;
  @ContentChildren(AgmInfoWindow)

  private initLat;
  private initLng;
  private initZoom;
  private allShops;
  private show: boolean = false;
  private ok: boolean = false;

  constructor() { }

  ngOnInit() {
    this.shopsToShow.subscribe(
      (response) => {
        console.log(response);
        this.ok = true;
        this.initLat = response[0].shopLat;
        this.initLng = response[0].shopLng;
        this.allShops = response;
        this.initZoom = 12;
      }
    );
  }

  do() {
    this.show = true;
    console.log('hi');
  }

}
