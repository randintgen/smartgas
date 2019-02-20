import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../services/http.service';
import { StoreElementsService } from '../../services/store-elements.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.css']
})
export class ShopsListComponent implements OnInit {

  private allShops;
  private startingIdx: number;
  private countIdx: number;
  private total: number;
  private current: number;

  constructor(
    private httpService: HttpService,
    private storeElement: StoreElementsService,
    private pRows: FormBuilder
  ) { }

  ngOnInit() {
    this.startingIdx = 0;
    this.countIdx = 5;
    this.current = 5;
    this.loadShops();
  }

  private pPage =this.pRows.group({
    'offset': ['2']  
  });

  loadShops(): void {

    var request = new Promise((resolve, reject) => {
      this.httpService.getShops(this.startingIdx, this.countIdx).subscribe(
        (response) => {
          this.allShops = response;
          this.total = this.allShops.total;
        }
      );
    });
  };

  nextShops(): void {
    this.startingIdx += this.countIdx;
    this.current += 5;
    if(this.current > this.total){
      this.current = this.total;
    }
  };

  prevShops(): void {
    this.startingIdx -= this.countIdx;
    this.current -=5;
    if(this.current < 0) {
      this.current = 0;
    }
  };

}
