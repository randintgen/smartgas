import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { ShopService } from '../../services/shop.service';
import { ShopResponse } from 'src/app/interfaces/shop-response';

export class Shop {
  name?: string;
  id?: number;
  address?: string;
}

/**
 * @title Basic use of `<table mat-table>`
 */

@Component({
  selector: 'app-shops-list',
  templateUrl: './shops-list.component.html',
  styleUrls: ['./shops-list.component.css']
})

export class ShopsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'address'];

  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private shopService: ShopService
  ){}

  ngOnInit() {
    this.shopService.getShops().subscribe(
      (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource<Shop>(response.products);
        this.dataSource.paginator = this.paginator;

      }
    )
  };

}
