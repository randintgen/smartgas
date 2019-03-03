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

  ngOnInit() {

    var username = this.route.snapshot.paramMap.get('name');
    var realUsername = this.myStorage.getFromLocal('username');

    if(realUsername !== username) {
      this.router.navigateByUrl('');
    }else if(!realUsername){
      this.router.navigateByUrl('');
    }
    this.userService.getUser().subscribe(
      (accept) => {
        this.userInfo = accept.user;
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
