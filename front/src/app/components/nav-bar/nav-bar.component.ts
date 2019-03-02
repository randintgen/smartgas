import { LocalStorageService } from '../../services/local-storage.service';
import { Component, OnInit, Output, Inject, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { UserService } from '../../services/user.service';
import * as decode from 'jwt-decode';

export interface userInfo {
  username: string;
  password: string;
  passrepeat: string;
  mail?: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit {

  private isConnected = false;
  private username: string;

  constructor(
    private userService: UserService,
    private myStorage: LocalStorageService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    if(this.myStorage.getFromLocal('username')){
      this.username = this.myStorage.getFromLocal('username');
      this.isConnected = true;
    }
  }

  openLogin(): void {
    var loginRef = this.dialog.open(LoginUserComponent, {
      width: '300px',
      data: {
        username: '',
        password: ''
        }
    });

    loginRef.afterClosed().subscribe(
      (response) => {
        this.username = response.username;
        this.userService.loginUser(response.username, response.password).subscribe(
          (response) => {
            this.myStorage.storeOnLocal('username', this.username);
            this.myStorage.storeOnLocal('token', response.token);
            this.myStorage.storeOnLocal('token-decode', decode(response.token));
            this.isConnected = true;
          },
          (error) => {
            this.isConnected = false;
          }
        );
      }
    );
  }

  openRegister(): void {
    var registerRef = this.dialog.open(RegisterUserComponent, {
      width: '300px',
      data : {
        username: '',
        password: ''
      }
    });

    registerRef.afterClosed().subscribe(
      (response) => {
        if(response.password === response.passrepeat){
          this.userService.registerUser(response.username, response.password, response.email).subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              this.isConnected = false;
            }
          )
        }
      }
    );
  }

  logout(): void {

    this.userService.logoutUser().subscribe(
      (response) => {
        this.myStorage.removeFromLocal('username');
        this.myStorage.removeFromLocal('token');
        this.isConnected = false;
      },  
      (error) => {
        console.log(error.error.message);
      }
    );

  }

  myFunction(): void {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

}

@Component({
  selector: 'app-login-user',
  templateUrl: 'login-user.component.html'
})

export class LoginUserComponent {

  constructor(
    private form: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: userInfo
  ) { } 

  private loginForm = this.form.group({
    'username': [''],
    'password': ['']
  }); 
}

@Component({
  selector: 'app-register-user',
  templateUrl: 'register-user.component.html'
})

export class RegisterUserComponent {
  
  constructor(
    private form: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: userInfo
  ){}

  private registerForm = this.form.group({
    'username': [''],
    'password': [''],
    'pass-repeat': [''],
    'email': ['']
  }); 
}