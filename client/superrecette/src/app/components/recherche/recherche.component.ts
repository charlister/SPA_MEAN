import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RechercheService } from 'src/app/services/recherche.service';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {
  public keyword!:string;
  public criteria!:any;

  public modes_cuisson!:string[];
  public mode_cuisson_selected!:string;

  public difficultes!:string[];
  public difficulte_selected!:string;

  public nb_personnes!:number;

  public pseudo!:string;

  constructor(private router: Router, private serviceRecherche:RechercheService) { 
    
  }

  ngOnInit(): void { 
    this.modes_cuisson = [
      "eau",
      "vapeur",
      "sous pression",
      "à l'étouffée",
      "papillote",
      "grillade",
      "fuiture",
      "rôtissage",
      "sauté",
      "mijotage",
      "sous vide"
    ];

    this.difficultes = ["facile", "moyenne", "difficile"];
  }

  onSubmit() {
    // tableau de récupération des informations renseignées.
    let criteria_array = new Array();

    // récupération des informations renseignées.
    if(this.keyword !== undefined && this.keyword !== "") // mot clé
      criteria_array.push({$text: { $search: this.keyword, $caseSensitive: false, $diacriticSensitive: false }});

    if(this.mode_cuisson_selected !== undefined && this.mode_cuisson_selected !== "") // mode de cuisson sélectionné
      criteria_array.push({mode_cuisson:this.mode_cuisson_selected});

    if(this.difficulte_selected !== undefined && this.difficulte_selected !== "") // difficulté sélectionnée
      criteria_array.push({difficulte:this.difficulte_selected});

    // if(this.pseudo !== undefined && this.pseudo !== "") // pseudo renseigné
    //   criteria_array.push({pseudo:this.pseudo});

    criteria_array.push({nombres_personnes:((this.nb_personnes === undefined || this.nb_personnes < 1) ? { $gte:1 } : { $gte:this.nb_personnes })}); // nombre minimum de personnes

    // toutes les informations renseignées/selectionnées doivent figurer dans les recherches
    this.criteria = {$and: criteria_array};
    console.log("(recherche.component.ts) onRechercher() : "+'recherche/'+JSON.stringify(this.criteria));
    this.router.navigateByUrl('recherche/'+JSON.stringify(this.criteria));
  }
}
