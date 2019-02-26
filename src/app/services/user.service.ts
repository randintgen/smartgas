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

  loginUser(username: string, password: string): void {
    
    var loginUrl = this.baseUrl + 'login';

    var userToLogin = {
      username: username,
      password: password
    };

    this.http.post<LogRegResponse>(
      loginUrl,
      JSON.stringify(userToLogin),
      httpOptions
    ).subscribe(
      (response) => {
        this.myStorage.storeOnLocal('username', username);
        this.myStorage.storeOnLocal('token', response.token);
        console.log(this.myStorage.getFromLocal('token'));
        this.isConnected.next(true);
      },
      (_) => {
        this.isConnected.next(false);
      }
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
}
