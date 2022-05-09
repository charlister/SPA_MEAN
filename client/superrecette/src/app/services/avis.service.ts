import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Avis } from '../models/avis.model';

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
export class AvisService {

  constructor(private http: HttpClient) { }

  saveAvis(avis:Avis) : Observable<any>{
    let url = baseUrl+'/avis/enregistrement';
    return this.http.post(url, avis, httpOptions);
  }
}
