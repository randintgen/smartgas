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


  logoutUser(): Observable<any>{

    var logoutUrl = this.baseUrl + 'logout';

    let newHeaders = new HttpHeaders();
    newHeaders = newHeaders.set('Content-Type', 'text/plain')
      .set('X-OBSERVATORY-AUTH', this.myStorage.getFromLocal('token'))

    var logoutResponse = this.http.request('post', logoutUrl, {
      headers: newHeaders
    });
    return logoutResponse;
  };

  deleteUser(username: string, password: string): Observable<any>{

    var deleteUserUrl = this.baseUrl + 'users/' + username + '/delete';
    
    var usDelete = this.http.request('delete', deleteUserUrl, {
      headers: new HttpHeaders({
        'X-OBSERVATORY-AUTH': this.myStorage.getFromLocal('token'),
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        'psswd': password
      })
    });

    return usDelete;
  };

  userChPsswd( oldPass: string, newPass: string): Observable<any>{
    
    var chPassUrl = this.baseUrl + 'users' + '/newpass';

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

  userChUsername(newUsername: string): Observable<any>{

    var chUsernameUrl = this.baseUrl + 'users' + '/newname';

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

  getUser(): Observable<any> {

    var getUserUrl = this.baseUrl + 'users/myprofile';

    var infoUser = this.http.get<any>(getUserUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': this.myStorage.getFromLocal('token')
      })
    });

    return infoUser;
  };

  changeProfile(username: string, toUpload: File) {

    var uploadProfileUrl = this.baseUrl + 'users' + '/newinfo';
    const uploadData = new FormData();
    uploadData.append('profile', toUpload);

    //var request = this.http.post()
  }

  getHistory(): Observable<any>{
    
    const historyUrl = this.baseUrl + 'prices/myposts';
    
    var history = this.http.request('get', historyUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': this.myStorage.getFromLocal('token')
      })
    });

    return history;
  }

  userDeleteShop(id: number): Observable<any> {

    var deleteShopUrl = this.baseUrl + 'prices/' + id;

    var delResult = this.http.request('delete', deleteShopUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': this.myStorage.getFromLocal('token')
      }
    });

    return delResult;
  }

  verify(id: number, userid: number): Observable<any>{

    var verifyUrl = this.baseUrl + 'verify?id=' + id + '&userid=' + userid;
    var req = this.http.get(verifyUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });

    return req;
  }

}
