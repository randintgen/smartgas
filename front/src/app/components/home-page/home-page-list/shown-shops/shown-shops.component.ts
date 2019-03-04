import { Component, OnInit, Input, ContentChildren } from '@angular/core';
import { ShopsListComponent } from '../../../shops-list/shops-list.component';

@Component({
  selector: 'app-shown-shops',
  templateUrl: './shown-shops.component.html',
  styleUrls: ['./shown-shops.component.css']
})
export class ShownShopsComponent implements OnInit {

  @Input() shopsToShow;

  private initLat = 37.975764;
  private initLng = 23.734821;
  private initZoom = 14;
  private allShops;

  private show: boolean = false;
  private ok: boolean = false;

  constructor() { }

  ngOnInit() {
    this.initLat = 37.975764;
    this.initLng = 23.734821;
    this.initZoom = 14;
    this.shopsToShow.subscribe(
      (response) => {
          if(response !== undefined){
          console.log('apantisi', response);
          if(response.length > 0){
            this.ok = true;
            console.log(response);
            this.initLat = parseFloat(response[0].shopLat);
            this.initLng = parseFloat(response[0].shopLng);
            this.allShops = response;
          }else {
            this.allShops = [];
            this.ok = false;
          }
        }
      },
      (error) => {
        console.log('malakia', error);
      });
  }

  do() {
    this.show = true;
    console.log('hi');
  }

}
