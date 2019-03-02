import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private myStorage: LocalStorageService
  ) { }

  private userInfo; 

  ngOnInit() {

    var username = this.route.snapshot.paramMap.get('name');

    this.userService.getUser(username).subscribe(
      (accept) => {
        this.userInfo = accept.user;
      },
      (error) => {
        alert('No user');
      }
    )
  }

}
