import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { SearchService } from '../../services/search.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-page-list',
  templateUrl: './home-page-list.component.html',
  styleUrls: ['./home-page-list.component.css']
})
export class HomePageListComponent implements OnInit {

  private syntagmaSquareLoc = [23.734837, 37.975655];
  private basicResults;
  private dataSource;
  private shopsHomePage = new Subject<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'address', 'price', 'shopDist'];
  


  constructor(
    private searchService: SearchService
  ){ }

  ngOnInit() {
    this.searchService.searchShops({
      'geoLng': this.syntagmaSquareLoc[0],
      'geoLat': this.syntagmaSquareLoc[1],
      'geoDist': 20,
      'products': [1],
      'sort': 'price|ASC'
    }).subscribe(
      (response) => {
        this.basicResults = response.prices;
        this.dataSource = new MatTableDataSource<any>(response.prices);
        this.dataSource.paginator = this.paginator;
        this.shopsHomePage.next(response.prices);
      }
    );
  }

}