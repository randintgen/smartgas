import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


import { UserService } from '../../services/user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  private errorMessage: string;

  constructor(
    private userService: UserService,
    private form: FormBuilder,
    private modalService: NgbModal
  ) { }

  private registerForm = this.form.group({
    "username": [''],
    "password": [''],
    "pass-repeat": [''],
    "email": ['']
  });

  ngOnInit() {
  }

  private registerAttempt(): void {
    var username = this.registerForm.controls['username'].value;
    var pass1 = this.registerForm.controls['password'].value;
    var pass2 = this.registerForm.controls['pass-repeat'].value;
    var email = this.registerForm.controls['email'].value;

    if(pass1 === pass2) {
      this.userService.registerUser(username, pass1, email).subscribe(
        (response) => {
          if(!response.success){
            this.errorMessage = response.message;
          }else{
            this.errorMessage = undefined;
          }
        }
      );
    }
  };

  open(content) {
    this.modalService.dismissAll(content);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }


}
