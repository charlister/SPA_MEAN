import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const baseUrl = 'http://localhost:8888';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST",	  
    "Access-Control-Allow-Headers": "Content-type",  
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  })
};

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  public utilisateur:Subject<string> = new BehaviorSubject<string>("");

  constructor(private http:HttpClient) { 
  }

  getUtilisateur() {
    return this.utilisateur;
  }

  connexion(data:string) {
    this.utilisateur.next(data);
  }

  deconnexion() {
    this.utilisateur.next("");
  }

  verificationConnexion(identifiants:any): Observable<any> {
    return this.http.post(baseUrl+"/connexion", JSON.stringify(identifiants), httpOptions);
  }

  verificationEmail(str_email:string): Observable<any> {
    return this.http.post(baseUrl+"/connexion", JSON.stringify({email:str_email}), httpOptions);
  }

  verificationPseudo(str_pseudo:string): Observable<any> {
    return this.http.post(baseUrl+"/connexion", JSON.stringify({pseudo:str_pseudo}), httpOptions);
  }
}