import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  private isRegistered: boolean;
  private errorMessage: string;
  private successMessage: string;

  constructor(
    private userService: UserService,
    private form: FormBuilder,
  ) { }

  private registerForm = this.form.group({
    "username": [''],
    "password": [''],
    "pass-repeat": [''],
    "email": ['']
  });

  ngOnInit() {
    this.isRegistered = false;
  }

  private registerAttempt(): void {

    var username = this.registerForm.controls['username'].value;
    var pass1 = this.registerForm.controls['password'].value;
    var pass2 = this.registerForm.controls['pass-repeat'].value;
    var email = this.registerForm.controls['email'].value;

    if(pass1 === pass2) {
      this.userService.registerUser(username, pass1, email).subscribe(
        (response) => {
          if(response.success) {
            console
            this.isRegistered = true;
            this.successMessage = response.message;
            console.log(response.message);
          }
        },
        (error) => {
          this.isRegistered = false;
          this.errorMessage = error.error.message;
          console.log(this.errorMessage);
          this.registerForm.reset('');
        }
      );
    }
  };

}
