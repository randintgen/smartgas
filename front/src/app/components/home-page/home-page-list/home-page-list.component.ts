import {Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { SearchService } from '../../../services/search.service';
import { FiltersSearchComponent } from '../filters-search/filters-search.component';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home-page-list',
  templateUrl: './home-page-list.component.html',
  styleUrls: ['./home-page-list.component.css']
})
export class HomePageListComponent implements OnInit {

  private syntagmaSquareLoc = [23.734837, 37.975655];
  private basicResults;
  private dataSource;
  private x;
  private shopsHomePage = new BehaviorSubject(undefined);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'address', 'price', 'shopDist'];
  private binding;


  constructor(
    private searchService: SearchService,
    private search: FiltersSearchComponent
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
        console.log('θελω αυτο!', response);
        this.basicResults = response.prices;
        this.dataSource = new MatTableDataSource<any>(response.prices);
        this.dataSource.paginator = this.paginator;
        this.shopsHomePage.next(response.prices);
      }
    );
  }

  ngAfterViewInit(){
    this.search.searchResults.subscribe(
      (results) => {
        console.log(results);
        if(results !== undefined){
        console.log('wow results!');
        console.log(results);
        this.shopsHomePage.next(results);
        this.dataSource = [];
        this.dataSource = new MatTableDataSource<any>(results);
        this.dataSource.paginator = this.paginator;
        }
      }
    )
  }

}