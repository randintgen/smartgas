import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UserService } from '../../../services/user.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-username',
  templateUrl: './new-username.component.html',
  styleUrls: ['./new-username.component.css']
})
export class NewUsernameComponent implements OnInit {

  @Output() check = new EventEmitter<any>(false);

  constructor(
    private myStorage: LocalStorageService,
    private userService: UserService,
    private form: FormBuilder,
    private route: Router
  ) { }

  private changeForm = this.form.group({
    'new-username': ['']
  });

  ngOnInit() {
  }

  submit() {
    var newUsername = this.changeForm.controls['new-username'].value;
      this.userService.userChUsername(
        newUsername
        ).subscribe(
          (response) => {
            this.myStorage.storeOnLocal('username', newUsername);
            this.check.emit(true);
            this.route.navigateByUrl('/');
          },
          (error) => {
            console.log(error);
          }
      );
  }

}
