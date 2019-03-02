import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

@Component({
  selector: 'app-myhistory',
  templateUrl: './myhistory.component.html',
  styleUrls: ['./myhistory.component.css']
})
export class MyhistoryComponent implements OnInit {

  private dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['date','shopName','shopAddress','type','description','price','delete'];


  constructor(
    
  ) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
