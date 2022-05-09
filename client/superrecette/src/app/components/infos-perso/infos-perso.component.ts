import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { ConnexionService } from 'src/app/services/connexion.service';
import { MajCompteService } from 'src/app/services/maj-compte.service';
import { RechercheService } from 'src/app/services/recherche.service';

@Component({
  selector: 'app-infos-perso',
  templateUrl: './infos-perso.component.html',
  styleUrls: ['./infos-perso.component.scss']
})
export class InfosPersoComponent implements OnInit {
  public utilisateur = new Utilisateur();
  
  public mesInfosTab!:any;
  public mesInfos!:any;

  public confirm_new_password!:string;
  public last_password!:string;

  public data!:any;

  public edit = false;
  public sent = false;
  public save_error = false;

  constructor(private serviceRecherche: RechercheService, 
    private serviceConnexion: ConnexionService,
    private serviceMajCompte:MajCompteService,
    private router:Router) {
     
  }

  ngOnInit(): void {
    this.data = {};
    
    this.serviceConnexion.getUtilisateur().subscribe(emailUtilisateur=> {
      if (emailUtilisateur == "") {
        // revoyer à la page d'acceuil
        this.router.navigate(['/acceuil']);
        return;
      }
      
      this.serviceRecherche.getInfosByEmail({"email":emailUtilisateur}).subscribe(resInfosUtilisateur => {
        this.mesInfosTab = resInfosUtilisateur["resultat"];
        this.mesInfos = this.mesInfosTab[0];

        this.utilisateur.nom    = this.mesInfos.nom   ;
        this.utilisateur.prenom = this.mesInfos.prenom;
        this.utilisateur.pseudo = this.mesInfos.pseudo;
        this.utilisateur.email  = this.mesInfos.email ;
        this.utilisateur.mdp    = ""   ;

        this.confirm_new_password = "";
        this.last_password        = "";
      });
    });
  }

  onEditer() : void {
    this.edit = true;
  }

  onAnnuler() : void {
    this.utilisateur.nom      = this.mesInfos.nom;
    this.utilisateur.prenom   = this.mesInfos.prenom;
    this.utilisateur.email    = this.mesInfos.email;
    this.utilisateur.mdp      = "";
    this.confirm_new_password = "";
    this.last_password        = "";

    this.edit = false;
  }

  // mettre à jour les informations sur l'utilisateur
  onUpdate() : void {
    if(this.utilisateur.nom!=undefined    && this.utilisateur.nom!="")
      this.data["nom"]    = this.utilisateur.nom;
    if(this.utilisateur.prenom!=undefined && this.utilisateur.prenom!="")
      this.data["prenom"] = this.utilisateur.prenom;
    if(this.utilisateur.email!=undefined  && this.utilisateur.email!="")
      this.data["email"]  = this.utilisateur.email;
    if(this.utilisateur.mdp!=undefined    && this.utilisateur.mdp!="" && this.confirm_new_password!=undefined && this.confirm_new_password!="" && this.confirm_new_password==this.utilisateur.mdp)
      this.data["mdp"]    = this.utilisateur.mdp;

    console.log(`aperçu des données à sauvegarder : ${this.data}`);

    if(this.last_password==this.mesInfos.mdp) {
      this.serviceConnexion.getUtilisateur().subscribe(emailUtilisateur=> {
        if(emailUtilisateur != "") { // test inutile car on s'assure de la connexion dans le onInit
          this.serviceMajCompte.majCompte(this.mesInfos._id, this.data).subscribe(res => {
            if(res["ok"]==true){
              console.log("données mise à jour !");
              this.sent = true;
              this.save_error = false;
            }
            else {
              this.sent = true;
              this.save_error = true;
              console.log("une erreur s'est produite lors de la mise à jour des informations personnelles.");
            }
          });
        }
        
      });
    }
    else {
      console.log("conditions de mise à jour non vérifiées.");
    }
  }
}