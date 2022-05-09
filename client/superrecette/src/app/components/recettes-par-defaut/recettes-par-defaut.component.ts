import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recette } from 'src/app/models/recette.model';
import { ConnexionService } from 'src/app/services/connexion.service';
import { RechercheService } from 'src/app/services/recherche.service';

@Component({
  selector: 'app-recettes-par-defaut',
  templateUrl: './recettes-par-defaut.component.html',
  styleUrls: ['./recettes-par-defaut.component.scss']
})
export class RecettesParDefautComponent implements OnInit {
  recettes!: Array<Recette>; // tableau de recettes
  email!:string;
  
  recette = new Recette();
  recette_selected = false;

  constructor(private serviceRecherche: RechercheService, 
    private serviceConnexion: ConnexionService,
    private router: Router) { }

  ngOnInit(): void {
    this.serviceConnexion.getUtilisateur().subscribe(emailUtilisateur=> {
      this.email=emailUtilisateur;
    });
    this.serviceRecherche.getRecettes().subscribe(res=> {
      this.recettes = res;
    });
  }

  onCreate() : void {
    this.serviceConnexion.getUtilisateur().subscribe(emailUtilisateur=> {
      this.email=emailUtilisateur;
      console.log("======================= email" + emailUtilisateur);
      if (emailUtilisateur == "") {
        this.router.navigate(["/connexion"]);
      }
      else {
        this.router.navigate(["/mesrecettes/creation"]);
      }
    });
  }

  onSelectRecette(r:Recette) {
    this.recette = r;
    console.log(`Recette selectionnée : ${r._id}`);
    this.recette_selected = !this.recette_selected;
  }

  onRetour() {
    this.recette_selected = !this.recette_selected;
  }
}