import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { ShopService } from '../../services/shop.service';
import { ShopResponse } from '../../interfaces/shop-response';
import { LocalStorageService } from 'src/app/services/local-storage.service';

export class Shop {
  name?: string;
  id?: number;
  address?: string;
}


@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.css']
})

export class ShopsListComponent implements OnInit {
  
  ready : boolean = false;
  private dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'address', 'tags'];

  constructor(
    private shopService: ShopService,
    private myStorage: LocalStorageService
  ){}

  ngOnInit() {
    var isAdmin = this.myStorage.getFromLocal('isAdmin');
    if(isAdmin == 1){
      this.shopService.getShops(0, 50, 'ALL', 'id|ASC').subscribe(
        (response) => {
          this.ready = true;
          console.log(response);
          this.dataSource = new MatTableDataSource<any>(response.shops);
          this.dataSource.paginator = this.paginator;
        }
      )
    }
    else{
      this.shopService.getShops(0, 50).subscribe(
        (response) => {
          this.ready = true;
          console.log('hello');
          console.log(response);
          this.dataSource = new MatTableDataSource<any>(response.shops);
          this.dataSource.paginator = this.paginator;
        }
      )
    }

  };

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
