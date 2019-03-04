import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  private inputSearch;
  constructor() { }

  ngOnInit() {
  }

  private searchTaken(event: any) {
    console.log(event);
  }

}
