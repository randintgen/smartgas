import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private basicUrl = 'https://localhost:8765/observatory/api/';

  constructor(
    private http: HttpClient,
    private myStorage: LocalStorageService
  ) { }

  addPost(objAdd): Observable<any>{

    var addUrl = this.basicUrl + 'prices';

    objAdd.dateFrom = objAdd.date;
    objAdd.dateTo = objAdd.date;

    console.log('gine kommotis', objAdd);
    var addResult = this.http.request('post', addUrl,{
      body: JSON.stringify(objAdd),
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': this.myStorage.getFromLocal('token')
      })
    });
    /*
    var addResult = this.http.post(addUrl, JSON.stringify(objAdd), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-OBSERVATORY-AUTH': this.myStorage.getFromLocal('token')
      })
    }); 
*/
    return addResult;
  };

}
