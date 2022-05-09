import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur.model';
import { InscriptionService } from 'src/app/services/inscription.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  public utilisateur = new Utilisateur();
  public confirm_mdp!:string;
  public chkbx_confirm!:any;

  public mdp_error = false;
  public email_error!:number;
  public pseudo_error!:number;
  public inscription_res = 1;

  constructor(private serviceInscription: InscriptionService, private router: Router) { }

  ngOnInit(): void {
  }

  onChangePseudo() {
    this.serviceInscription.verificationPseudo(this.utilisateur.pseudo).subscribe(res => {
      this.pseudo_error = res["resultat"];// 1->find ; 0->not found ; -1->error
    });
  }
  
  onChangeEmail() {
    this.serviceInscription.verificationEmail(this.utilisateur.email).subscribe(res => {
      this.email_error = res["resultat"];// 1->find ; 0->not found ; -1->error
    });
  }

  onSubmit() {
    this.mdp_error = this.utilisateur.mdp != this.confirm_mdp;

    if (!(this.mdp_error == true || this.email_error == 1 || this.pseudo_error == 1)) {
      // enregistrer les données dans la bdd et renvoyer vers le formulaire d'inscription
      this.serviceInscription
      .addUtilisateur(this.utilisateur)
      .subscribe(res => {
        console.log("JE SUIS DANS LE SUBSCRIBE")
        this.inscription_res = res["resultat"]; // 1->ok ; 0->not ok ; -1->error
        if(this.inscription_res == 1)
          this.router.navigate(["/connexion"]);
      });
    }
    else {
      console.log("CONDITION INSAT!");
    }
    
  }
}
