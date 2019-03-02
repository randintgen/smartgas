import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-prices-ofshop',
  templateUrl: './add-prices-ofshop.component.html',
  styleUrls: ['./add-prices-ofshop.component.css']
})
export class AddPricesOfshopComponent implements OnInit {

  constructor(
    private form: FormBuilder
  ) { }

  private addForm = this.form.group({
    t1: [''],
    t2: [''],
    t3: [''],
    t4: [''],
    t5: [''],
    t6: ['']
  });
  ngOnInit() {
  }

}
