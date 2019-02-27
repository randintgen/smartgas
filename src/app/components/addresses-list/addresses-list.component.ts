import { Component, OnInit } from '@angular/core';
import { SearchFormComponent } from '../search-form/search-form.component';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-addresses-list',
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.css']
})
export class AddressesListComponent implements OnInit {

  constructor(
    private myStorage: LocalStorageService
  ) { }

  private allAdds;
  ngOnInit() {
    this.allAdds = this.myStorage.getFromLocal('adds');
    console.log(this.allAdds);
  }

}
