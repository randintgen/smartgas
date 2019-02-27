import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginUserComponent } from '../login-user/login-user.component';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private isConnected: boolean;
  private usernameConnected: string;

  constructor(
    private openedDialog: MatDialog,
    private userService: UserService,
    private myStorage: LocalStorageService
  ) { }

  ngOnInit() {

    this.userService.isConnected.subscribe(
      (response) => {
        this.isConnected = response;
        this.usernameConnected = this.myStorage.getFromLocal('username');
      },
      (_) => {
        this.isConnected = false;
      }
    )
  }

  openLogin(): void {
    const dialogRef = this.openedDialog.open(LoginUserComponent, {
      width: '300px',
    });
  };

  openRegister(): void {
    const dialogRef = this.openedDialog.open(RegisterUserComponent, {
      width: '300px',
    });
  };

  logoutUser(): void {
    this.isConnected = false;
    this.userService.logoutUser();
  }

  myFunction(): void {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  do(): void {
    console.log(this.myStorage.getFromLocal('token'));
    this.myStorage.removeFromLocal('token');
    console.log(this.myStorage.getFromLocal('token'));
  }
}
