import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { UserService } from '../../../services/user.service';

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
    private userService: UserService
  ) { }

  ngOnInit() {
    console.log('new user!');
    this.userService.getHistory().subscribe(
      (response) => {
        console.log(response);
        this.dataSource = new MatTableDataSource(response.prices);
        this.dataSource.sort = this.sort;
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestry() {
    console.log('byeee');
  }

}
