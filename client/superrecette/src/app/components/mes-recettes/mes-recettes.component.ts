import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recette } from 'src/app/models/recette.model';
import { ConnexionService } from 'src/app/services/connexion.service';
import { RechercheService } from 'src/app/services/recherche.service';

@Component({
  selector: 'app-mes-recettes',
  templateUrl: './mes-recettes.component.html',
  styleUrls: ['./mes-recettes.component.scss']
})
export class MesRecettesComponent implements OnInit {
  public mes_recettes = new Array<Recette>();
  
  recette = new Recette();
  recette_selected = false;

  constructor(private serviceRecherche : RechercheService, 
    private serviceConnexion : ConnexionService,
    private router : Router) { }

  ngOnInit(): void {
    this.serviceConnexion.getUtilisateur().subscribe(emailUtilisateur=> {
      if(emailUtilisateur!="") {
        this.serviceRecherche.getRecettesByEmail({"email":emailUtilisateur}).subscribe(recettesUtilisateur => {
          this.mes_recettes = recettesUtilisateur["resultat"];
        });
      } 
      else
        this.router.navigate(["/connexion"]);
    });
  }

  onNouvelleRecette(): void {
    this.router.navigateByUrl("mesrecettes/creation");
  }

  onSelectRecette(r:Recette) {
    this.recette = r;
    this.recette_selected = !this.recette_selected;
  }

  onRetour() {
    this.recette_selected = !this.recette_selected;
  }
}
