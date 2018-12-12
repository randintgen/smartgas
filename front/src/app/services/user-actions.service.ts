import { Injectable } from '@angular/core';

// import user class and mock-users for dummy interaction
import { User } from '../classes/user';
import { Users } from '../classes/mock-users';

@Injectable({
  providedIn: 'root'
})
export class UserActionsService {

  private users: User[] = Users;

  signInUser(someUser: User): boolean{
    for(let a of this.users){
      if(a.username === someUser.username){
        if(a.password === someUser.password){
          return true;
        }
      }
    }
    return false;
  }

  signUpUser(someUser: User): void{
    this.users.push(someUser);
  }
  constructor() { }
}
