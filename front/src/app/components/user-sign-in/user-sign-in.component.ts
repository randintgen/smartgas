import { Component, OnInit } from '@angular/core';

// importing FormBuilder to make basic sign in form, form-group to 
// organize the form in a group and form-control for obvious reason
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

// import the form validators
import { Validators } from '@angular/forms';

// importing the user class in order to know what a user is
import { User } from '../../classes/user';

// import the users service
import { UserActionsService } from '../../services/user-actions.service';

@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.component.html',
  styleUrls: ['./user-sign-in.component.css']
})

export class UserSignInComponent implements OnInit {

  // private user that wants to sign in
  private userToSignIn: User;

  private accessOk: boolean;

  // declaring the form structure, we only need username and password
  signInForm = this.form.group({
    // username and password should be given
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  // inject user-service
  constructor(
    private userService: UserActionsService,
    // inject form-builder service
    private form: FormBuilder
  ) { }

  ngOnInit() {
  }

  log(): void {
    // logging user's input
    console.log(this.signInForm.controls['username'].value + 
    " " + this.signInForm.controls['password'].value);
  }

  // function that validates the user input
  validateAndSend(): void {

    // reading username and password
    this.userToSignIn = {
    username: this.signInForm.controls['username'].value,
    password: this.signInForm.controls['password'].value,
    email: ''
    }
    console.log(this.userToSignIn);
    this.accessOk = this.userService.signInUser(this.userToSignIn);
    console.log(this.accessOk);
  }
}
