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
export class InscriptionService {

  constructor(private http:HttpClient) { }

  verificationEmail(str_email:string): Observable<any> {
    return this.http.post(baseUrl+"/inscription/verification", JSON.stringify({email:str_email}), httpOptions);
  }

  verificationPseudo(str_pseudo:string): Observable<any> {
    return this.http.post(baseUrl+"/inscription/verification", JSON.stringify({pseudo:str_pseudo}), httpOptions);
  }

  addUtilisateur(data:any): Observable<any> {
    let url = baseUrl+'/inscription';
    return this.http.post(url, data, httpOptions);
  }
}
