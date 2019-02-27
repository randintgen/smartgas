import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private form: FormBuilder
  ) { } 

  private loginForm = this.form.group({
    'username': [''],
    'password': ['']
  });

  private username: string;

  ngOnInit() {
  }

  private loginAttempt(): void {

    var username = this.loginForm.controls['username'].value;
    var password = this.loginForm.controls['password'].value;

    this.userService.loginUser(username, password);
  };
  
}
