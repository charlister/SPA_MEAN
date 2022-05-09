import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ConnexionService } from 'src/app/services/connexion.service';
import { FormGroup, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  public email!:string; 
  public password!:string;

  constructor(private serviceConnexion: ConnexionService, private router: Router) { }

  ngOnInit(): void {
  } 

  onSubmit() {
    console.log("Je cherche à me connecter");
    this.serviceConnexion.verificationConnexion({"email":this.email, "mdp":this.password}).subscribe(res => {
      console.log(res);
      if(res["resultat"] == 1) {
        this.serviceConnexion.connexion(this.email);
        this.router.navigate(["/acceuil"]);
      }
    });
  }
}