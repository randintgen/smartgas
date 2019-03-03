import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-myhistory',
  templateUrl: './myhistory.component.html',
  styleUrls: ['./myhistory.component.css']
})
export class MyhistoryComponent implements OnInit {

  private dataSource;
  private allResults;
  private count;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['date','shopName','shopAddress','type','description','price','delete'];


  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private myStorage: LocalStorageService
  ) { }

  ngOnInit() {
    console.log('new user!');
    this.userService.getHistory().subscribe(
      (response) => {
        this.count = response.prices.length;
        this.dataSource = new MatTableDataSource(response.prices);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.allResults = response.prices;
        console.log(this.allResults);
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deletePost(id: any){ 

    this.userService.userDeleteShop(id).subscribe(
      (response) => {
        console.log(response);
        var counter = 0;
        for(let post of this.allResults){
          if(post.postid === id){
           this.allResults.splice(counter, 1);
          }
          counter += 1;
        }
        console.log(this.allResults);
        this.dataSource = new MatTableDataSource(this.allResults);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

}
