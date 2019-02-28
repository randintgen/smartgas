import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { SearchService } from '../../services/search.service';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-home-page-list',
  templateUrl: './home-page-list.component.html',
  styleUrls: ['./home-page-list.component.css']
})
export class HomePageListComponent implements OnInit {

  private syntagmaSquareLoc = [23.734837, 37.975655];
  private basicResults;
  private dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'type', 'address', 'price'];
  


  constructor(
    private searchService: SearchService
  ){ }

  ngOnInit() {
    this.searchService.searchShops({
      'geoLat': this.syntagmaSquareLoc[0],
      'geoLng': this.syntagmaSquareLoc[1],
      'geoDist': 10,
      'products': [1],
      'sort': 'price|ASC'
    }).subscribe(
      (response) => {
        console.log(response);
        this.basicResults = response.prices;
        this.dataSource = new MatTableDataSource<any>(response.prices);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

}