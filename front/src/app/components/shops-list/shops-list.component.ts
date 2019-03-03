import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { ShopService } from '../../services/shop.service';
import { ShopResponse } from '../../interfaces/shop-response';

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
  
  ready : boolean =false;
  private dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'address'];

  constructor(
    private shopService: ShopService
  ){}

  ngOnInit() {
    this.shopService.getShops().subscribe(
      (response) => {
        this.ready=true;
        console.log(response);
        this.dataSource = new MatTableDataSource<any>(response.shops);
        this.dataSource.paginator = this.paginator;
      }
    )
  };

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
