import { OnInit, Component, Output } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { EventEmitter } from 'events';
import { BehaviorSubject } from 'rxjs';

export interface Types {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-filters-search',
  templateUrl: './filters-search.component.html',
  styleUrls: ['./filters-search.component.css']
})



export class FiltersSearchComponent implements OnInit {

  private FILTERS="https://imgur.com/FSpNtx1.png";

  public searchResults = new BehaviorSubject(undefined);
  private random = 'hello';

  ngOnInit() {

  }

  options1: FormGroup;
  options2: FormGroup;


  constructor(fb: FormBuilder) {
    this.options1 = fb.group({
      hideLoc: false,
      floatLabel: 'auto',
    });
   
  }

  disabled = false;
  disabled2 = false;


  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  private searchTaken(event: any){
    console.log('in filters search', event);
    this.searchResults.next(event);
  }

}