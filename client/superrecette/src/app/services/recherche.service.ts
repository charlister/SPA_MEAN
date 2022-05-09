import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

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
export class RechercheService {
  constructor(private http: HttpClient) { }

  getRecettes() : Observable<any>{
    let url = baseUrl+'/default';
    console.log("getRecettes() (recherche.service.ts) : "+url);
    return this.http.get(url);
  }

  // getRecettesByObjectId(id:string) : Observable<any>{
  //   let url = baseUrl+'/recette/'+id;
  //   console.log("getRecettesByObjectId() (recherche.service.ts) : "+url);
  //   return this.http.get(url)
  // }

  // getRecettesByKeyword(keyword:string) : Observable<any>{
  //   let url = baseUrl+'recettes/recherche/'+keyword;
  //   console.log("getRecettesByKeyword() (recherche.service.ts) : "+url);
  //   return this.http.get(url)
  // }

  // criteria = "{$and: [{nom:string, difficulte:string, pseudo:string, mode_cuisson:string, nb_personnes:number}]}" 
  // (on n'y retrouve pas forcément tous les critères, mais seulement ceux définis).
  getRecettesByCriteria(criteria:any) : Observable<any>{
    let url = baseUrl+'/recherche';
    console.log("getRecettesByCriteria() (recherche.service.ts) : "+url);
    console.log(criteria);
    return this.http.post(url, criteria, httpOptions);
  }

  getInfosByEmail(criteria:any) : Observable<any>{
    let url = baseUrl+'/moncompte';
    console.log("getInfosByEmail() (recherche.service.ts) : "+url);
    console.log(criteria);
    return this.http.post(url, criteria, httpOptions);
  }

  getRecettesByEmail(criteria:any) : Observable<any> {
    let url = baseUrl+'/mesrecettes';
    console.log("getRecettesByEmail() (recherche.service.ts) : "+url);
    console.log(criteria);
    return this.http.post(url, criteria, httpOptions);
  }

  getAvisByRecetteId(recette_id:string) : Observable<any>{
    let url = baseUrl+'/avis/'+recette_id;
    console.log("getAvisByRecetteId() (recherche.service.ts) : "+url);
    return this.http.get(url);
  }
}
