import { Component, OnInit } from '@angular/core';
 
/* AIzaSyBe4CMJoauhV-5CT98i1tTsf2563iG39_4 */

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
 
  lat1: number;
  lat2: number;
  lng1: number;
  lng2: number;

  ngOnInit() {
    this.lat1 = 37.927390;
    this.lat2 = 37.927495;
    this.lng1 = 23.729956;
    this.lng2 = 23.731126;
  }

}