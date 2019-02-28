import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

export interface Alysida {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.css']
})
export class EditShopComponent implements OnInit {

  constructor(
    private form: FormBuilder
  ) { }

  private editShopForm = this.form.group({
    'name': [''],
    'address': [''],
    'city': [''],
    'tk': [''],
    'tags': ['']
  });

  alysides: Alysida[] = [
    {value: 'alysida-0', viewValue: 'JETOIL'},
    {value: 'alysida-1', viewValue: 'Shell'},
    {value: 'alysida-2', viewValue: 'ETEKA'},
    {value: 'alysida-3', viewValue: 'AVIN'},
    {value: 'alysida-4', viewValue: 'AEGEAN'},
    {value: 'alysida-5', viewValue: 'EKO'},
    {value: 'alysida-6', viewValue: 'REVOIL'},
    {value: 'alysida-7', viewValue: 'BP'},
    {value: 'alysida-8', viewValue: 'ΕΛΙΝΟΙΛ'},
    {value: 'alysida-9', viewValue: 'DRACOIL'},
    {value: 'alysida-10', viewValue: 'CYCLON'},
    {value: 'alysida-11', viewValue: 'KMOIL'},
    {value: 'alysida-12', viewValue: 'EL-PETROIL'},
    {value: 'alysida-13', viewValue: 'ΑΡΓΩ'},
    {value: 'alysida-14', viewValue: 'KAOIL'},
    {value: 'alysida-15', viewValue: 'MEDOIL'},
    {value: 'alysida-16', viewValue: 'ΤΡΙΑΙΝΑ'},
    {value: 'alysida-17', viewValue: 'CRETA PETROL'},
    {value: 'alysida-18', viewValue: 'WIN'},
    {value: 'alysida-19', viewValue: 'FISIKON'},
    {value: 'alysida-20', viewValue: 'VALIN'},
    {value: 'alysida-21', viewValue: 'Silkoil'},
    {value: 'alysida-22', viewValue: 'Α.Π.'},
    {value: 'alysida-23', viewValue: 'Άλλο'}
  ];

  ngOnInit() {
  }

  private editShopAttempt(): void {

    var shopName = this.editShopForm.controls['name'].value;
    var shopAdd = this.editShopForm.controls['address'].value
                  +", "+this.editShopForm.controls['city'].value
                  +", "+this.editShopForm.controls['tk'].value;
    var shopTags = this.editShopForm.controls['tags'].value;

    
  }
}
