import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-on-map',
  templateUrl: './show-on-map.component.html',
  styleUrls: ['./show-on-map.component.css']
})
export class ShowOnMapComponent implements OnInit {

  @Input() selectedShop;

  constructor() { }

  private shopLng;
  private shopLat;
  private initZoom: number;

  ngOnInit() {
    console.log(this.selectedShop);
    this.shopLng = this.selectedShop.lng;
    this.shopLat = this.selectedShop.lat;
    this.initZoom = 14;
  }

}
