import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-addresses-list',
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.css']
})
export class AddressesListComponent implements OnInit {

  private results;

  constructor(
    private myStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.results = this.myStorage.getFromLocal('addresses');
    console.log(this.results);
  }

}
