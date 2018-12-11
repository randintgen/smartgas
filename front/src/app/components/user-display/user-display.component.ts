import { Component, OnInit } from '@angular/core';

// importing the user class in order to know what a user is
import { User } from '../../classes/user';

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
