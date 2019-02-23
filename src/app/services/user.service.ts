import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogRegResponse } from '../interfaces/log-reg-response';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = 'https://localhost:8765/observatory/api/';

  constructor(
    private http: HttpClient
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

  loginUser(username: string, password: string): Observable<LogRegResponse> {
    
    var loginUrl = this.baseUrl + 'login';

    var userToLogin = {
      username: username,
      password: password
    };

    var loginResponse = this.http.post<LogRegResponse>(
      loginUrl,
      JSON.stringify(userToLogin),
      httpOptions
    );
    
    return loginResponse;
  };

  logoutUser(): Observable<LogRegResponse> {

    var logoutUrl = this.baseUrl + 'logout';

    var newHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'applications/json',
        'X-OBSERVATORY-AUTH': localStorage.getItem('token')
      })
    };

    console.log(localStorage.getItem('token'));

    var LogoutResponse = this.http.post<LogRegResponse>(
      logoutUrl,
      newHeaders
    );

    return LogoutResponse;
  };
}
