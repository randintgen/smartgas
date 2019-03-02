import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private form: FormBuilder,
    private userService: UserService
  ) { }

  private changePassForm = this.form.group({
    'oldPass': [''],
    'newPass': ['']
  });

  ngOnInit() {
  }

  changePass() {
    var username = this.route.snapshot.paramMap.get('name');
    var oldPass = this.changePassForm.controls['oldPass'].value;
    var newPass = this.changePassForm.controls['newPass'].value;
    this.userService.userChPsswd(username, oldPass, newPass).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }

}
