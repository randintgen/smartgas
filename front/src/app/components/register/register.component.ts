import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { StoreElementsService } from '../../services/store-elements.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private connected: boolean;

  constructor(
    private registerForm: FormBuilder,
    private storeElement: StoreElementsService,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    if(!this.storeElement.getElement('username')){
      this.connected = false;
    }else{
      this.connected = true;
    }
  }

  private register = this.registerForm.group({
    'username': ['', Validators.required],
    'password': ['', Validators.required],
    'email': ['', Validators.required]
  });

  private registerAttempt(): void {
    var username = this.register.controls['username'].value;
    var password = this.register.controls['password'].value;
    var email = this.register.controls['email'].value;

    this.httpService.registerRequest(username, password, email).subscribe(
      (response) => {
        if(response.success){
          this.connected = true;
          this.storeElement.storeElement('username', username);
          this.storeElement.storeElement('token', response.token);
        }else{
          this.connected = false;
        }
      },
      (error) => {
        console.log("username already exists");
      }
    )
  }

  private reset(): void{
    console.log(this.storeElement.getElement('username'));
    this.storeElement.removeElement('username');
    this.storeElement.removeElement('token');
  }
}
