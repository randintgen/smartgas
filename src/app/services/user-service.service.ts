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

export class UserServiceService {

  private baseUrl = 'https://localhost:8765/observatory/api/';

  constructor(
    private http: HttpClient
  ) { }

  registerUser(username: string, password: string, mail: string): Observable<LogRegResponse> {
    
    var registerUrl = this.baseUrl + 'users/signup';

    var userToRegister = {
      username: username,
      password: password,
      mail: mail
    };

    var RegisterResponse = this.http.post<LogRegResponse>(
      registerUrl,
      JSON.stringify(userToRegister),
      httpOptions
    );
    return RegisterResponse
  };
}
