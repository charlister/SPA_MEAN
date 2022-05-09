import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8888';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST,PUT",	  
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",  
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};
@Injectable({
  providedIn: 'root'
})
export class MajCompteService {

  constructor(private http: HttpClient) { }

  majCompte(strObjectId:string, data:any) : Observable<any> {
    let url = baseUrl+'/moncompte/edit/'+strObjectId;
    return this.http.put<any>(url, data);
  }
}
