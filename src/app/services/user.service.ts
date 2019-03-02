import { Injectable, Inject } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LogRegResponse } from '../interfaces/log-reg-response';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LocalStorageService } from './local-storage.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  isConnected = new BehaviorSubject(false);
  private baseUrl = 'https://localhost:8765/observatory/api/';

  constructor(
    private http: HttpClient,
    private myStorage: LocalStorageService
  ) { }

  registerUser(username: string, password: string, mail: string): Observable<LogRegResponse> {
    
    var registerUrl = this.baseUrl + 'users/signup';

    var userToRegister = {
      username: username,
      psswd: password,
      mail: mail
    };

    var RegisterResponse = this.http.post<LogRegResponse>(
      registerUrl,
      JSON.stringify(userToRegister),
      httpOptions
    );
    return RegisterResponse
  };

  loginUser(username: string, password: string): Observable<any> {
    
    var loginUrl = this.baseUrl + 'login';

    var userToLogin = {
      username: username,
      password: password
    };

    return this.http.post<LogRegResponse>(
      loginUrl,
      JSON.stringify(userToLogin),
      httpOptions
    );

  };


  logoutUser(): void {

    var logoutUrl = this.baseUrl + 'logout';

    console.log(this.myStorage.getFromLocal('token'));
    this.http.post<LogRegResponse>(
      logoutUrl,
      {
        headers: new HttpHeaders({
          'Content-Type': 'applications/json',
          'X-OBSERVATORY-AUTH': this.myStorage.getFromLocal('token')
        })
      }
    ).subscribe(
      (response) => {
        this.isConnected.next(false);
        console.log('user logged out');
        this.myStorage.removeFromLocal('token');
        this.myStorage.removeFromLocal('username');
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  };

  deleteUser(username: string, password: string): Observable<any>{

    var deleteUserUrl = this.baseUrl + 'users/' + username + '/delete';

    var usDelete = this.http.request('delete', deleteUserUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': this.myStorage.getFromLocal('token')
      }),
      body: JSON.stringify({
        'psswd': password
      })
    });

    return usDelete;
  };

  userChPsswd(username: string, oldPass: string, newPass: string): Observable<any>{
    
    var chPassUrl = this.baseUrl + 'users/' + username + '/newpass';

    var chPass = this.http.put<any>(chPassUrl, JSON.stringify({
      psswd: oldPass,
      newpsswd: newPass
    }), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': this.myStorage.getFromLocal('token')
      })
    });

    return chPass;
  };

  userChUsername(oldUsername: string, newUsername: string): Observable<any>{

    var chUsernameUrl = this.baseUrl + 'users/' + oldUsername + '/newname';

    var newName = this.http.put<any>(chUsernameUrl, JSON.stringify(
      {
      username: newUsername
      }
    ),
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': this.myStorage.getFromLocal('token')
      })});

      return newName;
  }

  getUser(username: string): Observable<any> {

    var getUserUrl = this.baseUrl + 'users/' + username;

    var infoUser = this.http.get<any>(getUserUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': this.myStorage.getFromLocal('token')
      })
    });

    return infoUser;
  };

  changeProfile(username: string, toUpload: File) {

    var uploadProfileUrl = this.baseUrl + 'users/' + username + '/newinfo';
    const uploadData = new FormData();
    uploadData.append('profile', toUpload, username);

    //var request = this.http.post()
  }

}