import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { HttpRequestInterface } from '../../interfaces/http-request';
import { CacheSearch } from '../../interfaces/cache-search';
import { StoreElementsService } from '../../services/store-elements.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username: string;
  private connected: boolean;

  constructor(
    private loginForm: FormBuilder,
    private httpService: HttpService,
    private storeElement: StoreElementsService
  ) { }

  ngOnInit() {
    if(this.storeElement.getElement('username')){
      this.connected = true;
      this.username = this.storeElement.getElement('username');
    }else{
      this.connected = false;
      this.username = '';
    }
  }

  // login form 
  private login = this.loginForm.group({
    'username': ['', Validators.required],
    'password': ['', Validators.required]
  });

  // function to attemp login 
  private loginAttempt(): void {

    // get form values
    var username = this.login.controls['username'].value;
    var password = this.login.controls['password'].value;

    // make an http request to check if user can login
    this.httpService.loginRequest(username, password).subscribe(
      (response) => {
        if(response.success){
          this.username = username;
          this.connected = true;
          this.storeElement.storeElement('username', username);
          this.storeElement.storeElement('token', response.token);
        }
      },
      (error) => {
        console.log('username not found');
      }
    )
  }

  private logoutAttempt(): void {
    this.storeElement.removeElement('username');
    this.storeElement.removeElement('token');
    this.connected = false;
    this.username = undefined;
  }
}
