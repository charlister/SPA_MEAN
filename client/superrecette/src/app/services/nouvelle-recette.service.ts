import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8888';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST",	  
    "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Request-With",  
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable({
  providedIn: 'root'
})
export class NouvelleRecetteService {

  constructor(private http: HttpClient) { }

  addRecette(data:any) : Observable<any> {
    let url = baseUrl+'/mesrecettes/creation';
    return this.http.post(url, data, httpOptions);
  }
}
