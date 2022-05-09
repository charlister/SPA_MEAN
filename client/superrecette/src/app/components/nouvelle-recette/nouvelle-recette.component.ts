import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recette } from 'src/app/models/recette.model';
import { ConnexionService } from 'src/app/services/connexion.service';
import { NouvelleRecetteService } from 'src/app/services/nouvelle-recette.service';
import { NouvelIngredientComponent } from '../nouvel-ingredient/nouvel-ingredient.component';
import { NouvelleEtapeComponent } from '../nouvelle-etape/nouvelle-etape.component';

@Component({
  selector: 'app-nouvelle-recette',
  templateUrl: './nouvelle-recette.component.html',
  styleUrls: ['./nouvelle-recette.component.scss']
})
export class NouvelleRecetteComponent implements OnInit {
  public nouvelle_recette = new Recette();

  public modes_cuisson!:string[];
  public difficultes  !:string[];

  public ingredients    !:any;
  public etapes         !:any;

  public array_ingredients = new Array();
  public array_etapes      = new Array();

  public saving_error_detected !: boolean;

  constructor(private serviceConnexion : ConnexionService,
    private serviceNouvelleRecette : NouvelleRecetteService,
    private router : Router) { }

  ngOnInit(): void {
    this.nouvelle_recette.etapes = new Array();
    this.nouvelle_recette.image = "https://images.pexels.com/photos/4033639/pexels-photo-4033639.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";
    this.nouvelle_recette.ingredients = new Array();

    // récupérer les valeurs depuis la bdd ?
    this.modes_cuisson = [ 
      "", "eau", "vapeur",
      "sous pression", "à l'étouffée", "papillote",
      "grillade", "friture", "rôtissage",
      "sauté", "mijotage", "sous vide"
    ];

    this.difficultes = ["", "facile", "moyenne", "difficile"];
    this.saving_error_detected = false;
  }

  // ajout de balises
  ajouterBaliseIngredient() : void {
    this.array_ingredients.push({});
  }

  ajouterBaliseEtape() : void {
    this.array_etapes.push({});
  }

  // extraction des données
  extraireIngredients() : void {
    this.ingredients = document.getElementsByName("ingredient");
    let nom="";
    let quantite=0;
    let unite="";
    let prix=0;
    for (let ingredient of this.ingredients) {
      // nom=ingredient.getElementsByName("produit")[0].value;
      // quantite=parseFloat(ingredient.getElementsByName("quantite")[0].value);
      // unite=ingredient.getElementsByName("mesure")[0].value;
      // prix=parseFloat(ingredient.getElementsByName("prix")[0].value);

      nom=ingredient.children[0].children[0].children[1].value;
      quantite=parseFloat(ingredient.children[0].children[1].children[1].value);
      unite=ingredient.children[1].children[0].children[1].value;
      prix=parseFloat(ingredient.children[1].children[1].children[1].value);

      if(nom != "" && nom != undefined)
        this.nouvelle_recette.ingredients.push ({
          nom:      nom,
          quantite: quantite,
          unite:    unite,
          prix:     prix
        });
    }
    console.log("ingrédients renseignés :", this.nouvelle_recette.ingredients);
  }

  extraireEtapes() : void {
    this.etapes = document.getElementsByName("etape");
    for (let etape of this.etapes) {
      if(etape != "" && etape != undefined)
        this.nouvelle_recette.etapes.push(etape.value);
    }
    console.log("etapes renseignées :", this.nouvelle_recette.etapes);
  }

  extractions() : void {
    this.extraireIngredients();
    this.extraireEtapes();
  }

  onSubmit() : void {
    this.extractions();

    if (this.nouvelle_recette.ingredients.length != 0 && this.nouvelle_recette.etapes.length != 0)
    this.serviceConnexion.getUtilisateur().subscribe(emailUtilisateur=> {
      if(emailUtilisateur != "") {
        this.nouvelle_recette.email = emailUtilisateur;
        this.serviceNouvelleRecette
        .addRecette(this.nouvelle_recette)
        .subscribe(res=> {
          if(res["resultat"]) {
            this.saving_error_detected = false;
            this.router.navigate(["/mesrecettes"]);
          }
          else {
            this.saving_error_detected = true;
          } 
        });
      }
      else {
        this.saving_error_detected = false;
      }
    });
  }
}
