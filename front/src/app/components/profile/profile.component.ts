import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private myStorage: LocalStorageService
  ) { }

  private userInfo; 
  private username: string;
  private isAdmin;
  private hasPosts=true;
  private usernameChange = false;

  ngOnInit() {

    this.username = this.route.snapshot.paramMap.get('name');
    var realUsername = this.myStorage.getFromLocal('username');

    if(realUsername !== this.username) {
      this.router.navigateByUrl('');
    }else if(!realUsername){
      this.router.navigateByUrl('');
    }
    this.userService.getUser().subscribe(
      (accept) => {
        this.userInfo = accept.user;
        console.log(this.userInfo);
        this.isAdmin = this.myStorage.getFromLocal('isAdmin');
      },
      (error) => {
        console.log(error);
      }
    )
  };

  newEntry(hasChanged) {
    console.log('OK');
    if(!hasChanged){
      return;
    }
    this.username = this.myStorage.getFromLocal('username');
  };

}
