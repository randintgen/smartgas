import { OnInit, Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';

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

}