import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Avis } from 'src/app/models/avis.model';
import { Recette } from 'src/app/models/recette.model';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { AvisService } from 'src/app/services/avis.service';
import { ConnexionService } from 'src/app/services/connexion.service';
import { RechercheService } from 'src/app/services/recherche.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-infos-recette',
  templateUrl: './infos-recette.component.html',
  styleUrls: ['./infos-recette.component.scss']
})
export class InfosRecetteComponent implements OnInit {
  @Input() public recette_inject!:Recette;
  auteur!:Utilisateur;
  avis = new Array<Avis>();
  recette!: any;

  is_user_connected = false;

  msg!: string;
  mon_avis!: string;
  ma_note!: number;

  mesInfosTab!: any;
  mesInfos!: any;

  moyenne_etoile_recette = 0;

  nb_empty_star = 0;

  avis_to_save = new Avis();

  avis_defined = false;
  text_undefined = "Aucun avis pour le moment";

  nom!: any;
  prenom!: any;

  constructor(private serviceRecherche: RechercheService, private serviceConnexion: ConnexionService, private router: Router, private serviceAvis:AvisService, private location:Location) { }

  ngOnInit(): void {
    /////////// RECUPERER L'AUTEUR ///////////
    
    this.serviceConnexion.getUtilisateur().subscribe(emailUtilisateur=> {
      if(emailUtilisateur!="") {
        this.is_user_connected = true;
        this.serviceRecherche.getInfosByEmail({"email":emailUtilisateur}).subscribe(resInfosUtilisateur => {
          this.mesInfosTab = resInfosUtilisateur["resultat"];
          this.mesInfos = this.mesInfosTab[0];
        });
        
      } 
      this.serviceRecherche.getInfosByEmail({"email":this.recette_inject.email}).subscribe(resInfosUtilisateur => {
        this.mesInfosTab = resInfosUtilisateur["resultat"];
        this.mesInfos = this.mesInfosTab[0];
        this.nom = this.mesInfos.nom;
        this.prenom = this.mesInfos.prenom;
      });
    });
    /////////// RECUPERER LES AVIS ///////////
    this.serviceRecherche.getAvisByRecetteId(this.recette_inject._id).subscribe(res => {
      this.avis = res["data"];
      console.log(res["taille"]);
      
      for (let index = 0; index < res["taille"]; index++) {
        this.moyenne_etoile_recette += this.avis[index].score;
      }
      if(res["taille"] > 0) {
        this.avis_defined = true;
        this.moyenne_etoile_recette /= res["taille"];
      }
    }); 
    // this.serviceConnexion.getUtilisateur().subscribe(emailUtilisateur=> {
    //   if(emailUtilisateur!="") {
        
    //   } 
    //   else
    //     this.router.navigate(["/connexion"]);
    // });
  }

  refresh(): void {
		this.router.navigateByUrl("/refresh", { skipLocationChange: true }).then(() => {
		console.log(decodeURI(this.location.path()));
		this.router.navigate([decodeURI(this.location.path())]);
		});
	}

  onSaveAvis() {
    this.avis_to_save.commentaire = this.mon_avis;
    this.avis_to_save.nom_recette = this.recette_inject.nom;
    this.avis_to_save.pseudo = this.mesInfos.pseudo;
    this.avis_to_save.score = this.ma_note;
    this.avis_to_save.recette_id = this.recette_inject._id;

    this.serviceAvis.saveAvis(this.avis_to_save).subscribe(res => {
      if(res["resultat"] == 1) {
        console.log("votre avis a été enregistré");
        this.refresh();
      }
      else
        console.log("votre avis n'a pas été enregistré");
    });
  }

  counter(i: number) {
    let tmp = (i | 0);
    this.nb_empty_star = 5-tmp;
    if(tmp == 0)
      return [];
    if(tmp == 1)
      return [1];
    if(tmp == 2)
      return [1, 1];
    if(tmp == 3)
      return [1, 1, 1];
    if(tmp == 4)
      return [1, 1, 1, 1];
    if(tmp == 5)
      return [1, 1, 1, 1, 1];
    return [];
  }

}
