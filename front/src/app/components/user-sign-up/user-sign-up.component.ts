import { Component, OnInit } from '@angular/core';

// importing modules to handle forms
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';

// importing user and user-service
import { User } from '../../classes/user';
import { UserActionsService } from '../../services/user-actions.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {

  private userToSignUp: User;
  private isOk: boolean;

  // making the sign up form
  signUpForm = this.form.group({
    username: ['', Validators.required],
    mail: ['', Validators.required],
    pass1: ['', Validators.required],
    pass2: ['', Validators.required],
    location: ['']
  });

  constructor(
    // injecting users service and form-builder
    private userService: UserActionsService,
    private form: FormBuilder
  ) { }

  ngOnInit() {
    console.log('works');
  }

  // validation function
  validateAndSend(): void{
    const username = this.signUpForm.controls['username'].value;
    const pass1 = this.signUpForm.controls['pass1'].value;
    const pass2 = this.signUpForm.controls['pass2'].value;
    const mail = this.signUpForm.controls['mail'].value;
    const location = this.signUpForm.controls['location'].value;
    
    if(pass1 !== pass2){
      console.log('passwords do not match');
      this.isOk = false;
    }else{  
      this.isOk = true;
    }

    this.userToSignUp = {
      username: username,
      password: pass1,
      email: mail,
      location: location
    }
    
    this.userService.signUpUser(this.userToSignUp);
    console.log(this.isOk);
  }
}
