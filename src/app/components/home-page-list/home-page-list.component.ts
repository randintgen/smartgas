import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-home-page-list',
  templateUrl: './home-page-list.component.html',
  styleUrls: ['./home-page-list.component.css']
})
export class HomePageListComponent implements OnInit {

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
    
  }

}

/*
  ask for:  location -> syntagma
            distance -> 10km
            type -> 1
            sort -> price|ASC

  i show:   shop-name
            shop-tag
            shop-address 
            shop-dist
            price
*/